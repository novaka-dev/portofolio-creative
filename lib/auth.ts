import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";

/** Cek apakah password cocok dengan ADMIN_PASSWORD di .env */
export function checkAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return password === adminPassword;
}

/** Cek apakah ada session cookie yang valid */
export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === SESSION_VALUE;
}

/** Set session cookie (httpOnly, secure) */
export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    path: "/",
  });
}

/** Hapus session cookie (logout) */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
