// Monster Database - 8 unique monsters per town forest
export const MONSTERS = {
  // === TOWN 1 FOREST (Basic Creatures) ===
  slime: {
    id: "slime", name: "Gelatinous Slime", level: 1,
    hp: 20, atk: 3, def: 1, spd: 3, exp: 10, gold: 5,
    description: "A wobbling mass of green goo. Harmless but annoying.",
    attacks: ["dissolve", "bounce"],
    loot: ["slime_gel"]
  },
  goblin: {
    id: "goblin", name: "Goblin Thief", level: 2,
    hp: 35, atk: 8, def: 3, spd: 10, exp: 15, gold: 12,
    description: "A sneaky creature with a rusty dagger. Loves shiny things.",
    attacks: ["stab", "steal"],
    loot: ["rusty_dagger", "gold_pouch"]
  },
  wolf: {
    id: "wolf", name: "Dire Wolf", level: 3,
    hp: 50, atk: 12, def: 5, spd: 15, exp: 20, gold: 8,
    description: "A wolf with glowing red eyes. Hunts in packs at night.",
    attacks: ["bite", "howl"],
    loot: ["wolf_fang", "wolf_pelt"]
  },
  bat: {
    id: "bat", name: "Vampire Bat", level: 2,
    hp: 25, atk: 7, def: 2, spd: 20, exp: 12, gold: 6,
    description: "Screeches as it dives. Drinks blood to heal.",
    attacks: ["bite", "screech"],
    loot: ["bat_wing"]
  },
  spider: {
    id: "spider", name: "Giant Spider", level: 3,
    hp: 40, atk: 10, def: 4, spd: 12, exp: 18, gold: 10,
    description: "Eight legs, eight eyes, and webs everywhere.",
    attacks: ["poison_bite", "web"],
    loot: ["spider_silk", "poison_sac"]
  },
  boar: {
    id: "boar", name: "Wild Boar", level: 4,
    hp: 60, atk: 15, def: 8, spd: 8, exp: 25, gold: 15,
    description: "Charges with tusks lowered. Smells terrible.",
    attacks: ["charge", "gore"],
    loot: ["boar_tusk", "raw_meat"]
  },
  bandit: {
    id: "bandit", name: "Forest Bandit", level: 5,
    hp: 70, atk: 18, def: 10, spd: 14, exp: 30, gold: 50,
    description: "A human outlaw demanding your coin or your life.",
    attacks: ["slash", "intimidate"],
    loot: ["iron_sword", "gold_pouch"]
  },
  skeleton: {
    id: "skeleton", name: "Skeleton Warrior", level: 5,
    hp: 65, atk: 16, def: 12, spd: 10, exp: 28, gold: 20,
    description: "Bones held together by dark magic. Rattles menacingly.",
    attacks: ["bone_strike", "rattle"],
    loot: ["bone_fragment", "rusty_armor"]
  },

  // === TOWN 2 FOREST (Intermediate) ===
  orc: {
    id: "orc", name: "Orc Warrior", level: 12,
    hp: 150, atk: 35, def: 20, spd: 12, exp: 80, gold: 60,
    description: "Green-skinned brute with a battle axe. Loves combat.",
    attacks: ["cleave", "war_cry"],
    loot: ["orc_axe", "iron_ore"]
  },
  troll: {
    id: "troll", name: "Cave Troll", level: 14,
    hp: 200, atk: 40, def: 25, spd: 8, exp: 100, gold: 70,
    description: "Massive creature with regenerating flesh. Hates fire.",
    attacks: ["smash", "regenerate"],
    loot: ["troll_blood", "stone_club"]
  },
  dark_elf: {
    id: "dark_elf", name: "Dark Elf Assassin", level: 13,
    hp: 120, atk: 42, def: 15, spd: 25, exp: 95, gold: 80,
    description: "Swift and deadly. Strikes from the shadows.",
    attacks: ["shadow_blade", "vanish"],
    loot: ["elven_dagger", "shadow_cloak"]
  },
  scorpion: {
    id: "scorpion", name: "Giant Scorpion", level: 11,
    hp: 130, atk: 30, def: 22, spd: 14, exp: 75, gold: 50,
    description: "Armored tail drips with venom. Scuttles sideways.",
    attacks: ["sting", "pincer"],
    loot: ["scorpion_tail", "chitin_shell"]
  },
  sandworm: {
    id: "sandworm", name: "Desert Sandworm", level: 15,
    hp: 250, atk: 38, def: 18, spd: 10, exp: 120, gold: 90,
    description: "Burrows underground. Swallows prey whole.",
    attacks: ["devour", "sand_spray"],
    loot: ["worm_skin", "earth_gem"]
  },
  harpy: {
    id: "harpy", name: "Harpy Screamer", level: 12,
    hp: 110, atk: 32, def: 12, spd: 28, exp: 85, gold: 65,
    description: "Half-woman, half-bird. Her song is deadly.",
    attacks: ["talon_slash", "sonic_scream"],
    loot: ["harpy_feather", "wind_gem"]
  },
  minotaur: {
    id: "minotaur", name: "Minotaur Berserker", level: 16,
    hp: 280, atk: 50, def: 28, spd: 11, exp: 140, gold: 100,
    description: "Bull-headed beast wielding a massive axe. Charges blindly.",
    attacks: ["charge", "axe_slam"],
    loot: ["minotaur_horn", "mythril"]
  },
  cursed_knight: {
    id: "cursed_knight", name: "Cursed Knight", level: 14,
    hp: 180, atk: 45, def: 35, spd: 9, exp: 110, gold: 85,
    description: "Armor animated by a vengeful spirit. Never tires.",
    attacks: ["cursed_slash", "dark_shield"],
    loot: ["cursed_blade", "dark_armor"]
  },

  // === TOWN 3 FOREST (Advanced) ===
  chimera: {
    id: "chimera", name: "Three-Headed Chimera", level: 22,
    hp: 400, atk: 65, def: 35, spd: 18, exp: 250, gold: 150,
    description: "Lion, goat, and serpent fused into one nightmare.",
    attacks: ["triple_bite", "flame_breath"],
    loot: ["chimera_hide", "fire_gem"]
  },
  basilisk: {
    id: "basilisk", name: "Basilisk", level: 24,
    hp: 350, atk: 60, def: 40, spd: 15, exp: 280, gold: 170,
    description: "Its gaze turns flesh to stone. Eyes glow with malice.",
    attacks: ["stone_gaze", "poison_bite"],
    loot: ["basilisk_eye", "petrified_scale"]
  },
  gargoyle: {
    id: "gargoyle", name: "Stone Gargoyle", level: 23,
    hp: 380, atk: 58, def: 50, spd: 12, exp: 260, gold: 140,
    description: "Living statue with claws like daggers. Perches on ruins.",
    attacks: ["dive_attack", "stone_skin"],
    loot: ["gargoyle_wing", "stone_heart"]
  },
  spectre: {
    id: "spectre", name: "Phantom Spectre", level: 21,
    hp: 300, atk: 70, def: 20, spd: 30, exp: 240, gold: 120,
    description: "Ethereal ghost that phases through armor. Chilling touch.",
    attacks: ["life_drain", "phase"],
    loot: ["ectoplasm", "soul_gem"]
  },
  elemental: {
    id: "elemental", name: "Fire Elemental", level: 25,
    hp: 420, atk: 75, def: 30, spd: 20, exp: 300, gold: 200,
    description: "Living flame with a will of its own. Burns everything.",
    attacks: ["inferno", "fire_shield"],
    loot: ["fire_core", "flame_essence"]
  },
  golem: {
    id: "golem", name: "Iron Golem", level: 26,
    hp: 500, atk: 55, def: 60, spd: 8, exp: 320, gold: 180,
    description: "Massive construct of iron. Slow but unstoppable.",
    attacks: ["iron_fist", "stomp"],
    loot: ["iron_core", "adamantite"]
  },
  manticore: {
    id: "manticore", name: "Manticore", level: 24,
    hp: 390, atk: 68, def: 38, spd: 22, exp: 290, gold: 190,
    description: "Lion body, bat wings, scorpion tail. Deadly combo.",
    attacks: ["tail_spike", "roar"],
    loot: ["manticore_tail", "wing_membrane"]
  },
  death_knight: {
    id: "death_knight", name: "Death Knight", level: 27,
    hp: 450, atk: 80, def: 55, spd: 14, exp: 350, gold: 220,
    description: "Fallen paladin corrupted by darkness. Radiates dread.",
    attacks: ["doom_slash", "death_aura"],
    loot: ["cursed_greatsword", "death_plate"]
  },

  // === TOWN 4 FOREST (Elite) ===
  lich: {
    id: "lich", name: "Ancient Lich", level: 35,
    hp: 600, atk: 100, def: 45, spd: 18, exp: 500, gold: 300,
    description: "Undead sorcerer with withered flesh. Commands death itself.",
    attacks: ["death_bolt", "summon_undead"],
    loot: ["lich_phylactery", "necro_staff"]
  },
  vampire: {
    id: "vampire", name: "Vampire Lord", level: 33,
    hp: 550, atk: 95, def: 40, spd: 28, exp: 480, gold: 280,
    description: "Immortal bloodsucker. Charming smile hides fangs.",
    attacks: ["blood_drain", "charm"],
    loot: ["vampire_fang", "blood_vial"]
  },
  werewolf: {
    id: "werewolf", name: "Alpha Werewolf", level: 34,
    hp: 580, atk: 105, def: 50, spd: 32, exp: 490, gold: 270,
    description: "Cursed human transformed into a beast. Howls at the moon.",
    attacks: ["savage_bite", "feral_rage"],
    loot: ["werewolf_claw", "moon_shard"]
  },
  demon: {
    id: "demon", name: "Lesser Demon", level: 36,
    hp: 620, atk: 110, def: 48, spd: 25, exp: 520, gold: 320,
    description: "Horned fiend from the underworld. Smells of sulfur.",
    attacks: ["hellfire", "dark_pact"],
    loot: ["demon_horn", "infernal_core"]
  },
  arcane_construct: {
    id: "arcane_construct", name: "Arcane Construct", level: 35,
    hp: 650, atk: 90, def: 65, spd: 15, exp: 510, gold: 290,
    description: "Magical automaton pulsing with energy. Casts spells.",
    attacks: ["arcane_blast", "mana_shield"],
    loot: ["mana_crystal", "construct_core"]
  },
  shadow_fiend: {
    id: "shadow_fiend", name: "Shadow Fiend", level: 37,
    hp: 590, atk: 115, def: 35, spd: 35, exp: 540, gold: 310,
    description: "Creature of pure darkness. Feeds on fear.",
    attacks: ["shadow_strike", "fear_aura"],
    loot: ["shadow_essence", "void_shard"]
  },
  void_stalker: {
    id: "void_stalker", name: "Void Stalker", level: 38,
    hp: 610, atk: 108, def: 42, spd: 30, exp: 560, gold: 330,
    description: "Hunter from the emptiness between worlds. Silent killer.",
    attacks: ["void_rend", "silence"],
    loot: ["void_crystal", "stalker_claw"]
  },
  corrupted_paladin: {
    id: "corrupted_paladin", name: "Corrupted Paladin", level: 36,
    hp: 640, atk: 100, def: 70, spd: 16, exp: 530, gold: 340,
    description: "Once a holy warrior, now twisted by evil.",
    attacks: ["corrupted_smite", "dark_heal"],
    loot: ["fallen_sword", "tainted_armor"]
  },

  // === TOWN 5 FOREST (Master-tier) ===
  ancient_treant: {
    id: "ancient_treant", name: "Ancient Treant", level: 45,
    hp: 900, atk: 130, def: 80, spd: 10, exp: 800, gold: 450,
    description: "Living tree older than kingdoms. Protects the forest.",
    attacks: ["root_bind", "nature_wrath"],
    loot: ["elder_wood", "nature_gem"]
  },
  phoenix: {
    id: "phoenix", name: "Phoenix", level: 48,
    hp: 750, atk: 150, def: 50, spd: 40, exp: 900, gold: 500,
    description: "Immortal firebird. Dies in flames, reborn from ashes.",
    attacks: ["rebirth_flame", "ash_storm"],
    loot: ["phoenix_feather", "eternal_ember"]
  },
  hydra: {
    id: "hydra", name: "Seven-Headed Hydra", level: 47,
    hp: 1000, atk: 140, def: 70, spd: 15, exp: 850, gold: 480,
    description: "Cut off one head, two more grow. Venomous breath.",
    attacks: ["multi_bite", "poison_breath"],
    loot: ["hydra_scale", "regeneration_gland"]
  },
  kraken: {
    id: "kraken", name: "Kraken", level: 46,
    hp: 950, atk: 135, def: 75, spd: 12, exp: 820, gold: 470,
    description: "Tentacled sea monster. Drags ships to the depths.",
    attacks: ["tentacle_slam", "whirlpool"],
    loot: ["kraken_tentacle", "ocean_pearl"]
  },
  storm_giant: {
    id: "storm_giant", name: "Storm Giant", level: 49,
    hp: 1100, atk: 160, def: 85, spd: 18, exp: 950, gold: 550,
    description: "Colossal being wielding lightning. Voice like thunder.",
    attacks: ["lightning_strike", "thunder_clap"],
    loot: ["giant_bone", "storm_gem"]
  },
  living_armor: {
    id: "living_armor", name: "Living Armor", level: 44,
    hp: 850, atk: 125, def: 100, spd: 11, exp: 780, gold: 440,
    description: "Suit of armor moving on its own. No flesh inside.",
    attacks: ["shield_bash", "armor_crush"],
    loot: ["enchanted_plate", "animated_core"]
  },
  elemental_lord: {
    id: "elemental_lord", name: "Elemental Lord", level: 50,
    hp: 1050, atk: 155, def: 65, spd: 25, exp: 1000, gold: 600,
    description: "Fusion of all four elements. Reality bends around it.",
    attacks: ["elemental_fury", "primal_force"],
    loot: ["primal_essence", "elemental_crown"]
  },
  archdemon: {
    id: "archdemon", name: "Archdemon", level: 48,
    hp: 980, atk: 145, def: 68, spd: 22, exp: 920, gold: 520,
    description: "Greater demon commanding legions. Eyes burn with hellfire.",
    attacks: ["infernal_wrath", "demonic_pact"],
    loot: ["archdemon_heart", "inferno_shard"]
  }
};

// Dragon variants for Town 6-7 (will be added separately)
export const DRAGONS = {
  // Town 6 Dragons (Young/Adult)
  young_fire_dragon: {
    id: "young_fire_dragon", name: "Young Fire Dragon", level: 60,
    hp: 1500, atk: 200, def: 120, spd: 25, exp: 1500, gold: 800,
    description: "Crimson scales glow like embers. Breathes superheated flames.",
    attacks: ["fire_breath", "wing_buffet", "tail_swipe"],
    loot: ["fire_dragon_scale", "dragon_claw", "fire_heart"]
  },
  young_ice_dragon: {
    id: "young_ice_dragon", name: "Young Ice Dragon", level: 60,
    hp: 1500, atk: 180, def: 140, spd: 20, exp: 1500, gold: 800,
    description: "Frost emanates from blue-white scales. Freezing breath.",
    attacks: ["ice_breath", "frost_aura", "frozen_bite"],
    loot: ["ice_dragon_scale", "frost_fang", "ice_heart"]
  },
  young_lightning_dragon: {
    id: "young_lightning_dragon", name: "Young Lightning Dragon", level: 61,
    hp: 1400, atk: 220, def: 100, spd: 35, exp: 1600, gold: 850,
    description: "Electricity arcs between golden scales. Swift as lightning.",
    attacks: ["lightning_breath", "static_field", "thunder_dive"],
    loot: ["lightning_scale", "storm_fang", "thunder_heart"]
  },
  young_earth_dragon: {
    id: "young_earth_dragon", name: "Young Earth Dragon", level: 62,
    hp: 1800, atk: 190, def: 160, spd: 15, exp: 1550, gold: 820,
    description: "Stone-like scales. Causes earthquakes with each step.",
    attacks: ["earth_breath", "quake_stomp", "boulder_throw"],
    loot: ["earth_dragon_scale", "mountain_fang", "earth_core"]
  },
  drake: {
    id: "drake", name: "Flame Drake", level: 58,
    hp: 1200, atk: 170, def: 110, spd: 28, exp: 1400, gold: 700,
    description: "Lesser dragon. Still deadly. Territorrial and aggressive.",
    attacks: ["flame_blast", "claw_rush"],
    loot: ["drake_scale", "lesser_dragon_bone"]
  },
  wyvern: {
    id: "wyvern", name: "Wyvern", level: 59,
    hp: 1300, atk: 185, def: 95, spd: 32, exp: 1450, gold: 750,
    description: "Two-legged dragon. Poisonous tail stinger.",
    attacks: ["poison_sting", "dive_bomb"],
    loot: ["wyvern_wing", "poison_barb"]
  },
  dragon_knight: {
    id: "dragon_knight", name: "Dragon Knight Rider", level: 63,
    hp: 1600, atk: 210, def: 130, spd: 22, exp: 1700, gold: 900,
    description: "Warrior bonded with a dragon mount. Fearsome duo.",
    attacks: ["lance_charge", "dragon_assist"],
    loot: ["dragonbone_lance", "rider_armor"]
  },
  elder_wyrm: {
    id: "elder_wyrm", name: "Elder Wyrm", level: 65,
    hp: 2000, atk: 230, def: 150, spd: 18, exp: 1800, gold: 1000,
    description: "Ancient serpentine dragon. Wisdom and power incarnate.",
    attacks: ["ancient_breath", "wyrm_coil", "elder_magic"],
    loot: ["wyrm_scale", "ancient_fang", "elder_gem"]
  },

  // Town 7 Dragons (Ancient/Mythic)
  ancient_fire_dragon: {
    id: "ancient_fire_dragon", name: "Ancient Fire Dragon", level: 80,
    hp: 3000, atk: 350, def: 200, spd: 30, exp: 3000, gold: 1500,
    description: "Dragon that has lived for millennia. Its roar shakes mountains.",
    attacks: ["apocalypse_flame", "inferno_dive", "dragon_fear"],
    loot: ["ancient_fire_scale", "primordial_flame", "dragon_soul"]
  },
  ancient_ice_dragon: {
    id: "ancient_ice_dragon", name: "Ancient Ice Dragon", level: 80,
    hp: 3000, atk: 320, def: 240, spd: 25, exp: 3000, gold: 1500,
    description: "Eternal winter follows wherever it flies. Breath of absolute zero.",
    attacks: ["glacial_breath", "eternal_winter", "ice_prison"],
    loot: ["ancient_ice_scale", "eternal_frost", "dragon_soul"]
  },
  ancient_lightning_dragon: {
    id: "ancient_lightning_dragon", name: "Ancient Lightning Dragon", level: 82,
    hp: 2800, atk: 400, def: 180, spd: 45, exp: 3200, gold: 1600,
    description: "Moves faster than thought. Each wingbeat creates thunderstorms.",
    attacks: ["storm_of_ages", "plasma_breath", "lightning_form"],
    loot: ["ancient_lightning_scale", "storm_core", "dragon_soul"]
  },
  ancient_earth_dragon: {
    id: "ancient_earth_dragon", name: "Ancient Earth Dragon", level: 81,
    hp: 3500, atk: 330, def: 280, spd: 20, exp: 3100, gold: 1550,
    description: "As old as the mountains themselves. Scales like granite.",
    attacks: ["continental_quake", "mountain_breath", "stone_form"],
    loot: ["ancient_earth_scale", "mountain_heart", "dragon_soul"]
  },
  ancient_void_dragon: {
    id: "ancient_void_dragon", name: "Ancient Void Dragon", level: 85,
    hp: 3200, atk: 380, def: 220, spd: 35, exp: 3500, gold: 1800,
    description: "Born in the space between realities. Breathes annihilation.",
    attacks: ["void_breath", "reality_tear", "dimensional_shift"],
    loot: ["void_dragon_scale", "void_essence", "dragon_soul"]
  },
  ancient_holy_dragon: {
    id: "ancient_holy_dragon", name: "Ancient Holy Dragon", level: 83,
    hp: 3100, atk: 360, def: 230, spd: 30, exp: 3300, gold: 1700,
    description: "Blessed guardian dragon. Radiates divine light.",
    attacks: ["holy_breath", "divine_judgment", "sacred_shield"],
    loot: ["holy_dragon_scale", "divine_essence", "dragon_soul"]
  },
  mythic_dragon_lord: {
    id: "mythic_dragon_lord", name: "Mythic Dragon Lord", level: 88,
    hp: 4000, atk: 420, def: 260, spd: 38, exp: 4000, gold: 2000,
    description: "King of all dragons. Commands respect from lesser wyrms.",
    attacks: ["royal_inferno", "dragon_dominance", "omega_breath"],
    loot: ["mythic_scale", "dragon_crown", "dragon_soul"]
  },
  dragon_god_aspect: {
    id: "dragon_god_aspect", name: "Dragon God Aspect", level: 90,
    hp: 5000, atk: 500, def: 300, spd: 40, exp: 5000, gold: 2500,
    description: "Physical manifestation of dragon divinity. Near unstoppable.",
    attacks: ["god_breath", "creation_destruction", "ancient_curse"],
    loot: ["god_scale", "divine_dragon_soul", "primordial_core"]
  }
};

// Demon Lords (7 Bosses)
export const DEMON_LORDS = {
  pride: {
    id: "pride", name: "Pride - The Arrogant Tyrant", level: 35,
    hp: 5000, atk: 200, mag: 250, def: 150, spd: 30,
    description: "Clothed in golden armor. Reflects your own power against you.",
    mechanics: "Steals buffs, reflects damage, grows stronger when attacked",
    attacks: ["mirror_strike", "superiority_aura", "ego_blast"],
    weakened_by: "Mirror of Humility",
    loot: ["pride_crown", "reflection_gem", "demon_soul_pride"],
    exp: 5000, gold: 3000
  },
  greed: {
    id: "greed", name: "Greed - The Endless Hoarder", level: 40,
    hp: 6000, atk: 220, mag: 200, def: 180, spd: 25,
    description: "Surrounded by mountains of gold. Steals everything you own.",
    mechanics: "Drains gold per turn, steals items, grows stronger with wealth",
    attacks: ["gold_drain", "item_theft", "avarice_curse"],
    weakened_by: "Seal of Charity",
    loot: ["greed_chest", "golden_coin", "demon_soul_greed"],
    exp: 6000, gold: 5000
  },
  wrath: {
    id: "wrath", name: "Wrath - The Burning Rage", level: 50,
    hp: 8000, atk: 400, mag: 150, def: 120, spd: 45,
    description: "A being of pure fury. The angrier it gets, the deadlier.",
    mechanics: "Enters berserk mode when damaged, counter attacks, rage stacks",
    attacks: ["fury_strike", "berserker_rage", "wrath_explosion"],
    weakened_by: "Calm Amulet",
    loot: ["wrath_blade", "rage_gem", "demon_soul_wrath"],
    exp: 8000, gold: 4000
  },
  envy: {
    id: "envy", name: "Envy - The Jealous Doppelganger", level: 60,
    hp: 7000, atk: 250, mag: 280, def: 160, spd: 50,
    description: "Shapeshifter that becomes what you are. Covets your strengths.",
    mechanics: "Copies player stats, steals your skills, mimics your class",
    attacks: ["copy_ability", "stat_steal", "envy_curse"],
    weakened_by: "Ring of Contentment",
    loot: ["envy_mask", "mimic_gem", "demon_soul_envy"],
    exp: 10000, gold: 6000
  },
  lust: {
    id: "lust", name: "Lust - The Enchanting Tempter", level: 70,
    hp: 6500, atk: 180, mag: 350, def: 140, spd: 55,
    description: "Beautiful and terrifying. Charms you into submission.",
    mechanics: "Charm effects, confusion, mind control, drains willpower",
    attacks: ["seductive_charm", "mind_control", "desire_drain"],
    weakened_by: "Crown of Clarity",
    loot: ["lust_charm", "temptation_gem", "demon_soul_lust"],
    exp: 12000, gold: 7000
  },
  gluttony: {
    id: "gluttony", name: "Gluttony - The Devourer", level: 80,
    hp: 15000, atk: 350, mag: 200, def: 250, spd: 20,
    description: "Massive bloated demon. Devours everything. Grows with each meal.",
    mechanics: "Absorbs HP, grows in size/power, devour mechanic, HP scaling",
    attacks: ["consume", "size_growth", "digestive_acid"],
    weakened_by: "Belt of Restraint",
    loot: ["gluttony_maw", "hunger_gem", "demon_soul_gluttony"],
    exp: 15000, gold: 8000
  },
  sloth: {
    id: "sloth", name: "Sloth - The Eternal Sleeper", level: 90,
    hp: 20000, atk: 300, mag: 400, def: 300, spd: 5,
    description: "Barely moves. Manipulates time itself. The hardest to kill.",
    mechanics: "Time manipulation, sleep effects, speed reduction, turn skipping",
    attacks: ["time_stop", "eternal_sleep", "sloth_field"],
    weakened_by: "Tome of Mastery (Town 7)",
    loot: ["sloth_hourglass", "time_gem", "demon_soul_sloth"],
    exp: 20000, gold: 10000
  }
};
