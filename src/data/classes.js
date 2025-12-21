export const CLASSES = {
    Mage: {
        id: "mage",
        label: "Mage",
        description: "Master of arcane arts. High Magic and MP.",
        stats: { hp: 80, mp: 120, atk: 5, mag: 20, def: 5, spd: 12 },
        growth: { hp: 3, mp: 8, atk: 1, mag: 4, def: 1, spd: 1 },
        color: "var(--class-mage)"
    },
    Warrior: {
        id: "warrior",
        label: "Warrior",
        description: "Front-line fighter. High HP and Attack.",
        stats: { hp: 130, mp: 30, atk: 18, mag: 5, def: 15, spd: 8 },
        growth: { hp: 6, mp: 2, atk: 3, mag: 0, def: 3, spd: 1 },
        color: "var(--class-warrior)"
    },
    Rogue: {
        id: "rogue",
        label: "Rogue",
        description: "Swift and deadly. High Speed and Criticals.",
        stats: { hp: 90, mp: 50, atk: 15, mag: 8, def: 8, spd: 20 },
        growth: { hp: 4, mp: 2, atk: 3, mag: 1, def: 1, spd: 4 },
        color: "var(--class-rogue)"
    },
    Cleric: {
        id: "cleric",
        label: "Cleric",
        description: "Healer and protector. Balanced stats.",
        stats: { hp: 100, mp: 100, atk: 10, mag: 15, def: 10, spd: 10 },
        growth: { hp: 4, mp: 5, atk: 2, mag: 3, def: 2, spd: 1 },
        color: "var(--class-cleric)"
    },
    Archer: {
        id: "archer",
        label: "Archer",
        description: "Ranged physical attacker.",
        stats: { hp: 95, mp: 60, atk: 16, mag: 5, def: 8, spd: 16 },
        growth: { hp: 4, mp: 2, atk: 4, mag: 1, def: 1, spd: 2 },
        color: "#22c55e"
    },
    Berserker: {
        id: "berserker",
        label: "Berserker",
        description: "Sacrifices defense for raw power.",
        stats: { hp: 140, mp: 20, atk: 25, mag: 0, def: 5, spd: 12 },
        growth: { hp: 7, mp: 1, atk: 5, mag: 0, def: 1, spd: 2 },
        color: "#b91c1c"
    },
    Monk: {
        id: "monk",
        label: "Monk",
        description: "Martial artist with high evasion.",
        stats: { hp: 110, mp: 60, atk: 14, mag: 10, def: 10, spd: 15 },
        growth: { hp: 5, mp: 2, atk: 3, mag: 2, def: 2, spd: 2 },
        color: "#d97706"
    },
    Necromancer: {
        id: "necromancer",
        label: "Necromancer",
        description: "Controls the dead. High MP and Defense.",
        stats: { hp: 110, mp: 110, atk: 8, mag: 18, def: 12, spd: 8 },
        growth: { hp: 5, mp: 7, atk: 1, mag: 3, def: 3, spd: 1 },
        color: "#7e22ce"
    },
    Bard: {
        id: "bard",
        label: "Bard",
        description: "Buffers and support. High Speed.",
        stats: { hp: 95, mp: 90, atk: 10, mag: 14, def: 8, spd: 14 },
        growth: { hp: 4, mp: 4, atk: 2, mag: 2, def: 2, spd: 2 },
        color: "#f472b6"
    },
    Druid: {
        id: "druid",
        label: "Druid",
        description: "Nature magic and shapeshifting.",
        stats: { hp: 105, mp: 80, atk: 12, mag: 14, def: 10, spd: 10 },
        growth: { hp: 5, mp: 4, atk: 2, mag: 3, def: 2, spd: 1 },
        color: "#15803d"
    },
    Knight: {
        id: "knight",
        label: "Knight",
        description: "Defensive tank. Extremely high Defense.",
        stats: { hp: 150, mp: 40, atk: 12, mag: 5, def: 20, spd: 6 },
        growth: { hp: 8, mp: 2, atk: 2, mag: 1, def: 5, spd: 0 },
        color: "#64748b"
    },
    Assassin: {
        id: "assassin",
        label: "Assassin",
        description: "Burst damage specialist.",
        stats: { hp: 85, mp: 60, atk: 22, mag: 8, def: 6, spd: 18 },
        growth: { hp: 3, mp: 3, atk: 5, mag: 1, def: 1, spd: 3 },
        color: "#4c0519"
    },
    Summoner: {
        id: "summoner",
        label: "Summoner",
        description: "Calls allies to fight.",
        stats: { hp: 80, mp: 130, atk: 5, mag: 22, def: 6, spd: 10 },
        growth: { hp: 3, mp: 8, atk: 1, mag: 5, def: 1, spd: 1 },
        color: "#8b5cf6"
    },
    Elementalist: {
        id: "elementalist",
        label: "Elementalist",
        description: "Master of all elements.",
        stats: { hp: 90, mp: 110, atk: 8, mag: 20, def: 8, spd: 12 },
        growth: { hp: 4, mp: 6, atk: 2, mag: 4, def: 1, spd: 1 },
        color: "#0ea5e9"
    },
    Alchemist: {
        id: "alchemist",
        label: "Alchemist",
        description: "Uses items for massive effect.",
        stats: { hp: 100, mp: 80, atk: 12, mag: 12, def: 10, spd: 12 },
        growth: { hp: 5, mp: 4, atk: 2, mag: 3, def: 2, spd: 2 },
        color: "#a3e635"
    },
    HolyPaladin: {
        id: "holy_paladin",
        label: "Holy Paladin",
        description: "The King of Classes. Smite evil with absolute power.",
        stats: { hp: 999, mp: 999, atk: 999, mag: 999, def: 999, spd: 999 }, // Max stats as requested
        growth: { hp: 50, mp: 50, atk: 20, mag: 20, def: 20, spd: 20 },
        color: "#fbbf24", // Gold
        unlockable: true // Hidden from character creation
    }
};
