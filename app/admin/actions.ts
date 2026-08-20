"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getAdminSession, clearAdminSession } from "@/lib/auth";

// ─── Helpers ─────────────────────────────────────────────

async function requireAdmin() {
  const ok = await getAdminSession();
  if (!ok) throw new Error("Unauthorized");
}

function detectPlatform(url: string): "youtube" | "tiktok" | "cloudinary" {
  if (url.includes("youtu")) return "youtube";
  if (url.includes("tiktok")) return "tiktok";
  return "cloudinary";
}

// ─── Upload Foto ─────────────────────────────────────────

export async function uploadImageAction(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin();

  const file = formData.get("file") as File | null;
  const category = formData.get("category") as string;
  const subCategory = (formData.get("subCategory") as string) || null;
  const groupName = (formData.get("groupName") as string)?.trim() || null;

  if (!file || file.size === 0) return { error: "Pilih file foto terlebih dahulu." };
  if (!category) return { error: "Pilih kategori." };

  // Validasi tipe file
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return { error: "Format foto tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF." };
  }

  // Buat nama file unik
  const ext = file.name.split(".").pop();
  const fileName = `${category}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  // Upload ke Supabase Storage
  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await supabaseAdmin.storage
    .from("works")
    .upload(fileName, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return { error: `Upload gagal: ${uploadError.message}` };
  }

  // Ambil public URL
  const { data: urlData } = supabaseAdmin.storage.from("works").getPublicUrl(fileName);

  // Simpan record ke database
  const { error: dbError } = await supabaseAdmin.from("works").insert({
    type: "image",
    category,
    sub_category: subCategory || null,
    src: urlData.publicUrl,
    group_name: groupName,
  });

  if (dbError) {
    // Hapus file yang sudah terupload jika DB gagal
    await supabaseAdmin.storage.from("works").remove([fileName]);
    return { error: `Gagal simpan ke database: ${dbError.message}` };
  }

  revalidatePath("/");
  revalidatePath(`/works/${category}`);
  return { success: true };
}

// ─── Tambah Video ─────────────────────────────────────────

export async function addVideoAction(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin();

  const url = (formData.get("url") as string)?.trim();
  const category = (formData.get("category") as string) || "videos";

  if (!url) return { error: "URL video tidak boleh kosong." };

  const platform = detectPlatform(url);

  const { error: dbError } = await supabaseAdmin.from("works").insert({
    type: "video",
    category,
    platform,
    url,
  });

  if (dbError) {
    return { error: `Gagal simpan: ${dbError.message}` };
  }

  revalidatePath("/");
  revalidatePath("/works/videos");
  return { success: true };
}

// ─── Hapus Item ───────────────────────────────────────────

export async function deleteItemAction(id: string, src: string | null): Promise<void> {
  await requireAdmin();

  // Kalau ada src (foto di Storage), hapus filenya dulu
  if (src && src.includes("supabase")) {
    // Ekstrak path file dari URL publik
    const url = new URL(src);
    // path: /storage/v1/object/public/works/category/filename.ext
    const pathParts = url.pathname.split("/storage/v1/object/public/works/");
    if (pathParts[1]) {
      await supabaseAdmin.storage.from("works").remove([pathParts[1]]);
    }
  }

  await supabaseAdmin.from("works").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/works/design");
  revalidatePath("/works/pfp-samples");
  revalidatePath("/works/videos");
}

// ─── Logout ───────────────────────────────────────────────

export async function logoutAction(): Promise<void> {
  await clearAdminSession();
  redirect("/admin/login");
}
