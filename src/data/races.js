export const RACES = {
    Human: {
        id: "Human",
        name: "Human",
        description: "Versatile and ambitious. No specific weaknesses.",
        bonuses: { hp: 10, mp: 10, atk: 2, mag: 2, def: 2, spd: 2 },
        passive: "Jack of All Trades: +5% XP Gain"
    },
    Elf: {
        id: "Elf",
        name: "High Elf",
        description: "Graceful beings of the forest. High magic potential.",
        bonuses: { mp: 30, mag: 8, spd: 5, def: -2 },
        passive: "Mana Flow: +10% Magic Damage"
    },
    Dwarf: {
        id: "Dwarf",
        name: "Iron Dwarf",
        description: "Stout and hardy. Masters of stone and steel.",
        bonuses: { hp: 40, def: 8, atk: 4, spd: -3 },
        passive: "Stone Skin: +10% Physical Resistance"
    },
    Orc: {
        id: "Orc",
        name: "Savage Orc",
        description: "Brutal warriors who thrive in battle.",
        bonuses: { hp: 20, atk: 10, def: 3, mag: -5 },
        passive: "Bloodlust: +5% Crit Chance"
    },
    Undead: {
        id: "Undead",
        name: "Undead",
        description: "Risen from the grave. Immune to poison.",
        bonuses: { hp: 50, def: 5, mag: 5, spd: -5 },
        passive: "Undeath: Immune to Poison"
    },
    Demon: {
        id: "Demon",
        name: "Infernal",
        description: "Beings of fire and chaos.",
        bonuses: { atk: 15, mag: 15, hp: -20, def: -5 },
        passive: "Hellfire: Attacks burn enemies"
    },
    Angel: {
        id: "Angel",
        name: "Celestial",
        description: "Divine beings of light.",
        bonuses: { hp: 30, mag: 10, def: 5 },
        passive: "Divine Grace: Regenerate 5% HP per turn"
    },
    Dragonborn: {
        id: "Dragonborn",
        name: "Dragonkin",
        description: "Blessed with dragon blood.",
        bonuses: { hp: 30, atk: 8, def: 8, mag: 5 },
        passive: "Scales: +15% Fire Resistance"
    },
    Vampire: {
        id: "Vampire",
        name: "Vampire",
        description: "Creatures of the night. Drain life.",
        bonuses: { spd: 10, mag: 8, atk: 5, hp: -10 },
        passive: "Lifelink: Heal for 10% of damage dealt"
    },
    Construct: {
        id: "Construct",
        name: "Cyber-Construct",
        description: "Living metal. Emotionless perfection.",
        bonuses: { def: 15, hp: 20, spd: -2, mag: -5 },
        passive: "Automaton: Immune to Stun/Sleep"
    }
};
