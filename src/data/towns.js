export const TOWNS = {
    town_1: {
        id: "town_1",
        name: "Haven's Rest (Starter Town)",
        description: "A peaceful sanctuary where heroes begin their journey.",
        buildings: ["inn", "shop", "guild", "blacksmith", "training", "library"],
        uniqueFeature: "Ancient Library",
        dungeon: "Pride Demon Lord Dungeon",
        requirements: { level: 1 }
    },
    town_2: {
        id: "town_2",
        name: "Glittering Sands",
        description: "A desert oasis known for its magical enchantments.",
        buildings: ["inn", "shop", "guild", "blacksmith", "training", "enchanter"],
        uniqueFeature: "Enchantment Tower",
        dungeon: "Greed Demon Lord Dungeon",
        requirements: { level: 10 }
    },
    town_3: {
        id: "town_3",
        name: "Iron Fortress",
        description: "Industrial hub of smithing and fusion.",
        buildings: ["inn", "shop", "guild", "blacksmith", "training", "fusion"],
        uniqueFeature: "Fusion Chamber",
        dungeon: "Wrath Demon Lord Dungeon",
        requirements: { level: 20 }
    },
    town_4: {
        id: "town_4",
        name: "Shadow Vale",
        description: "A mysterious town protected by spirits.",
        buildings: ["inn", "shop", "guild", "blacksmith", "training", "soul_sanctuary"],
        uniqueFeature: "Soul Sanctuary",
        dungeon: "Envy Demon Lord Dungeon",
        requirements: { level: 30 }
    },
    town_5: {
        id: "town_5",
        name: "Chrono Citadel",
        description: "A city existing outside of normal time.",
        buildings: ["inn", "shop", "guild", "blacksmith", "training", "time_vault"],
        uniqueFeature: "Time Vault",
        dungeon: "Lust Demon Lord Dungeon",
        requirements: { level: 40 }
    },
    town_6: {
        id: "town_6",
        name: "Dragon's Peak",
        description: "High altitude fortress near dragon nesting grounds.",
        buildings: ["inn", "shop", "guild", "blacksmith", "training", "mythic_forge"],
        uniqueFeature: "Mythic Forge",
        dungeon: "Gluttony Demon Lord Dungeon",
        requirements: { level: 60 }
    },
    town_7: {
        id: "town_7",
        name: "Celestial Summit",
        description: "The closest point to the gods.",
        buildings: ["inn", "shop", "guild", "blacksmith", "training", "transcendence"],
        uniqueFeature: "Hall of Transcendence",
        dungeon: "Sloth Demon Lord Dungeon",
        requirements: { level: 80 }
    }
};

export const BUILDINGS = {
    inn: { label: "Inn", description: "Rest to recover HP/MP (10 Gold)", action: "REST" },
    shop: { label: "General Store", description: "Buy potions and basic gear", action: "SHOP" },
    guild: { label: "Adventurer's Guild", description: "Quests and Skills", action: "GUILD" },
    blacksmith: { label: "Blacksmith", description: "Craft and Repair equipment", action: "SMITH" },
    training: { label: "Training Grounds", description: "Allocate stat points", action: "TRAINING" },
    library: { label: "Ancient Library", description: "Respec and Lore", action: "UNIQUE" },
    enchanter: { label: "Enchantment Tower", description: "Add magic to items", action: "UNIQUE" },
    fusion: { label: "Fusion Chamber", description: "Combine items", action: "UNIQUE" },
    soul_sanctuary: { label: "Soul Sanctuary", description: "Manage Passive Skills", action: "UNIQUE" },
    time_vault: { label: "Time Vault", description: "Save States", action: "UNIQUE" },
    mythic_forge: { label: "Mythic Forge", description: "Legendary Crafting", action: "UNIQUE" },
    transcendence: { label: "Hall of Transcendence", description: "God-tier Powers", action: "UNIQUE" }
};

