// Gem System & Equipment Sets Extension for items.js

// === GEM SOCKETING SYSTEM ===
export const GEM_SYSTEM = {
    // Gem Types
    GEMS: {
        ruby: {
            id: "ruby",
            name: "Ruby",
            tier: 1,
            stats: { atk: 5 },
            description: "Crimson gem that increases attack power.",
            socketCost: 100
        },
        ruby_flawless: {
            id: "ruby_flawless",
            name: "Flawless Ruby",
            tier: 2,
            stats: { atk: 15 },
            description: "Perfect ruby with enhanced attack power.",
            socketCost: 500
        },
        sapphire: {
            id: "sapphire",
            name: "Sapphire",
            tier: 1,
            stats: { mag: 5 },
            description: "Blue gem that increases magic power.",
            socketCost: 100
        },
        sapphire_flawless: {
            id: "sapphire_flawless",
            name: "Flawless Sapphire",
            tier: 2,
            stats: { mag: 15 },
            description: "Perfect sapphire with enhanced magic power.",
            socketCost: 500
        },
        emerald: {
            id: "emerald",
            name: "Emerald",
            tier: 1,
            stats: { def: 5 },
            description: "Green gem that increases defense.",
            socketCost: 100
        },
        emerald_flawless: {
            id: "emerald_flawless",
            name: "Flawless Emerald",
            tier: 2,
            stats: { def: 15 },
            description: "Perfect emerald with enhanced defense.",
            socketCost: 500
        },
        diamond: {
            id: "diamond",
            name: "Diamond",
            tier: 2,
            stats: { maxHp: 50 },
            description: "Rare gem that increases max HP.",
            socketCost: 500
        },
        diamond_perfect: {
            id: "diamond_perfect",
            name: "Perfect Diamond",
            tier: 3,
            stats: { maxHp: 150 },
            description: "Flawless diamond with massive HP boost.",
            socketCost: 2000
        },
        amethyst: {
            id: "amethyst",
            name: "Amethyst",
            tier: 2,
            stats: { maxMp: 30 },
            description: "Purple gem that increases max MP.",
            socketCost: 500
        },
        topaz: {
            id: "topaz",
            name: "Topaz",
            tier: 1,
            stats: { spd: 3 },
            description: "Yellow gem that increases speed.",
            socketCost: 100
        },
        onyx: {
            id: "onyx",
            name: "Onyx",
            tier: 2,
            stats: { atk: 10, def: 5 },
            description: "Black gem with balanced power.",
            socketCost: 800
        },
        opal: {
            id: "opal",
            name: "Opal",
            tier: 3,
            stats: { atk: 20, mag: 20 },
            description: "Rare gem boosting both physical and magic power.",
            socketCost: 3000
        },
        obsidian: {
            id: "obsidian",
            name: "Obsidian Shard",
            tier: 3,
            stats: { atk: 25, critRate: 5 },
            description: "Dark volcanic gem with critical strike bonus.",
            socketCost: 2500
        }
    },

    // Socket configuration
    MAX_SOCKETS: {
        weapon: 3,
        armor: 2,
        accessory: 1
    },

    // Gem removal cost (% of socket cost)
    REMOVAL_COST_MULTIPLIER: 0.5,

    // Chance to destroy gem on removal
    REMOVAL_DESTROY_CHANCE: 0.25
};

// === EQUIPMENT SET SYSTEM ===
export const EQUIPMENT_SETS = {
    warrior_set: {
        id: "warrior_set",
        name: "Warrior's Honor Set",
        description: "Forged for legendary warriors.",
        items: ["warrior_sword", "warrior_armor", "warrior_shield"],
        bonuses: {
            2: { atk: 20, def: 10, description: "(2) Set: +20 ATK, +10 DEF" },
            3: { atk: 50, def: 30, maxHp: 100, description: "(3) Set: +50 ATK, +30 DEF, +100 HP. Unlocks 'War Cry' skill" }
        }
    },

    mage_set: {
        id: "mage_set",
        name: "Archmage's Wisdom Set",
        description: "Worn by the greatest mages.",
        items: ["mage_staff", "mage_robe", "mage_hat"],
        bonuses: {
            2: { mag: 25, maxMp: 50, description: "(2) Set: +25 MAG, +50 MP" },
            3: { mag: 60, maxMp: 150, mpRegen: 5, description: "(3) Set: +60 MAG, +150 MP, +5 MP/turn. Unlocks 'Arcane Mastery'" }
        }
    },

    assassin_set: {
        id: "assassin_set",
        name: "Shadow Assassin Set",
        description: "For those who strike from darkness.",
        items: ["assassin_dagger", "assassin_cloak", "assassin_boots"],
        bonuses: {
            2: { spd: 10, critRate: 10, description: "(2) Set: +10 SPD, +10% Crit" },
            3: { spd: 25, critRate: 25, critDmg: 50, description: "(3) Set: +25 SPD, +25% Crit, +50% Crit Damage. Unlocks 'Backstab'" }
        }
    },

    paladin_set: {
        id: "paladin_set",
        name: "Holy Paladin Set",
        description: "Blessed armor of divine champions.",
        items: ["holy_sword", "paladin_armor", "guardian_shield"],
        bonuses: {
            2: { def: 20, maxHp: 100, description: "(2) Set: +20 DEF, +100 HP" },
            3: { def: 50, maxHp: 250, hpRegen: 10, description: "(3) Set: +50 DEF, +250 HP, +10 HP/turn. Unlocks 'Divine Shield'" }
        }
    },

    ranger_set: {
        id: "ranger_set",
        name: "Forest Ranger Set",
        description: "One with nature and the hunt.",
        items: ["ranger_bow", "ranger_tunic", "ranger_quiver"],
        bonuses: {
            2: { atk: 15, spd: 8, description: "(2) Set: +15 ATK, +8 SPD" },
            3: { atk: 40, spd: 20, evasion: 15, description: "(3) Set: +40 ATK, +20 SPD, +15% Evasion. Unlocks 'Multi-Shot'" }
        }
    },

    necromancer_set: {
        id: "necromancer_set",
        name: "Necromancer's Bane Set",
        description: "Harness the power of death itself.",
        items: ["death_staff", "necro_robe", "skull_amulet"],
        bonuses: {
            2: { mag: 20, maxMp: 75, description: "(2) Set: +20 MAG, +75 MP" },
            3: { mag: 55, maxMp: 200, lifesteal: 15, description: "(3) Set: +55 MAG, +200 MP, +15% Lifesteal. Unlocks 'Raise Dead'" }
        }
    },

    dragon_slayer_set: {
        id: "dragon_slayer_set",
        name: "Dragon Slayer Set",
        description: "Crafted from dragon scales and bones.",
        items: ["dragon_slayer_sword", "dragonscale_armor", "dragon_helm"],
        bonuses: {
            2: { atk: 30, def: 25, description: "(2) Set: +30 ATK, +25 DEF. +50% damage to dragons" },
            3: { atk: 80, def: 60, maxHp: 200, description: "(3) Set: +80 ATK, +60 DEF, +200 HP. +100% damage to dragons. Fire immunity" }
        }
    },

    god_tier_set: {
        id: "god_tier_set",
        name: "God's Chosen Set",
        description: "Equipment of divine beings.",
        items: ["god_blade", "divine_armor", "celestial_crown"],
        bonuses: {
            2: { atk: 50, mag: 50, description: "(2) Set: +50 ATK, +50 MAG" },
            3: {
                atk: 150, mag: 150, def: 100, maxHp: 500, maxMp: 500,
                description: "(3) Set: +150 ATK/MAG, +100 DEF, +500 HP/MP. All skills unlocked. Immortality (revive once per battle)"
            }
        }
    }
};

// Helper Functions
export function getGemStats(gemId) {
    return GEM_SYSTEM.GEMS[gemId]?.stats || {};
}

export function canSocketGem(itemType) {
    return GEM_SYSTEM.MAX_SOCKETS[itemType] > 0;
}

export function getMaxSockets(itemType) {
    return GEM_SYSTEM.MAX_SOCKETS[itemType] || 0;
}

export function calculateSetBonuses(equippedItems) {
    const setBonuses = {};

    // Count items per set
    const setCounts = {};
    equippedItems.forEach(item => {
        if (item && item.setId) {
            setCounts[item.setId] = (setCounts[item.setId] || 0) + 1;
        }
    });

    // Calculate bonuses
    Object.entries(setCounts).forEach(([setId, count]) => {
        const set = EQUIPMENT_SETS[setId];
        if (set) {
            // Apply all bonuses up to the count
            Object.entries(set.bonuses).forEach(([requiredCount, bonus]) => {
                if (count >= parseInt(requiredCount)) {
                    Object.entries(bonus).forEach(([stat, value]) => {
                        if (stat !== 'description') {
                            setBonuses[stat] = (setBonuses[stat] || 0) + value;
                        }
                    });
                }
            });
        }
    });

    return setBonuses;
}

export function getActiveSetBonusText(equippedItems) {
    const setCounts = {};
    equippedItems.forEach(item => {
        if (item && item.setId) {
            setCounts[item.setId] = (setCounts[item.setId] || 0) + 1;
        }
    });

    const activeTexts = [];
    Object.entries(setCounts).forEach(([setId, count]) => {
        const set = EQUIPMENT_SETS[setId];
        if (set) {
            Object.entries(set.bonuses).forEach(([requiredCount, bonus]) => {
                if (count >= parseInt(requiredCount)) {
                    activeTexts.push(`${set.name} ${bonus.description}`);
                }
            });
        }
    });

    return activeTexts;
}
