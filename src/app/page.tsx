'use client';

import Randomizer from "@/screens/Randomizer";
import { useRandomizerStore } from "@/stores/randomizerStore";

export default function Home() {
  const { selectedType, setSelectedType } = useRandomizerStore();

  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-2xl font-bold">Randomizer | Рандомайзер Dead by Daylight</h1>
      <div className="flex gap-4">
        <button
          onClick={() => setSelectedType("survivor")}
          className={`font-semibold px-4 py-2 rounded transition-all ${selectedType === "survivor" ? "bg-red-950" : "bg-transparent"}`}
        >
          Survivors | Выжившие
        </button>
        <button
          onClick={() => setSelectedType("killer")}
          className={`font-semibold px-4 py-2 rounded transition-all ${selectedType === "killer" ? "bg-red-950" : "bg-transparent"}`}
        >
          Killers | Маньяки
        </button>
      </div>

      <Randomizer />
    </div>
  );
}