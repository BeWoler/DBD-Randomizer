import { create } from "zustand";

type RandomizerStore = {
  selectedType: "survivor" | "killer";
  setSelectedType: (type: "survivor" | "killer") => void;
};

export const useRandomizerStore = create<RandomizerStore>((set) => ({
  selectedType: "survivor",
  setSelectedType: (type) => set({ selectedType: type }),
}));