"use client";

import { AuthMe, logoutUser, refreshToken } from "@/lib/auth";
import axios from "axios";
import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  avatar?: string; // на випадок, якщо бекенд повертає avatar
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;

  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  fetchUser: async () => {
    set({ loading: true });

    const attemptFetch = async (): Promise<User | null> => {
      try {
        const rawUser = await AuthMe();
        if (!rawUser) return null;

        // 🔹 БЕКЕНД ТЕПЕР ПОВЕРТАЄ { success: true, data: {...} }
        const data = (rawUser as any).data ?? rawUser;

        const userWithId: User = {
          ...data,
          id:
            data.id ??
            (typeof data._id === "string"
              ? data._id
              : data._id?.toString?.()),
        };

        return userWithId;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          return null;
        }
        // console.error("Fetch user failed", error);
        return null;
      }
    };

    let user = await attemptFetch();

    if (!user) {
      try {
        // якщо перший раз не вдалось — пробуємо оновити сесію
        await refreshToken();
        user = await attemptFetch();
      } catch (err) {
        // console.error("Refresh failed", err);
      }
    }

    set({
      user,
      isAuthenticated: !!user,
      loading: false,
    });
  },

  logout: async () => {
    try {
      await logoutUser(); // викликаємо backend logout
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // чистимо стан на фронті
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export const useAuth = useAuthStore;
