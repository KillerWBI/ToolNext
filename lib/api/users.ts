import type { UserPublic } from "@/types/user";
import type { Tool } from "@/types/tool";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(path: string): Promise<T> {
  if (!BASE_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

  const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });

  if (!res.ok) {
    const error = new Error(`Request failed: ${res.status}`);
    (error as any).status = res.status;
    throw error;
  }

  return (await res.json()) as T;
}

export function getPublicUserById(userId: string) {
  return request<UserPublic>(`/api/users/${userId}`);
}

export async function getUserToolsByUserId(userId: string): Promise<Tool[]> {
  const data = await request<any>(`/api/tools?page=1&limit=200`);
  const tools = normalizeTools(data);

  return tools.filter((tool) => {
    const owner = tool.owner as any;

    // owner може бути string або object
    if (typeof owner === "string") {
      return owner === userId;
    }

    if (typeof owner === "object" && owner !== null) {
      if (typeof owner._id === "string") return owner._id === userId;
      if (typeof owner.id === "string") return owner.id === userId;
    }

    return false;
  });
}


function normalizeTools(data: any): Tool[] {
  if (Array.isArray(data)) return data as Tool[];

  
  if (Array.isArray(data?.tools)) return data.tools as Tool[];

 
  const items = data?.items ?? data?.results ?? data?.data;
  if (Array.isArray(items)) return items as Tool[];

  return [];
}
