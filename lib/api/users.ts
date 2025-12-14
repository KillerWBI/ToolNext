// lib/api/users.ts
import type { UserPublic } from "@/types/user";
import type { Tool } from "@/types/tool";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(path: string): Promise<T> {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    // публічні запити – без cookies
    cache: "no-store",
  });

  if (!res.ok) {
    // щоб у вас ловилось error.tsx або обробник
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export function getPublicUserById(userId: string) {
  return request<UserPublic>(`/api/users/${userId}`);
}

export function getUserToolsByUserId(userId: string) {
  
  return request<Tool[]>(`/api/users/${userId}/tools`);
}
