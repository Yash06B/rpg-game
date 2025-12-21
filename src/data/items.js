export const ITEMS = {
    // === RESOURCES ===
    iron_ore: { id: "iron_ore", type: "resource", label: "Iron Ore", rarity: "common", sellPrice: 5 },
    mythril: { id: "mythril", type: "resource", label: "Mythril", rarity: "rare", sellPrice: 50 },
    adamantite: { id: "adamantite", type: "resource", label: "Adamantite", rarity: "epic", sellPrice: 200 },
    orichalcum: { id: "orichalcum", type: "resource", label: "Orichalcum", rarity: "legendary", sellPrice: 1000 },
    wood: { id: "wood", type: "resource", label: "Wood", rarity: "common", sellPrice: 2 },
    dragon_scale: { id: "dragon_scale", type: "resource", label: "Dragon Scale", rarity: "epic", sellPrice: 500 },
    demon_soul: { id: "demon_soul", type: "resource", label: "Demon Soul", rarity: "legendary", sellPrice: 2000 },

    // === GEMS ===
    ruby: { id: "ruby", type: "gem", label: "Ruby", rarity: "rare", effect: "ATK+10", sellPrice: 100 },
    sapphire: { id: "sapphire", type: "gem", label: "Sapphire", rarity: "rare", effect: "MAG+10", sellPrice: 100 },
    emerald: { id: "emerald", type: "gem", label: "Emerald", rarity: "rare", effect: "DEF+10", sellPrice: 100 },
    diamond: { id: "diamond", type: "gem", label: "Diamond", rarity: "epic", effect: "ALL+15", sellPrice: 500 },

    // === SMITHING PARTS ===
    whetstone: { id: "whetstone", type: "smithing", label: "Whetstone", rarity: "common", enhanceChance: 0.9, sellPrice: 10 },
    reinforcement_stone: { id: "reinforcement_stone", type: "smithing", label: "Reinforcement Stone", rarity: "rare", enhanceChance: 0.7, sellPrice: 100 },
    enchantment_crystal: { id: "enchantment_crystal", type: "smithing", label: "Enchantment Crystal", rarity: "epic", enhanceChance: 0.5, sellPrice: 500 },

    // === CONSUMABLES ===
    potion_hp_sm: { id: "potion_hp_sm", type: "consumable", label: "Minor Health Potion", effect: "HEAL_50", buyPrice: 20, sellPrice: 5 },
    potion_hp_md: { id: "potion_hp_md", type: "consumable", label: "Health Potion", effect: "HEAL_150", buyPrice: 100, sellPrice: 25 },
    potion_hp_lg: { id: "potion_hp_lg", type: "consumable", label: "Greater Health Potion", effect: "HEAL_500", buyPrice: 500, sellPrice: 125 },
    potion_mp_sm: { id: "potion_mp_sm", type: "consumable", label: "Minor Mana Potion", effect: "MANA_30", buyPrice: 25, sellPrice: 6 },
    potion_mp_md: { id: "potion_mp_md", type: "consumable", label: "Mana Potion", effect: "MANA_100", buyPrice: 120, sellPrice: 30 },
    elixir_full: { id: "elixir_full", type: "consumable", label: "Full Elixir", effect: "FULL_RESTORE", buyPrice: 1000, sellPrice: 250 },

    // === WEAPONS (Swords) ===
    rusty_sword: {
        id: "rusty_sword", type: "weapon", subtype: "sword", label: "Rusty Sword",
        rarity: "common", stats: { atk: 5 }, buyPrice: 50, sellPrice: 10,
        description: "A worn blade. Better than fists, barely."
    },
    iron_sword: {
        id: "iron_sword", type: "weapon", subtype: "sword", label: "Iron Sword",
        rarity: "common", stats: { atk: 15 }, buyPrice: 200, sellPrice: 50,
        description: "Standard issue warrior's blade."
    },
    steel_sword: {
        id: "steel_sword", type: "weapon", subtype: "sword", label: "Steel Sword",
        rarity: "uncommon", stats: { atk: 30 }, buyPrice: 800, sellPrice: 200,
        description: "Well-forged and balanced."
    },
    mythril_blade: {
        id: "mythril_blade", type: "weapon", subtype: "sword", label: "Mythril Blade",
        rarity: "rare", stats: { atk: 60, spd: 5 }, buyPrice: 3000, sellPrice: 750,
        description: "Lightweight mythril allows faster strikes."
    },
    dragon_slayer: {
        id: "dragon_slayer", type: "weapon", subtype: "sword", label: "Dragon Slayer",
        rarity: "epic", stats: { atk: 120, mag: 20 }, buyPrice: 15000, sellPrice: 3750,
        description: "Forged from dragon fangs. Deals massive damage to dragons.",
        special: "DRAGON_SLAYER"
    },
    excalibur: {
        id: "excalibur", type: "weapon", subtype: "sword", label: "Excalibur",
        rarity: "legendary", stats: { atk: 250, mag: 50, def: 30 }, buyPrice: 100000, sellPrice: 25000,
        description: "The legendary sword of kings. Only the worthy can wield it.",
        special: "HOLY_BLADE"
    },
    god_slayer: {
        id: "god_slayer", type: "weapon", subtype: "sword", label: "God Slayer",
        rarity: "god", stats: { atk: 999, mag: 200 }, buyPrice: 999999, sellPrice: 99999,
        description: "A blade capable of slaying gods themselves.",
        special: "GOD_KILLER"
    },

    // === WEAPONS (Staves) ===
    wooden_staff: {
        id: "wooden_staff", type: "weapon", subtype: "staff", label: "Wooden Staff",
        rarity: "common", stats: { mag: 10, mp: 20 }, buyPrice: 100, sellPrice: 25,
        description: "Simple mage's staff."
    },
    crystal_staff: {
        id: "crystal_staff", type: "weapon", subtype: "staff", label: "Crystal Staff",
        rarity: "rare", stats: { mag: 50, mp: 100 }, buyPrice: 4000, sellPrice: 1000,
        description: "Amplifies magical power."
    },
    arch_mage_staff: {
        id: "arch_mage_staff", type: "weapon", subtype: "staff", label: "Archmage Staff",
        rarity: "epic", stats: { mag: 150, mp: 200, spd: 10 }, buyPrice: 25000, sellPrice: 6250,
        description: "Staff of the greatest mages."
    },
    staff_of_eternity: {
        id: "staff_of_eternity", type: "weapon", subtype: "staff", label: "Staff of Eternity",
        rarity: "legendary", stats: { mag: 400, mp: 500 }, buyPrice: 150000, sellPrice: 37500,
        description: "Contains infinite magical energy.",
        special: "INFINITE_MP"
    },

    // === WEAPONS (Bows) ===
    short_bow: {
        id: "short_bow", type: "weapon", subtype: "bow", label: "Short Bow",
        rarity: "common", stats: { atk: 12, spd: 8 }, buyPrice: 150, sellPrice: 37,
        description: "Basic hunter's bow."
    },
    elven_bow: {
        id: "elven_bow", type: "weapon", subtype: "bow", label: "Elven Bow",
        rarity: "rare", stats: { atk: 70, spd: 20 }, buyPrice: 5000, sellPrice: 1250,
        description: "Crafted by elven masters."
    },
    heavens_arrow: {
        id: "heavens_arrow", type: "weapon", subtype: "bow", label: "Heaven's Arrow",
        rarity: "legendary", stats: { atk: 300, spd: 50 }, buyPrice: 120000, sellPrice: 30000,
        description: "Never misses its mark.",
        special: "PERFECT_ACCURACY"
    },

    // === ARMOR (Light) ===
    cloth_tunic: {
        id: "cloth_tunic", type: "armor", subtype: "light", label: "Cloth Tunic",
        rarity: "common", stats: { def: 3 }, buyPrice: 30, sellPrice: 7,
        description: "Basic cloth armor."
    },
    leather_armor: {
        id: "leather_armor", type: "armor", subtype: "light", label: "Leather Armor",
        rarity: "uncommon", stats: { def: 15, spd: 5 }, buyPrice: 500, sellPrice: 125,
        description: "Light but protective."
    },
    enchanted_robes: {
        id: "enchanted_robes", type: "armor", subtype: "light", label: "Enchanted Robes",
        rarity: "rare", stats: { def: 35, mag: 30, mp: 100 }, buyPrice: 4500, sellPrice: 1125,
        description: "Robes imbued with magic."
    },

    // === ARMOR (Heavy) ===
    iron_plate: {
        id: "iron_plate", type: "armor", subtype: "heavy", label: "Iron Plate",
        rarity: "common", stats: { def: 25, spd: -5 }, buyPrice: 600, sellPrice: 150,
        description: "Heavy but protective. Reduces speed."
    },
    steel_plate: {
        id: "steel_plate", type: "armor", subtype: "heavy", label: "Steel Plate",
        rarity: "uncommon", stats: { def: 50, hp: 50 }, buyPrice: 2000, sellPrice: 500,
        description: "Standard knight armor."
    },
    dragon_mail: {
        id: "dragon_mail", type: "armor", subtype: "heavy", label: "Dragon Mail",
        rarity: "epic", stats: { def: 120, hp: 200 }, buyPrice: 20000, sellPrice: 5000,
        description: "Armor made from dragon scales.",
        special: "FIRE_RESIST"
    },
    titan_armor: {
        id: "titan_armor", type: "armor", subtype: "heavy", label: "Titan Armor",
        rarity: "legendary", stats: { def: 300, hp: 500, atk: 50 }, buyPrice: 180000, sellPrice: 45000,
        description: "Armor of the ancient titans.",
        special: "IMMOVABLE"
    },

    // === ACCESSORIES ===
    hp_ring: {
        id: "hp_ring", type: "accessory", label: "Ring of Vitality",
        rarity: "uncommon", stats: { hp: 100 }, buyPrice: 1000, sellPrice: 250,
        description: "+100 Max HP"
    },
    mp_ring: {
        id: "mp_ring", type: "accessory", label: "Ring of Mana",
        rarity: "uncommon", stats: { mp: 100 }, buyPrice: 1000, sellPrice: 250,
        description: "+100 Max MP"
    },
    speed_boots: {
        id: "speed_boots", type: "accessory", label: "Boots of Haste",
        rarity: "rare", stats: { spd: 30 }, buyPrice: 5000, sellPrice: 1250,
        description: "+30 Speed"
    },
    demon_ring: {
        id: "demon_ring", type: "accessory", label: "Demon Lord's Ring",
        rarity: "epic", stats: { atk: 50, mag: 50, def: 50 }, buyPrice: 30000, sellPrice: 7500,
        description: "Power stolen from demon lords.",
        special: "DEMON_POWER"
    }
};

export const RECIPES = [
    // Basic Weapons
    { result: "iron_sword", materials: { iron_ore: 5, wood: 2 }, cost: 150 },
    { result: "steel_sword", materials: { iron_ore: 15, wood: 5 }, cost: 600 },
    { result: "mythril_blade", materials: { mythril: 10, iron_ore: 20 }, cost: 2500 },

    // Staves
    { result: "wooden_staff", materials: { wood: 10 }, cost: 80 },
    { result: "crystal_staff", materials: { sapphire: 3, mythril: 5 }, cost: 3500 },

    // Bows
    { result: "short_bow", materials: { wood: 8 }, cost: 120 },
    { result: "elven_bow", materials: { wood: 20, mythril: 5 }, cost: 4000 },

    // Armor
    { result: "leather_armor", materials: { wood: 15 }, cost: 400 },
    { result: "iron_plate", materials: { iron_ore: 20 }, cost: 500 },
    { result: "steel_plate", materials: { iron_ore: 40, mythril: 5 }, cost: 1800 },

    // Consumables
    { result: "potion_hp_sm", materials: { wood: 1 }, cost: 15 },
    { result: "potion_mp_sm", materials: { wood: 1 }, cost: 20 },
    { result: "potion_hp_md", materials: { iron_ore: 2, wood: 3 }, cost: 80 }
];

// Equipment Enhancement System
export const ENHANCEMENT = {
    // Enhancement level bonuses (multiplier per +1)
    statBonus: 0.1, // Each + level adds 10% to base stats

    // Success rates by enhancement level
    successRates: {
        0: 1.0,   // +0 to +1: 100%
        1: 0.95,  // +1 to +2: 95%
        2: 0.90,  // +2 to +3: 90%
        3: 0.85,  // +3 to +4: 85%
        4: 0.80,  // +4 to +5: 80%
        5: 0.70,  // +5 to +6: 70%
        6: 0.60,  // +6 to +7: 60%
        7: 0.50,  // +7 to +8: 50%
        8: 0.40,  // +8 to +9: 40%
        9: 0.30,  // +9 to +10: 30%
        10: 0.25, // +10 to +11: 25%
        11: 0.20, // +11 to +12: 20%
        12: 0.15, // +12 to +13: 15%
        13: 0.10, // +13 to +14: 10%
        14: 0.05  // +14 to +15: 5%
    },

    // Cost per enhancement level
    costs: {
        0: 100, 1: 200, 2: 400, 3: 800, 4: 1600,
        5: 3200, 6: 6400, 7: 12800, 8: 25600, 9: 51200,
        10: 102400, 11: 204800, 12: 409600, 13: 819200, 14: 1638400
    }
};

// Calculate enhanced stats
export function getEnhancedStats(item, enhanceLevel = 0) {
    if (!item.stats || enhanceLevel === 0) return item.stats || {};

    const enhanced = {};
    for (const [stat, value] of Object.entries(item.stats)) {
        enhanced[stat] = Math.floor(value * (1 + ENHANCEMENT.statBonus * enhanceLevel));
    }
    return enhanced;
}

// Get item display name with enhancement
export function getItemDisplayName(item, enhanceLevel = 0) {
    if (!enhanceLevel) return item.label;
    return `${item.label} +${enhanceLevel}`;
}
