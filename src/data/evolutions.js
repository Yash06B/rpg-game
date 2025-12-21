// Complete Evolution Trees for all 15 classes
export const EVOLUTIONS = {
    // === MAGE ===
    Mage: {
        10: [
            { id: "pyromancer", label: "Pyromancer", desc: "Fire specialist. High burst damage.", color: "#ef4444" },
            { id: "cryomancer", label: "Cryomancer", desc: "Ice specialist. CC and defense.", color: "#3b82f6" },
            { id: "stormbringer", label: "Stormbringer", desc: "Lightning specialist. Speed and multi-hit.", color: "#fbbf24" }
        ]
    },
    Pyromancer: {
        40: [
            { id: "inferno_sage", label: "Inferno Sage", desc: "Master of burning hellfire." },
            { id: "spellblade", label: "Spellblade", desc: "Combines magic and melee combat." }
        ]
    },
    Cryomancer: {
        40: [
            { id: "frost_archon", label: "Frost Archon", desc: "Ruler of eternal winter." },
            { id: "spellblade", label: "Spellblade", desc: "Combines magic and melee combat." }
        ]
    },
    Stormbringer: {
        40: [
            { id: "thunder_god", label: "Thunder God", desc: "Avatar of storms." },
            { id: "spellblade", label: "Spellblade", desc: "Combines magic and melee combat." }
        ]
    },
    "Inferno Sage": {
        70: [
            { id: "elemental_overlord", label: "Elemental Overlord", desc: "Commands all elements." },
            { id: "chronomancer", label: "Chronomancer", desc: "Manipulates time itself." }
        ]
    },
    "Frost Archon": {
        70: [
            { id: "elemental_overlord", label: "Elemental Overlord", desc: "Commands all elements." },
            { id: "reality_weaver", label: "Reality Weaver", desc: "Bends reality to your will." }
        ]
    },
    "Thunder God": {
        70: [
            { id: "elemental_overlord", label: "Elemental Overlord", desc: "Commands all elements." },
            { id: "chronomancer", label: "Chronomancer", desc: "Manipulates time itself." }
        ]
    },
    "Elemental Overlord": {
        90: [
            { id: "god_of_magic", label: "God of Magic", desc: "Omnipotent arcane master." },
            { id: "omnimancer", label: "Omnimancer", desc: "Master of ALL schools of magic." }
        ]
    },
    Chronomancer: {
        90: [
            { id: "time_sovereign", label: "Time Sovereign", desc: "Controls the flow of time." }
        ]
    },

    // === WARRIOR ===
    Warrior: {
        10: [
            { id: "swordmaster", label: "Swordmaster", desc: "Fast attacks with blades." },
            { id: "axe_berserker", label: "Axe Berserker", desc: "Heavy crushing blows." },
            { id: "spear_lancer", label: "Spear Lancer", desc: "Mid-range piercing." }
        ]
    },
    Swordmaster: {
        40: [
            { id: "blade_saint", label: "Blade Saint", desc: "Legendary swordsman." },
            { id: "dragon_knight", label: "Dragon Knight", desc: "Warrior bonded with dragons." }
        ]
    },
    "Axe Berserker": {
        40: [
            { id: "titan_warrior", label: "Titan Warrior", desc: "Unstoppable force." }
        ]
    },
    "Spear Lancer": {
        40: [
            { id: "dragon_knight", label: "Dragon Knight", desc: "Warrior bonded with dragons." }
        ]
    },
    "Blade Saint": {
        70: [
            { id: "war_deity", label: "War Deity", desc: "Avatar of battle." },
            { id: "immortal_champion", label: "Immortal Champion", desc: "Cannot be defeated." }
        ]
    },
    "Dragon Knight": {
        70: [
            { id: "war_deity", label: "War Deity", desc: "Avatar of battle." },
            { id: "conquest_lord", label: "Conquest Lord", desc: "Conqueror of nations." }
        ]
    },
    "War Deity": {
        90: [
            { id: "god_of_war", label: "God of War", desc: "Immortal warrior god." },
            { id: "eternal_conqueror", label: "Eternal Conqueror", desc: "Never loses." }
        ]
    },
    "Immortal Champion": {
        90: [
            { id: "ragnarok_incarnate", label: "Ragnarok Incarnate", desc: "Brings the end of worlds." }
        ]
    },

    // === ROGUE ===
    Rogue: {
        10: [
            { id: "assassin_evo", label: "Assassin", desc: "Killing blows from shadows." },
            { id: "shadow_dancer", label: "Shadow Dancer", desc: "Evasion tank." },
            { id: "trickster", label: "Trickster", desc: "Debuffs and confusion." }
        ]
    },
    Assassin: {
        40: [
            { id: "phantom_blade", label: "Phantom Blade", desc: "Untraceable killer." },
            { id: "night_terror", label: "Night Terror", desc: "Fear incarnate." }
        ]
    },
    "Shadow Dancer": {
        40: [
            { id: "illusionist_master", label: "Illusionist Master", desc: "Master of deception." }
        ]
    },
    "Phantom Blade": {
        70: [
            { id: "shadow_sovereign", label: "Shadow Sovereign", desc: "Rules the darkness." },
            { id: "deaths_hand", label: "Death's Hand", desc: "Reaper's chosen." }
        ]
    },
    "Shadow Sovereign": {
        90: [
            { id: "god_of_shadows", label: "God of Shadows", desc: "Darkness personified." },
            { id: "void_assassin", label: "Void Assassin", desc: "Erases existence." }
        ]
    },

    // === CLERIC ===
    Cleric: {
        10: [
            { id: "priest", label: "Priest", desc: "Master healer." },
            { id: "templar", label: "Templar", desc: "Holy warrior." },
            { id: "oracle", label: "Oracle", desc: "Seer of fates." }
        ]
    },
    Priest: {
        40: [
            { id: "high_priest", label: "High Priest", desc: "Divine healer." }
        ]
    },
    Templar: {
        40: [
            { id: "holy_knight", label: "Holy Knight", desc: "Blessed crusader." }
        ]
    },
    Oracle: {
        40: [
            { id: "prophet", label: "Prophet", desc: "Voice of the gods." }
        ]
    },
    "High Priest": {
        70: [
            { id: "divine_herald", label: "Divine Herald", desc: "God's messenger." }
        ]
    },
    "Holy Knight": {
        70: [
            { id: "sacred_crusader", label: "Sacred Crusader", desc: "Holy warrior." }
        ]
    },
    "Divine Herald": {
        90: [
            { id: "god_of_light", label: "God of Light", desc: "Radiant divinity." },
            { id: "heavens_judge", label: "Heaven's Judge", desc: "Divine judgment." }
        ]
    },

    // === ARCHER ===
    Archer: {
        10: [
            { id: "sniper", label: "Sniper", desc: "Perfect accuracy." },
            { id: "ranger", label: "Ranger", desc: "Forest guardian." },
            { id: "crossbow_expert", label: "Crossbow Expert", desc: "Heavy piercing." }
        ]
    },
    Sniper: {
        40: [
            { id: "deadeye_master", label: "Deadeye Master", desc: "Never misses." }
        ]
    },
    Ranger: {
        40: [
            { id: "beast_hunter", label: "Beast Hunter", desc: "Slayer of monsters." }
        ]
    },
    "Deadeye Master": {
        70: [
            { id: "arrow_saint", label: "Arrow Saint", desc: "Legendary marksman." }
        ]
    },
    "Arrow Saint": {
        90: [
            { id: "god_of_precision", label: "God of Precision", desc: "Perfect accuracy personified." }
        ]
    },

    // === BERSERKER ===
    Berserker: {
        10: [
            { id: "blood_warrior", label: "Blood Warrior", desc: "Sacrifices HP for power." },
            { id: "rage_fighter", label: "Rage Fighter", desc: "Anger fuels strength." },
            { id: "chaos_blade", label: "Chaos Blade", desc: "Unpredictable destroyer." }
        ]
    },
    "Blood Warrior": {
        40: [
            { id: "crimson_reaper", label: "Crimson Reaper", desc: "Harvests souls." }
        ]
    },
    "Rage Fighter": {
        40: [
            { id: "wrath_incarnate", label: "Wrath Incarnate", desc: "Living fury." }
        ]
    },
    "Crimson Reaper": {
        70: [
            { id: "blood_god_vessel", label: "Blood God Vessel", desc: "Hosts dark deity." }
        ]
    },
    "Blood God Vessel": {
        90: [
            { id: "god_of_carnage", label: "God of Carnage", desc: "Bloodlust incarnate." }
        ]
    },

    // === MONK ===
    Monk: {
        10: [
            { id: "ki_master", label: "Ki Master", desc: "Inner energy control." },
            { id: "iron_fist", label: "Iron Fist", desc: "Unbreakable strikes." },
            { id: "zen_warrior", label: "Zen Warrior", desc: "Perfect balance." }
        ]
    },
    "Ki Master": {
        40: [
            { id: "transcendent_monk", label: "Transcendent Monk", desc: "Beyond mortal limits." }
        ]
    },
    "Transcendent Monk": {
        70: [
            { id: "celestial_martial_artist", label: "Celestial Martial Artist", desc: "Heavenly combat." }
        ]
    },
    "Celestial Martial Artist": {
        90: [
            { id: "god_of_martial_arts", label: "God of Martial Arts", desc: "Perfect form." }
        ]
    },

    // === NECROMANCER ===
    Necromancer: {
        10: [
            { id: "bone_mage", label: "Bone Mage", desc: "Skeleton master." },
            { id: "soul_reaper", label: "Soul Reaper", desc: "Harvests souls." },
            { id: "death_knight_evo", label: "Death Knight", desc: "Undead warrior." }
        ]
    },
    "Bone Mage": {
        40: [
            { id: "lich_lord", label: "Lich Lord", desc: "Immortal undead." }
        ]
    },
    "Soul Reaper": {
        40: [
            { id: "soul_tyrant", label: "Soul Tyrant", desc: "Commands souls." }
        ]
    },
    "Lich Lord": {
        70: [
            { id: "undeath_sovereign", label: "Undeath Sovereign", desc: "King of undead." }
        ]
    },
    "Undeath Sovereign": {
        90: [
            { id: "god_of_death", label: "God of Death", desc: "Death itself." }
        ]
    },

    // === BARD ===
    Bard: {
        10: [
            { id: "minstrel", label: "Minstrel", desc: "Master performer." },
            { id: "war_chanter", label: "War Chanter", desc: "Battle songs." },
            { id: "enchanter", label: "Enchanter", desc: "Magical melodies." }
        ]
    },
    Minstrel: {
        40: [
            { id: "virtuoso", label: "Virtuoso", desc: "Perfect musician." }
        ]
    },
    Virtuoso: {
        70: [
            { id: "harmony_lord", label: "Harmony Lord", desc: "Musical perfection." }
        ]
    },
    "Harmony Lord": {
        90: [
            { id: "god_of_music", label: "God of Music", desc: "Divine symphony." }
        ]
    },

    // === DRUID ===
    Druid: {
        10: [
            { id: "shapeshifter", label: "Shapeshifter", desc: "Animal forms." },
            { id: "green_mage", label: "Green Mage", desc: "Nature magic." },
            { id: "beast_caller", label: "Beast Caller", desc: "Animal companion." }
        ]
    },
    Shapeshifter: {
        40: [
            { id: "primal_avatar", label: "Primal Avatar", desc: "Primal beast." }
        ]
    },
    "Primal Avatar": {
        70: [
            { id: "natures_wrath", label: "Nature's Wrath", desc: "Nature's fury." }
        ]
    },
    "Nature's Wrath": {
        90: [
            { id: "god_of_nature", label: "God of Nature", desc: "Living earth." }
        ]
    },

    // === KNIGHT ===
    Knight: {
        10: [
            { id: "royal_guard", label: "Royal Guard", desc: "Protects royalty." },
            { id: "crusader", label: "Crusader", desc: "Holy warrior." },
            { id: "dragon_rider", label: "Dragon Rider", desc: "Dragon bonded." }
        ]
    },
    "Royal Guard": {
        40: [
            { id: "imperial_protector", label: "Imperial Protector", desc: "Empire's shield." }
        ]
    },
    "Imperial Protector": {
        70: [
            { id: "kingdoms_shield", label: "Kingdom's Shield", desc: "Unbreakable defense." }
        ]
    },
    "Kingdom's Shield": {
        90: [
            { id: "god_of_honor", label: "God of Honor", desc: "Honorbound deity." }
        ]
    },

    // === ASSASSIN (Starting Class) ===
    "Assassin": {
        10: [
            { id: "silent_killer", label: "Silent Killer", desc: "Unheard death." },
            { id: "poison_master", label: "Poison Master", desc: "Toxin expert." },
            { id: "dual_blade", label: "Dual Blade", desc: "Twin weapons." }
        ]
    },
    "Silent Killer": {
        40: [
            { id: "death_whisper", label: "Death Whisper", desc: "Silent doom." }
        ]
    },
    "Death Whisper": {
        70: [
            { id: "execution_saint", label: "Execution Saint", desc: "Perfect kills." }
        ]
    },
    "Execution Saint": {
        90: [
            { id: "god_of_murder", label: "God of Murder", desc: "Death incarnate." }
        ]
    },

    // === SUMMONER ===
    Summoner: {
        10: [
            { id: "beast_tamer", label: "Beast Tamer", desc: "Animal control." },
            { id: "spirit_caller", label: "Spirit Caller", desc: "Ghost summoner." },
            { id: "demon_contractor", label: "Demon Contractor", desc: "Demon pacts." }
        ]
    },
    "Beast Tamer": {
        40: [
            { id: "monster_king", label: "Monster King", desc: "Beast lord." }
        ]
    },
    "Monster King": {
        70: [
            { id: "creature_sovereign", label: "Creature Sovereign", desc: "All beasts obey." }
        ]
    },
    "Creature Sovereign": {
        90: [
            { id: "god_of_summons", label: "God of Summons", desc: "Summons anything." }
        ]
    },

    // === ELEMENTALIST ===
    Elementalist: {
        10: [
            { id: "fire_adept", label: "Fire Adept", desc: "Flame wielder." },
            { id: "water_sage", label: "Water Sage", desc: "Water master." },
            { id: "earth_shaman", label: "Earth Shaman", desc: "Stone caller." },
            { id: "wind_dancer", label: "Wind Dancer", desc: "Air controller." }
        ]
    },
    "Fire Adept": {
        40: [
            { id: "infernal_master", label: "Infernal Master", desc: "Hellfire user." }
        ]
    },
    "Infernal Master": {
        70: [
            { id: "elemental_fusion", label: "Elemental Fusion", desc: "Combines elements." }
        ]
    },
    "Elemental Fusion": {
        90: [
            { id: "god_of_elements", label: "God of Elements", desc: "All elements mastered." }
        ]
    },

    // === ALCHEMIST ===
    Alchemist: {
        10: [
            { id: "potion_master", label: "Potion Master", desc: "Potion expert." },
            { id: "transmuter", label: "Transmuter", desc: "Changes matter." },
            { id: "bomb_specialist", label: "Bomb Specialist", desc: "Explosive expert." }
        ]
    },
    "Potion Master": {
        40: [
            { id: "grand_alchemist", label: "Grand Alchemist", desc: "Master transmuter." }
        ]
    },
    "Grand Alchemist": {
        70: [
            { id: "philosophers_heir", label: "Philosopher's Heir", desc: "Ultimate alchemist." }
        ]
    },
    "Philosopher's Heir": {
        90: [
            { id: "god_of_alchemy", label: "God of Alchemy", desc: "Creates anything." }
        ]
    }
};

// Growth Mods per Tier
export const TIER_MODS = {
    0: 1.0,
    1: 1.5,
    2: 2.0,
    3: 3.0,
    4: 5.0
};
