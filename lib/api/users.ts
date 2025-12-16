import { api} from "./api";
// import type { Tool } from "@/types/tool";

export type PublicUser = {
  _id: string;
  name: string;
  avatarUrl?: string;
};

export async function getPublicUserById(userId: string): Promise<PublicUser> {
  const res = await api.get<PublicUser>(`/api/users/${userId}`);
  return res.data;
}

// export async function getUserToolsByUserId(userId: string): Promise<Tool[]> {
//   return request<Tool[]>(`/api/users/${userId}/tools`);
// }
