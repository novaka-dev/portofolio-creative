"use server";

import { redirect } from "next/navigation";
import { checkAdminPassword, setAdminSession } from "@/lib/auth";

export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const password = formData.get("password") as string;

  if (!password) {
    return { error: "Password tidak boleh kosong." };
  }

  if (!checkAdminPassword(password)) {
    return { error: "Password salah. Coba lagi." };
  }

  await setAdminSession();
  redirect("/admin");
}
