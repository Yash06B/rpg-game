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

    // === BERSERKER SKILLS ===
    frenzy: {
        id: "frenzy", name: "Frenzy", class: "Berserker",
        type: "active", mpCost: 10, unlockLevel: 1,
        description: "Rapid flurry of blows.",
        baseDamage: 40,
        evolutions: { 3: { damage: 60 }, 7: { damage: 90 }, 10: { name: "Bloodstorm", damage: 150 } }
    },
    reckless_swing: {
        id: "reckless_swing", name: "Reckless Swing", class: "Berserker",
        type: "active", mpCost: 15, unlockLevel: 3,
        description: "Massive damage, but take recoil.",
        baseDamage: 60, recoil: 0.2, // 20% recoil
        evolutions: { 3: { damage: 90 }, 7: { damage: 140 }, 10: { damage: 250, name: "Suicide Strike" } }
    },
    undying_rage: {
        id: "undying_rage", name: "Undying Rage", class: "Berserker",
        type: "passive", unlockLevel: 7,
        description: "Survive lethal damage once per battle.",
        effect: "PREVENT_DEATH_ONCE"
    },

    // === MONK SKILLS ===
    palm_strike: {
        id: "palm_strike", name: "Palm Strike", class: "Monk",
        type: "active", mpCost: 8, unlockLevel: 1,
        description: "Ignore 50% of enemy DEF.",
        baseDamage: 30, ignoreDef: 0.5,
        evolutions: { 3: { damage: 50 }, 7: { damage: 80 }, 10: { name: "Thousand Palms", damage: 140, ignoreDef: 1.0 } }
    },
    chakra_heal: {
        id: "chakra_heal", name: "Chakra Heal", class: "Monk",
        type: "active", mpCost: 20, unlockLevel: 5,
        description: "Heal self and cure poison.",
        healing: 60, effect: "CURE_POISON",
        evolutions: { 3: { healing: 100 }, 7: { healing: 200 }, 10: { name: "Nirvana", healing: 999 } }
    },
    evasion_mastery: {
        id: "evasion_mastery", name: "Flow Like Water", class: "Monk",
        type: "passive", unlockLevel: 8,
        description: "+20% Dodge Chance.",
        effect: "DODGE_20_PERCENT"
    },

    // === BARD SKILLS ===
    song_of_courage: {
        id: "song_of_courage", name: "Song of Courage", class: "Bard",
        type: "active", mpCost: 15, unlockLevel: 1,
        description: "Buff party ATK/DEF by 20% for 3 turns.",
        effect: "BUFF_ALL_20",
        evolutions: { 3: { effect: "BUFF_ALL_30" }, 7: { effect: "BUFF_ALL_50" }, 10: { name: "Heroic Anthem", effect: "BUFF_ALL_100" } }
    },
    lullaby: {
        id: "lullaby", name: "Lullaby", class: "Bard",
        type: "active", mpCost: 25, unlockLevel: 4,
        description: "Sleep enemy for 2 turns.",
        effect: "SLEEP_2_TURNS",
        evolutions: { 7: { effect: "SLEEP_3_TURNS" }, 10: { name: "Eternal Slumber", effect: "SLEEP_5_TURNS" } }
    },
    dissonant_chord: {
        id: "dissonant_chord", name: "Dissonant Chord", class: "Bard",
        type: "active", mpCost: 10, unlockLevel: 2,
        description: "Sonic damage ignoring armor.",
        baseDamage: 25, ignoreDef: 1.0,
        evolutions: { 3: { damage: 45 }, 7: { damage: 80 }, 10: { damage: 150 } }
    },

    // === DRUID SKILLS ===
    vine_whip: {
        id: "vine_whip", name: "Vine Whip", class: "Druid",
        type: "active", element: "nature", mpCost: 10, unlockLevel: 1,
        description: "Strike with vines.",
        baseDamage: 28,
        evolutions: { 3: { damage: 50 }, 7: { damage: 85 }, 10: { name: "Wrath of Nature", damage: 160 } }
    },
    bear_form: {
        id: "bear_form", name: "Bear Form", class: "Druid",
        type: "active", mpCost: 30, unlockLevel: 5,
        description: "Transform into Bear. Only use physical attacks. +HP/ATK.",
        effect: "TRANSFORM_BEAR", duration: 3,
        evolutions: { 7: { duration: 5 }, 10: { name: "Dire Bear Form", duration: 99 } }
    },
    regrowth: {
        id: "regrowth", name: "Regrowth", class: "Druid",
        type: "active", mpCost: 15, unlockLevel: 3,
        description: "Heal over time (3 turns).",
        healOverTime: 20,
        evolutions: { 3: { healOverTime: 40 }, 7: { healOverTime: 80 }, 10: { healOverTime: 150 } }
    },

    // === KNIGHT SKILLS ===
    provoke: {
        id: "provoke", name: "Provoke", class: "Knight",
        type: "active", mpCost: 10, unlockLevel: 1,
        description: "Force enemy to attack you. +DEF.",
        effect: "TAUNT_DEF_UP",
        evolutions: { 3: { effect: "TAUNT_DEF_UP_2" }, 7: { effect: "TAUNT_INVINCIBLE_1_TURN" } }
    },
    shield_wall: {
        id: "shield_wall", name: "Shield Wall", class: "Knight",
        type: "active", mpCost: 20, unlockLevel: 4,
        description: "Double DEF for 3 turns.",
        effect: "DEF_DOUBLE",
        evolutions: { 10: { name: "Immovable Object", effect: "DEF_TRIPLE" } }
    },
    justice_blade: {
        id: "justice_blade", name: "Justice Blade", class: "Knight",
        type: "active", mpCost: 15, unlockLevel: 6,
        description: "Damage scales with DEF.",
        baseDamage: 30, scaleWithDef: true,
        evolutions: { 7: { damage: 60 }, 10: { damage: 120 } }
    },

    // === ASSASSIN SKILLS ===
    execute: {
        id: "execute", name: "Execute", class: "Assassin",
        type: "active", mpCost: 40, unlockLevel: 10,
        description: "Deal massive damage to low HP targets.",
        baseDamage: 100, bonusLowHp: 3.0, // 3x dmg if enemy < 30% hp
        evolutions: { 10: { name: "Death Sentence", baseDamage: 200 } }
    },
    smoke_bomb: {
        id: "smoke_bomb", name: "Smoke Bomb", class: "Assassin",
        type: "active", mpCost: 15, unlockLevel: 3,
        description: "Escape combat guaranteed OR blind enemy.",
        effect: "BLIND_ENEMY",
        evolutions: { 7: { effect: "BLIND_PERMANENT" } }
    },
    dual_slash: {
        id: "dual_slash", name: "Dual Slash", class: "Assassin",
        type: "active", mpCost: 10, unlockLevel: 1,
        description: "Hit twice rapidly.",
        baseDamage: 20, hits: 2,
        evolutions: { 3: { damage: 35 }, 7: { damage: 60 }, 10: { hits: 4 } }
    },

    // === SUMMONER SKILLS ===
    summon_elemental: {
        id: "summon_elemental", name: "Summon Elemental", class: "Summoner",
        type: "active", mpCost: 40, unlockLevel: 1,
        description: "Summon a random elemental spirit.",
        effect: "SUMMON_RANDOM",
        evolutions: { 5: { effect: "SUMMON_GREATER" }, 10: { effect: "SUMMON_LORD" } }
    },
    spirit_link: {
        id: "spirit_link", name: "Spirit Link", class: "Summoner",
        type: "passive", unlockLevel: 6,
        description: "Share damage with summon.",
        effect: "DMG_SHARE_SUMMON"
    },
    overload_summon: {
        id: "overload_summon", name: "Overload", class: "Summoner",
        type: "active", mpCost: 0, unlockLevel: 9,
        description: "Detonate summon for massive damage.",
        baseDamage: 200, effect: "KILL_SUMMON"
    },

    // === ELEMENTALIST SKILLS ===
    elemental_bolt: {
        id: "elemental_bolt", name: "Elemental Bolt", class: "Elementalist",
        type: "active", mpCost: 10, unlockLevel: 1,
        description: "Hits with random element (Fire/Ice/Light/Dark).",
        baseDamage: 30, randomElement: true,
        evolutions: { 3: { damage: 50 }, 7: { damage: 90 }, 10: { name: "Chaos Bolt", damage: 160 } }
    },
    elemental_harmony: {
        id: "elemental_harmony", name: "Elemental Harmony", class: "Elementalist",
        type: "passive", unlockLevel: 5,
        description: "Reduce MP cost of spells by 20%.",
        effect: "MP_COST_REDUCE_20"
    },
    cataclysm: {
        id: "cataclysm", name: "Cataclysm", class: "Elementalist",
        type: "active", mpCost: 60, unlockLevel: 10,
        description: "Unleash all elements at once.",
        baseDamage: 150,
        evolutions: { 10: { name: "World End", baseDamage: 300 } }
    },

    // === ALCHEMIST SKILLS ===
    transmute: {
        id: "transmute", name: "Transmute", class: "Alchemist",
        type: "active", mpCost: 50, unlockLevel: 2,
        description: "Turn enemy into gold (Instant Kill weak enemies).",
        effect: "GOLDEN_TOUCH",
        evolutions: { 7: { effect: "GOLDEN_TOUCH_BOSS_DMG" } }
    },
    acid_flask: {
        id: "acid_flask", name: "Acid Flask", class: "Alchemist",
        type: "active", mpCost: 10, unlockLevel: 1,
        description: "Reduce enemy DEF permanently.",
        baseDamage: 20, effect: "DEF_DOWN_PERM",
        evolutions: { 3: { damage: 40 }, 7: { damage: 70 }, 10: { name: "Melting Pot", damage: 120 } }
    },
    elixir_mastery: {
        id: "elixir_mastery", name: "Elixir Mastery", class: "Alchemist",
        type: "passive", unlockLevel: 5,
        description: "Potions heal 50% more.",
        effect: "POTION_BOOST_50"
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
    Berserker: ['frenzy', 'reckless_swing', 'undying_rage'],
    Monk: ['palm_strike', 'chakra_heal', 'evasion_mastery'],
    Bard: ['song_of_courage', 'lullaby', 'dissonant_chord'],
    Druid: ['vine_whip', 'bear_form', 'regrowth'],
    Knight: ['provoke', 'shield_wall', 'justice_blade'],
    Assassin: ['execute', 'smoke_bomb', 'dual_slash'],
    Summoner: ['summon_elemental', 'spirit_link', 'overload_summon'],
    Elementalist: ['elemental_bolt', 'elemental_harmony', 'cataclysm'],
    Alchemist: ['transmute', 'acid_flask', 'elixir_mastery']
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
