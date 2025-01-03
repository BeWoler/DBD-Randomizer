'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useRandomizerStore } from "@/stores/randomizerStore";
import { useRandomizerStoreInternal } from "@/stores/randomizerStoreInternal";

const Randomizer = () => {
  const { selectedType } = useRandomizerStore();
  const { selectedCharacter, selectedPerks, setRandomResults } = useRandomizerStoreInternal();
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
      <h1 className="text-2xl font-bold">
        Randomizer | Рандом - {selectedType === "survivor" ? "Survivors | Выжившие" : "Killers | Маньяки"}
      </h1>

      <motion.div
        className="flex justify-start gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        key={selectedCharacter?.name}
      >
        {selectedCharacter && (
          <div className="flex gap-4 items-center justify-center">
            <Image width={135} height={166} src={selectedCharacter.avatar} alt={selectedCharacter.name} className="max-w-[136px] max-h-[166px]" />
            <span className="text-xl font-semibold">{selectedCharacter.name}</span>
          </div>
        )}
      </motion.div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {selectedPerks.map((perk, index) => (
            <motion.div
              key={perk.en}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              style={{ padding: '20px', borderRadius: '8px', backgroundColor: '#450a0a', minWidth: '100px', fontWeight: '600', textAlign: 'center'}}
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
        {isRolling ? "Bzzzz... | Бзззз..." : "Random | Рандом"}
      </button>
    </div>
  );
};

export default Randomizer;