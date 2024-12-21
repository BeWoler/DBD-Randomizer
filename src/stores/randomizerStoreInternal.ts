import { KILLERS } from "@/constants/killers.constant";
import { PERKS } from "@/constants/perks.constant";
import { SURVIVORS } from "@/constants/survivors.constant";
import { SURVIVORS_PERKS } from "@/constants/survivorsPerks.constant";
import { create } from "zustand";
import { useRandomizerStore } from "./randomizerStore";

interface RandomizerState {
  selectedCharacter: { name: string; avatar: string } | null;
  selectedPerks: { ru: string; en: string }[];
  setRandomResults: () => void;
}

export const useRandomizerStoreInternal = create<RandomizerState>((set) => ({
  selectedCharacter: null,
  selectedPerks: [],
  setRandomResults: () => {
    const { selectedType } = useRandomizerStore.getState();

    const newPerks: { ru: string; en: string }[] = [];
    const isSurvivor = selectedType === "survivor";

    while (newPerks.length < 4) {
      const randomPerk = isSurvivor
        ? SURVIVORS_PERKS[Math.floor(Math.random() * SURVIVORS_PERKS.length)]
        : PERKS[Math.floor(Math.random() * PERKS.length)];

      if (!newPerks.some((perk) => perk.en === randomPerk.en)) {
        newPerks.push(randomPerk);
      }
    }

    const selectedCharacter = isSurvivor
      ? SURVIVORS[Math.floor(Math.random() * SURVIVORS.length)]
      : KILLERS[Math.floor(Math.random() * KILLERS.length)];

    set({
      selectedCharacter,
      selectedPerks: newPerks,
    });
  },
}));