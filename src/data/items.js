export const ITEMS = {
    // --- Resources ---
    iron_ore: { id: "iron_ore", type: "resource", label: "Iron Ore", rarity: "common" },
    mythril: { id: "mythril", type: "resource", label: "Mythril", rarity: "rare" },
    adamantite: { id: "adamantite", type: "resource", label: "Adamantite", rarity: "epic" },
    orichalcum: { id: "orichalcum", type: "resource", label: "Orichalcum", rarity: "legendary" },
    wood: { id: "wood", type: "resource", label: "Wood", rarity: "common" },
    dragon_scale: { id: "dragon_scale", type: "resource", label: "Dragon Scale", rarity: "epic" },
    demon_soul: { id: "demon_soul", type: "resource", label: "Demon Soul", rarity: "legendary" },

    // --- Consumables ---
    portion_hp_sm: { id: "potion_hp_sm", type: "consumable", label: "Minor Health Potion", effect: "HEAL_50" },
    potion_mp_sm: { id: "potion_mp_sm", type: "consumable", label: "Minor Mana Potion", effect: "MANA_20" },

    // --- Equipment (Weapons) ---
    rusty_sword: { id: "rusty_sword", type: "weapon", label: "Rusty Sword", stats: { atk: 5 } },
    steel_sword: { id: "steel_sword", type: "weapon", label: "Steel Sword", stats: { atk: 15 } },
    mythril_blade: { id: "mythril_blade", type: "weapon", label: "Mythril Blade", stats: { atk: 35 } },
    god_slayer: { id: "god_slayer", type: "weapon", label: "God Slayer", stats: { atk: 999 }, rarity: "god" },

    // --- Equipment (Armor) ---
    cloth_tunic: { id: "cloth_tunic", type: "armor", label: "Cloth Tunic", stats: { def: 2 } },
    iron_plate: { id: "iron_plate", type: "armor", label: "Iron Plate", stats: { def: 10 } },
    dragon_mail: { id: "dragon_mail", type: "armor", label: "Dragon Mail", stats: { def: 50 } },
};

export const RECIPES = [
    {
        result: "steel_sword",
        materials: { iron_ore: 5, wood: 2 },
        cost: 100
    },
    {
        result: "mythril_blade",
        materials: { mythril: 5, iron_ore: 10 },
        cost: 500
    },
    {
        result: "potion_hp_sm",
        materials: { wood: 1 }, // simplified
        cost: 10
    }
];
