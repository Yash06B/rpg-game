// Comprehensive Skill System
// Skills are organized by class with auto-unlock levels and evolution tiers

export const SKILLS = {
    // === MAGE SKILLS ===
    fireball: {
        id: "fireball", name: "Fireball", class: "Mage",
        type: "active", element: "fire", mpCost: 10,
        baseDamage: 25, unlockLevel: 1,
        description: "Hurl a ball of flame at your enemy.",
        evolutions: {
            3: { name: "Fireball II", damage: 40, mpCost: 15, desc: "Larger, hotter fireball." },
            7: { name: "Greater Fireball", damage: 70, mpCost: 25, desc: "Explosive inferno." },
            10: { name: "Inferno Blast", damage: 120, mpCost: 40, desc: "Apocalyptic flames engulf the battlefield." }
        }
    },
    ice_shard: {
        id: "ice_shard", name: "Ice Shard", class: "Mage",
        type: "active", element: "ice", mpCost: 8,
        baseDamage: 20, unlockLevel: 3,
        description: "Launch a jagged shard of ice.",
        evolutions: {
            3: { name: "Ice Lance", damage: 35, mpCost: 12 },
            7: { name: "Glacial Spear", damage: 60, mpCost: 20 },
            10: { name: "Absolute Zero", damage: 100, mpCost: 35, desc: "Freezes enemies solid." }
        }
    },
    lightning_bolt: {
        id: "lightning_bolt", name: "Lightning Bolt", class: "Mage",
        type: "active", element: "lightning", mpCost: 12,
        baseDamage: 30, unlockLevel: 5,
        description: "Call down a bolt of lightning.",
        evolutions: {
            3: { name: "Chain Lightning", damage: 45, mpCost: 18 },
            7: { name: "Thunder Strike", damage: 75, mpCost: 28 },
            10: { name: "Storm of Ages", damage: 130, mpCost: 45 }
        }
    },
    mana_shield: {
        id: "mana_shield", name: "Mana Shield", class: "Mage",
        type: "active", mpCost: 15, unlockLevel: 8,
        description: "Convert MP into a protective barrier.",
        effect: "SHIELD_30",
        evolutions: {
            3: { name: "Arcane Barrier", effect: "SHIELD_50" },
            7: { name: "Mystic Fortress", effect: "SHIELD_80" },
            10: { name: "Invulnerability", effect: "SHIELD_150" }
        }
    },
    magic_mastery: {
        id: "magic_mastery", name: "Magic Mastery", class: "Mage",
        type: "passive", unlockLevel: 10,
        description: "Increases MAG by 10%.",
        effect: "MAG_10_PERCENT",
        evolutions: {
            3: { effect: "MAG_20_PERCENT" },
            7: { effect: "MAG_35_PERCENT" },
            10: { effect: "MAG_50_PERCENT" }
        }
    },

    // === WARRIOR SKILLS ===
    slash: {
        id: "slash", name: "Slash", class: "Warrior",
        type: "active", mpCost: 5,
        baseDamage: 30, unlockLevel: 1,
        description: "A powerful sword slash.",
        evolutions: {
            3: { name: "Cleave", damage: 50 },
            7: { name: "Devastating Strike", damage: 85 },
            10: { name: "God Slayer Slash", damage: 150 }
        }
    },
    shield_bash: {
        id: "shield_bash", name: "Shield Bash", class: "Warrior",
        type: "active", mpCost: 8,
        baseDamage: 20, unlockLevel: 3,
        description: "Stun enemy with your shield.",
        effect: "STUN_1_TURN",
        evolutions: {
            3: { name: "Shield Charge", damage: 35, effect: "STUN_2_TURN" },
            7: { name: "Fortress Slam", damage: 60, effect: "STUN_3_TURN" },
            10: { name: "Avalanche Impact", damage: 100, effect: "STUN_5_TURN" }
        }
    },
    berserk: {
        id: "berserk", name: "Berserk", class: "Warrior",
        type: "active", mpCost: 20, unlockLevel: 10,
        description: "Enter a rage state. +50% ATK, -20% DEF.",
        effect: "BERSERK_MODE",
        evolutions: {
            3: { effect: "BERSERK_ENHANCED" },
            7: { effect: "BERSERK_ULTIMATE" },
            10: { effect: "WAR_GOD_MODE" }
        }
    },
    iron_skin: {
        id: "iron_skin", name: "Iron Skin", class: "Warrior",
        type: "passive", unlockLevel: 5,
        description: "Increases DEF by 15%.",
        effect: "DEF_15_PERCENT"
    },
    battle_cry: {
        id: "battle_cry", name: "Battle Cry", class: "Warrior",
        type: "active", mpCost: 10, unlockLevel: 7,
        description: "Boost your ATK by 30% for 3 turns.",
        effect: "ATK_BUFF_30"
    },

    // === ROGUE SKILLS ===
    backstab: {
        id: "backstab", name: "Backstab", class: "Rogue",
        type: "active", mpCost: 12,
        baseDamage: 40, unlockLevel: 1,
        description: "Strike from the shadows. High crit chance.",
        critChance: 50,
        evolutions: {
            3: { name: "Assassinate", damage: 70, critChance: 60 },
            7: { name: "Death Strike", damage: 110, critChance: 75 },
            10: { name: "Silent Apocalypse", damage: 200, critChance: 90 }
        }
    },
    poison_blade: {
        id: "poison_blade", name: "Poison Blade", class: "Rogue",
        type: "active", mpCost: 8,
        baseDamage: 25, unlockLevel: 4,
        description: "Poison your enemy. Deals damage over time.",
        effect: "POISON_3_TURNS",
        evolutions: {
            3: { name: "Venom Strike", effect: "POISON_5_TURNS" },
            7: { name: "Deadly Toxin", effect: "POISON_8_TURNS" },
            10: { name: "Plague Touch", effect: "POISON_PERMANENT" }
        }
    },
    shadow_step: {
        id: "shadow_step", name: "Shadow Step", class: "Rogue",
        type: "active", mpCost: 15, unlockLevel: 8,
        description: "Become untargetable for 1 turn.",
        effect: "DODGE_NEXT",
        evolutions: {
            3: { effect: "DODGE_2_TURNS" },
            7: { effect: "DODGE_3_TURNS" },
            10: { effect: "VOID_FORM" }
        }
    },
    critical_eye: {
        id: "critical_eye", name: "Critical Eye", class: "Rogue",
        type: "passive", unlockLevel: 6,
        description: "+10% critical hit chance.",
        effect: "CRIT_10_PERCENT"
    },

    // === CLERIC SKILLS ===
    heal: {
        id: "heal", name: "Heal", class: "Cleric",
        type: "active", mpCost: 15, unlockLevel: 1,
        description: "Restore 50 HP.",
        healing: 50,
        evolutions: {
            3: { name: "Greater Heal", healing: 100, mpCost: 25 },
            7: { name: "Divine Restoration", healing: 200, mpCost: 40 },
            10: { name: "Resurrection", healing: 9999, mpCost: 80, desc: "Full heal + remove all debuffs" }
        }
    },
    holy_smite: {
        id: "holy_smite", name: "Holy Smite", class: "Cleric",
        type: "active", element: "holy", mpCost: 10,
        baseDamage: 35, unlockLevel: 3,
        description: "Strike with holy light. Deals extra damage to demons.",
        demonMultiplier: 2,
        evolutions: {
            3: { name: "Divine Strike", damage: 60, demonMultiplier: 3 },
            7: { name: "Heaven's Judgment", damage: 100, demonMultiplier: 5 },
            10: { name: "God's Wrath", damage: 180, demonMultiplier: 10 }
        }
    },
    divine_protection: {
        id: "divine_protection", name: "Divine Protection", class: "Cleric",
        type: "passive", unlockLevel: 7,
        description: "Reduce all damage taken by 10%.",
        effect: "DMG_REDUCTION_10"
    },

    // === ARCHER SKILLS ===
    arrow_shot: {
        id: "arrow_shot", name: "Arrow Shot", class: "Archer",
        type: "active", mpCost: 5,
        baseDamage: 28, unlockLevel: 1,
        description: "Quick and precise arrow.",
        evolutions: {
            3: { name: "Power Shot", damage: 48 },
            7: { name: "Piercing Arrow", damage: 80 },
            10: { name: "Heaven's Bolt", damage: 140 }
        }
    },
    multi_shot: {
        id: "multi_shot", name: "Multi-Shot", class: "Archer",
        type: "active", mpCost: 18, unlockLevel: 6,
        description: "Fire 3 arrows at once.",
        hits: 3, baseDamage: 20,
        evolutions: {
            3: { hits: 5, damage: 30 },
            7: { hits: 8, damage: 45 },
            10: { name: "Arrow Storm", hits: 15, damage: 60 }
        }
    },
    eagle_eye: {
        id: "eagle_eye", name: "Eagle Eye", class: "Archer",
        type: "passive", unlockLevel: 4,
        description: "+15% accuracy and crit damage.",
        effect: "ACC_CRIT_BOOST"
    },

    // === NECROMANCER SKILLS ===
    death_bolt: {
        id: "death_bolt", name: "Death Bolt", class: "Necromancer",
        type: "active", element: "dark", mpCost: 12,
        baseDamage: 32, unlockLevel: 1,
        description: "Blast of necrotic energy.",
        evolutions: {
            3: { name: "Death Wave", damage: 55 },
            7: { name: "Soul Reap", damage: 90 },
            10: { name: "Apocalypse", damage: 160 }
        }
    },
    raise_undead: {
        id: "raise_undead", name: "Raise Undead", class: "Necromancer",
        type: "active", mpCost: 30, unlockLevel: 8,
        description: "Summon a skeleton ally.",
        effect: "SUMMON_SKELETON",
        evolutions: {
            3: { effect: "SUMMON_LICH" },
            7: { effect: "SUMMON_DEATH_KNIGHT" },
            10: { effect: "SUMMON_UNDEAD_ARMY" }
        }
    },
    life_drain: {
        id: "life_drain", name: "Life Drain", class: "Necromancer",
        type: "active", mpCost: 15, unlockLevel: 5,
        description: "Steal HP equal to 50% of damage dealt.",
        baseDamage: 30, lifesteal: 0.5
    },

    // === UNIVERSAL/PURCHASABLE SKILLS ===
    double_strike: {
        id: "double_strike", name: "Double Strike", class: "Universal",
        type: "active", mpCost: 20, purchaseCost: 500,
        description: "Attack twice in one turn!",
        baseDamage: 40
    },
    meditation: {
        id: "meditation", name: "Meditation", class: "Universal",
        type: "active", mpCost: 0, purchaseCost: 300,
        description: "Restore 30 MP.",
        mpRestore: 30
    },
    iron_will: {
        id: "iron_will", name: "Iron Will", class: "Universal",
        type: "passive", purchaseCost: 800,
        description: "Immune to status effects.",
        effect: "STATUS_IMMUNE"
    },
    hp_boost: {
        id: "hp_boost", name: "HP Boost", class: "Universal",
        type: "passive", purchaseCost: 600,
        description: "+20% Max HP.",
        effect: "HP_20_PERCENT"
    },
    mp_boost: {
        id: "mp_boost", name: "MP Boost", class: "Universal",
        type: "passive", purchaseCost: 600,
        description: "+20% Max MP.",
        effect: "MP_20_PERCENT"
    },
    counter_attack: {
        id: "counter_attack", name: "Counter Attack", class: "Universal",
        type: "passive", purchaseCost: 1000,
        description: "20% chance to counter when attacked.",
        effect: "COUNTER_20_PERCENT"
    }
};

// Skill collections by class for easier access
export const CLASS_SKILLS = {
    Mage: ['fireball', 'ice_shard', 'lightning_bolt', 'mana_shield', 'magic_mastery'],
    Warrior: ['slash', 'shield_bash', 'berserk', 'iron_skin', 'battle_cry'],
    Rogue: ['backstab', 'poison_blade', 'shadow_step', 'critical_eye'],
    Cleric: ['heal', 'holy_smite', 'divine_protection'],
    Archer: ['arrow_shot', 'multi_shot', 'eagle_eye'],
    Necromancer: ['death_bolt', 'raise_undead', 'life_drain'],
    // Other classes would continue...
};

// Utility function to get skill at specific level
export function getSkillAtLevel(skillId, level) {
    const skill = SKILLS[skillId];
    if (!skill) return null;

    let effectiveSkill = { ...skill, currentLevel: level };

    // Apply evolutions
    if (skill.evolutions) {
        if (level >= 10 && skill.evolutions[10]) {
            effectiveSkill = { ...effectiveSkill, ...skill.evolutions[10] };
        } else if (level >= 7 && skill.evolutions[7]) {
            effectiveSkill = { ...effectiveSkill, ...skill.evolutions[7] };
        } else if (level >= 3 && skill.evolutions[3]) {
            effectiveSkill = { ...effectiveSkill, ...skill.evolutions[3] };
        }
    }

    return effectiveSkill;
}
