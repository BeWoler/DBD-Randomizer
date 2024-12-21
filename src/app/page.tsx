'use client';

import { KILLERS } from "@/constants/killers.constant";
import { PERKS } from "@/constants/perks.constant";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { create } from "zustand";

interface RandomizerState {
  selectedKiller: { name: string; avatar: string } | null;
  selectedPerks: { ru: string; en: string }[];
  selectedAddons: string[];
  setRandomResults: () => void;
}

const useRandomizerStore = create<RandomizerState>((set) => ({
  selectedKiller: null,
  selectedPerks: [],
  selectedAddons: [],
  setRandomResults: () => {
    set(() => {
      const newPerks: { ru: string; en: string }[] = [];
      while (newPerks.length < 4) {
        const randomPerk = PERKS[Math.floor(Math.random() * PERKS.length)];
        if (!newPerks.some((perk) => perk.en === randomPerk.en)) {
          newPerks.push(randomPerk);
        }
      }
      return {
        selectedKiller: KILLERS[Math.floor(Math.random() * KILLERS.length)],
        selectedPerks: newPerks,
      };
    });
  },
}));

export default function Home() {
  const { selectedKiller, selectedPerks, setRandomResults } = useRandomizerStore();
  const [isRolling, setIsRolling] = useState(false);

  const handleRandomize = () => {
    setIsRolling(true);
    setTimeout(() => {
      setRandomResults();
      setIsRolling(false);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-2xl font-bold">Randomizer | Рандомайзер Dead by Daylight</h1>

      <motion.div
        className="flex justify-start gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        key={selectedKiller?.name}
      >
        {selectedKiller && (
          <div className="flex gap-4 items-center justify-center">
            <Image width={135} height={166} src={selectedKiller.avatar} alt={selectedKiller.name} className="max-w-[136px] max-h-[166px]" />
            <span className="text-xl font-semibold">{selectedKiller.name}</span>
          </div>
        )}
      </motion.div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {selectedPerks.map((perk, index) => (
            <motion.div
              key={perk.en}
              className="bg-purple-900 font-semibold text-white rounded-lg p-4 min-w-[100px] text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div>{perk.en}</div>
              <div>{perk.ru}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={handleRandomize}
        disabled={isRolling}
        className="bg-red-950 font-semibold text-white w-fit px-4 py-2 rounded hover:bg-red-900 transition-all disabled:bg-gray-400"
      >
        {isRolling ? "Bzzzz..." : "Random"}
      </button>
    </div>
  );
}
