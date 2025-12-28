import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FeedbackDraft = {
  name: string;
  feedback: string;
  rate: number;
};

export const initialFeedbackDraft: FeedbackDraft = {
  name: "",
  feedback: "",
  rate: 0,
};

type FeedbackStore = {
  draft: FeedbackDraft;
  setDraft: (data: Partial<FeedbackDraft>) => void;
  clearDraft: () => void;
};

export const useFeedbackDraftStore = create<FeedbackStore>()(
  persist(
    (set) => ({
      draft: initialFeedbackDraft,

      setDraft: (data) =>
        set((state) => ({
          draft: { ...state.draft, ...data },
        })),

      clearDraft: () =>
        set(() => ({
          draft: initialFeedbackDraft,
        })),
    }),
    {
      name: "feedback-draft",
    }
  )
);
