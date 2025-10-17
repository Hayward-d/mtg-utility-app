import { useState } from "react";

export default function App() {
    const [mana, setMana] = useState({ red: 0, blue: 0, colorless: 0 });
    const [storm, setStorm] = useState(0);
    const [copies, setCopies] = useState(0);
    const [triggers, setTriggers] = useState(0);
    const [diceResult, setDiceResult] = useState("");
    const [coinResult, setCoinResult] = useState("");
    const [coinFlash, setCoinFlash] = useState(false);

    const rollDice = (sides) => {
        setDiceResult(`🎲 ${Math.floor(Math.random() * sides) + 1} (d${sides})`);
    };

    const flipCoin = () => {
        const result = Math.random() < 0.5 ? "Heads" : "Tails";
        setCoinResult(`🪙 ${result}`);
        setCoinFlash(true);
        setTimeout(() => setCoinFlash(false), 200); // flash for 200ms
    };

    const changeMana = (color, delta) => {
        setMana((prev) => ({ ...prev, [color]: Math.max(prev[color] + delta, 0) }));
    };

    const resetAll = () => {
        setMana({ red: 0, blue: 0, colorless: 0 });
        setStorm(0);
        setCopies(0);
        setTriggers(0);
        setDiceResult("");
        setCoinResult("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center py-8 px-4 space-y-6 font-poppins">


            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dice Roller Card */}
                <div className="card">
                    <h2 className="card-title text-indigo-300">Dice Roller</h2>
                    <div className="flex justify-center gap-4 mb-2">
                        <button className="btn-indigo" onClick={() => rollDice(6)}>
                            Roll d6
                        </button>
                        <button className="btn-indigo" onClick={() => rollDice(20)}>
                            Roll d20
                        </button>
                    </div>
                    <p className="result-text">{diceResult}</p>
                </div>

                {/* Coin Flip Card */}
                <div className="card">
                    <h2 className="card-title text-yellow-300">Coin Flip</h2>
                    <button className="btn-yellow mb-2" onClick={flipCoin}>
                        Flip Coin
                    </button>
                    <p
                        className={`result-text transition-all duration-200 ${
                            coinFlash ? "scale-110 text-yellow-400" : ""
                        }`}
                    >
                        {coinResult}
                    </p>
                </div>

                {/* Mana Tracker Card */}
                <div className="card md:col-span-2">
                    <h2 className="card-title text-rose-300">Mana Tracker</h2>
                    <div className="flex justify-around mt-4 gap-6">
                        {["red", "blue", "colorless"].map((color) => (
                            <div key={color} className="flex flex-col items-center">
                                <img
                                    src={`/icons/${color}.png`}
                                    alt={color}
                                    className="w-10 h-10 mb-1"
                                />
                                <div className="flex gap-2 items-center">
                                    <button
                                        className="btn-small"
                                        onClick={() => changeMana(color, -1)}
                                    >
                                        −
                                    </button>
                                    <span className="w-8 text-center text-lg">{mana[color]}</span>
                                    <button
                                        className="btn-small"
                                        onClick={() => changeMana(color, +1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Counters Card */}
                <div className="card md:col-span-2">
                    <h2 className="card-title text-emerald-300">Counters</h2>
                    <div className="flex justify-around mt-4 gap-6">
                        {[
                            { label: "Storm Count", state: storm, setter: setStorm },
                            { label: "Copy Count", state: copies, setter: setCopies },
                            { label: "Triggers", state: triggers, setter: setTriggers },
                        ].map(({ label, state, setter }) => (
                            <div key={label} className="flex flex-col items-center">
                                <span className="text-sm font-medium mb-1">{label}</span>
                                <div className="flex gap-2 items-center">
                                    <button
                                        className="btn-small"
                                        onClick={() => setter(Math.max(state - 1, 0))}
                                    >
                                        −
                                    </button>
                                    <span className="w-8 text-center text-lg">{state}</span>
                                    <button className="btn-small" onClick={() => setter(state + 1)}>
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reset Button */}
            <button className="btn-red mt-4" onClick={resetAll}>
                Reset All
            </button>
        </div>
    );
}
