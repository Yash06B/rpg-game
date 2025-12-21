export const ACHIEVEMENTS = {
    // Progression
    first_steps: {
        id: "first_steps",
        title: "First Steps",
        description: "Reach Level 5.",
        icon: "🌱",
        condition: (state) => state.player.level >= 5
    },
    rising_star: {
        id: "rising_star",
        title: "Rising Star",
        description: "Reach Level 20.",
        icon: "⭐",
        condition: (state) => state.player.level >= 20
    },
    heroic: {
        id: "heroic",
        title: "Heroic Status",
        description: "Reach Level 50.",
        icon: "🌟",
        condition: (state) => state.player.level >= 50
    },
    legendary: {
        id: "legendary",
        title: "Living Legend",
        description: "Reach Level 99 (Max).",
        icon: "👑",
        condition: (state) => state.player.level >= 99
    },

    // Combat
    first_blood: {
        id: "first_blood",
        title: "First Blood",
        description: "Win your first battle.",
        icon: "⚔️",
        condition: (state) => state.player.exp > 0 // Basic check
    },
    slayer: {
        id: "slayer",
        title: "Monster Slayer",
        description: "Defeat 50 enemies.",
        icon: "💀",
        condition: (state) => (state.player.stats.kills || 0) >= 50
    },
    demon_hunter: {
        id: "demon_hunter",
        title: "Demon Hunter",
        description: "Defeat your first Demon Lord.",
        icon: "🔥",
        condition: (state) => {
            const flags = state.world.questFlags || {};
            return ['pride', 'greed', 'wrath', 'envy', 'lust', 'gluttony', 'sloth'].some(boss => flags[`${boss}_defeated`]);
        }
    },
    savior: {
        id: "savior",
        title: "Savior of Realms",
        description: "Defeat all 7 Demon Lords.",
        icon: "🌍",
        condition: (state) => {
            const flags = state.world.questFlags || {};
            return ['pride', 'greed', 'wrath', 'envy', 'lust', 'gluttony', 'sloth'].every(boss => flags[`${boss}_defeated`]);
        }
    },

    // Wealth
    penny_pincher: {
        id: "penny_pincher",
        title: "Penny Pincher",
        description: "Collect 1,000 Gold.",
        icon: "💰",
        condition: (state) => state.player.gold >= 1000
    },
    magnate: {
        id: "magnate",
        title: "Merchant Magnate",
        description: "Collect 50,000 Gold.",
        icon: "💎",
        condition: (state) => state.player.gold >= 50000
    },

    // Exploration & Collection
    traveler: {
        id: "traveler",
        title: "World Traveler",
        description: "Visit all 7 towns.",
        icon: "🗺️",
        condition: (state) => Object.keys(state.world.visitedTowns || {}).length >= 7
    },
    collector: {
        id: "collector",
        title: "Item Collector",
        description: "Have 20 different items in your inventory.",
        icon: "🎒",
        condition: (state) => state.player.inventory.length >= 20
    },
    fully_kitted: {
        id: "fully_kitted",
        title: "Fully Kitted",
        description: "Equip items in all slots (Weapon, Armor, Accessory).",
        icon: "🛡️",
        condition: (state) => state.player.equipment.weapon && state.player.equipment.armor && state.player.equipment.accessory
    }
};
