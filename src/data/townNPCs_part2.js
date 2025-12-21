// Town NPCs - 15-20 NPCs per town with quests (Part 2: Towns 4-7)
// This file continues the NPC system from townNPCs.js

export const TOWN_NPCS_PART2 = {
    // ===== TOWN 4 - SHADOWFEN CITADEL (Gothic/Dark Town) =====
    town_4: [
        {
            id: "vampire_hunter", name: "Hunter Van Helsing", sprite: "🗡️",
            personality: "grim",
            dialogue: ["Vampires walk among us.", "Trust no one after dark.", "I've killed 47 of them."],
            quest: { id: "vampire_nest", name: "Nest Extermination", type: "hunt", objective: "Clear vampire lair", reward: { exp: 250, gold: 500 } }
        },
        {
            id: "necromancer_reformed", name: "Ex-Necromancer Mortis", sprite: "💀",
            personality: "regretful",
            dialogue: ["I've raised the dead...", "But no more. Never again.", "Death should stay dead."],
            quest: { id: "undo_ritual", name: "Breaking the Curse", type: "special", objective: "Reverse necromancy spell", reward: { exp: 280, gold: 560 } }
        },
        {
            id: "plague_doctor", name: "Dr. Corvus", sprite: "🎭",
            personality: "clinical",
            dialogue: ["The plague spreads...", "I need samples for a cure.", "Science will save us."],
            quest: { id: "plague_research", name: "Cure Research", type: "gather", objective: "Collect 10 Infected Blood samples", reward: { exp: 230, gold: 460 } }
        },
        {
            id: "ghost_medium", name: "Medium Raven", sprite: "👻",
            personality: "haunted",
            dialogue: ["I speak with the dead.", "They have messages...", "So many lost souls..."],
            quest: { id: "spirit_messages", name: "Unfinished Business", type: "talk", objective: "Deliver 5 ghost messages", reward: { exp: 210, gold: 420 } }
        },
        {
            id: "gargoyle_keeper", name: "Keeper Stone", sprite: "🗿",
            personality: "ancient",
            dialogue: ["Gargoyles protect this citadel.", "They come alive at night.", "I carved each one myself."],
            quest: { id: "gargoyle_repair", name: "Stone Guardians", type: "fetch", objective: "Repair 3 broken gargoyles", reward: { exp: 240, gold: 480 } }
        },
        {
            id: "blood_merchant", name: "Merchant Crimson", sprite: "🩸",
            personality: "shady",
            dialogue: ["Blood for sale.", "Don't ask where it's from.", "Vampires pay well."],
            quest: { id: "blood_collection", name: "Rare Blood Types", type: "gather", objective: "Collect 5 special blood vials", reward: { exp: 220, gold: 440 } }
        },
        {
            id: "witch_hunter", name: "Inquisitor Graves", sprite: "⚖️",
            personality: "zealous",
            dialogue: ["Witches must burn!", "I root out evil!", "Confess your sins!"],
            quest: { id: "witch_trial", name: "The Accused", type: "investigation", objective: "Find evidence (save or condemn)", reward: { exp: 260, gold: 520 } }
        },
        {
            id: "cursed_noble", name: "Lord Blackwood", sprite: "🎩",
            personality: "aristocratic",
            dialogue: ["My family is cursed...", "For 200 years we've suffered.", "Please, break this hex."],
            quest: { id: "family_curse", name: "Ancestral Sin", type: "special", objective: "Lift the Blackwood curse", reward: { exp: 300, gold: 600, item: "cursed_amulet" } }
        },
        {
            id: "crypt_keeper", name: "Keeper Mortimer", sprite: "⚰️",
            personality: "somber",
            dialogue: ["The dead deserve respect.", "These tombs are sacred.", "Something's disturbing them..."],
            quest: { id: "grave_robbers", name: "Tomb Raiders", type: "hunt", objective: "Stop grave robbers", reward: { exp: 240, gold: 480 } }
        },
        {
            id: "shadow_assassin", name: "Assassin Shade", sprite: "🗡️",
            personality: "emotionless",
            dialogue: ["I kill for coin.", "No questions asked.", "You look like you need someone dead."],
            quest: { id: "assassination_contract", name: "Dark Contract", type: "hunt", objective: "Eliminate target (moral choice)", reward: { exp: 270, gold: 540 } }
        },
        {
            id: "mad_alchemist", name: "Alchemist Faustus", sprite: "⚗️",
            personality: "insane",
            dialogue: ["*cackling* The formula works!", "Immortality is within reach!", "Just need more subjects..."],
            quest: { id: "alchemy_experiment", name: "Mad Science", type: "gather", objective: "Collect rare reagents", reward: { exp: 250, gold: 500 } }
        },
        {
            id: "werewolf_tamed", name: "Werewolf Marcus", sprite: "🐺",
            personality: "tortured",
            dialogue: ["The beast inside me...", "I fight it every full moon.", "Silver keeps me human."],
            quest: { id: "silver_chains", name: "Moon Curse", type: "fetch", objective: "Forge silver restraints", reward: { exp: 260, gold: 520 } }
        },
        {
            id: "raven_keeper", name: "Raven Master Edgar", sprite: "🦅",
            personality: "eccentric",
            dialogue: ["Ravens see all.", "They bring me secrets.", "Want to know what they saw?"],
            quest: { id: "raven_intel", name: "Eyes in the Sky", type: "exploration", objective: "Follow ravens to secrets", reward: { exp: 230, gold: 460, item: "secret_map" } }
        },
        {
            id: "bell_ringer", name: "Bell Ringer Quasimodo", sprite: "🔔",
            personality: "lonely",
            dialogue: ["*rings bell\* The hour strikes...", "I live in the tower.", "No one visits me..."],
            quest: { id: "bell_tower", name: "Tower Watch", type: "defense", objective: "Defend tower from demons", reward: { exp: 280, gold: 560 } }
        },
        {
            id: "dark_priest", name: "Priest Malachi", sprite: "⛪",
            personality: "corrupted",
            dialogue: ["The old gods whisper to me...", "Light has failed us.", "Darkness embraces all."],
            quest: { id: "forbidden_ritual", name: "Dark Ceremony", type: "special", objective: "Stop or join ritual (choice)", reward: { exp: 290, gold: 580 } }
        },
        {
            id: "widow_black", name: "Black Widow Isabella", sprite: "🕷️",
            personality: "seductive",
            dialogue: ["All my husbands died... mysteriously.", "I'm so lonely now.", "Would you like some tea?"],
            quest: { id: "investigate_widow", name: "Serial Deaths", type: "investigation", objective: "Uncover the truth", reward: { exp: 270, gold: 540 } }
        },
        {
            id: "torture_master", name: "Dungeon Master Vlad", sprite: "⛓️",
            personality: "sadistic",
            dialogue: ["Pain reveals truth.", "Everyone talks eventually.", "Want to see my collection?"],
            quest: { id: "dungeon_escape", name: "Prisoner Rescue", type: "rescue", objective: "Free innocent prisoners", reward: { exp: 260, gold: 520 } }
        },
        {
            id: "banshee_listener", name: "Listener Moira", sprite: "👂",
            personality: "fearful",
            dialogue: ["I hear the banshee's wail...", "Someone will die tonight.", "The screams never stop..."],
            quest: { id: "banshee_hunt", name: "Silencing the Scream", type: "hunt", objective: "Defeat the Banshee", reward: { exp: 300, gold: 600 } }
        },
        {
            id: "iron_maiden_smith", name: "Torturer's Smith", sprite: "🔨",
            personality: "dark",
            dialogue: ["I forge instruments of pain.", "Each one a masterpiece.", "For punishment or protection?"],
            quest: { id: "torture_tools", name: "Dark Forge", type: "craft", objective: "Create execution device", reward: { exp: 220, gold: 440 } }
        },
        {
            id: "haunted_painter", name: "Painter Dorian", sprite: "🖼️",
            personality: "cursed",
            dialogue: ["My paintings steal souls...", "I can't stop creating.", "The portraits watch me..."],
            quest: { id: "cursed_portraits", name: "Living Canvas", type: "special", objective: "Destroy or preserve paintings", reward: { exp: 280, gold: 560, item: "soul_painting" } }
        }
    ],

    // ===== TOWN 5 - ELDERGROVE SANCTUARY (Nature/Ancient Town) =====
    town_5: [
        {
            id: "druid_elder", name: "Arch-Druid Oakenshield", sprite: "🌳",
            personality: "wise_ancient",
            dialogue: ["The forest remembers all.", "Trees speak to those who listen.", "Balance must be maintained."],
            quest: { id: "forest_corruption", name: "Purge the Blight", type: "special", objective: "Cleanse corrupted grove", reward: { exp: 350, gold: 700 } }
        },
        {
            id: "nature_spirit", name: "Spirit of the Glade", sprite: "✨",
            personality: "ethereal",
            dialogue: ["I am the forest...", "Protect my children...", "Harmony is life..."],
            quest: { id: "sacred_seeds", name: "Planting Hope", type: "gather", objective: "Plant 10 sacred saplings", reward: { exp: 320, gold: 640 } }
        },
        {
            id: "feral_child", name: "Mowgli the Wild", sprite: "👦",
            personality: "wild",
            dialogue: ["*growls* Wolves raised me.", "I don't speak much human.", "Forest is home."],
            quest: { id: "wolf_pack_help", name: "Pack Protection", type: "hunt", objective: "Save wolf pack from hunters", reward: { exp: 310, gold: 620 } }
        },
        {
            id: "ancient_treant", name: "Elder Treant Barkbeard", sprite: "🌲",
            personality: "slow_wise",
            dialogue: ["I... have... stood... for... 1000... years...", "Patience... young... one...", "Time... means... nothing..."],
            quest: { id: "treant_healing", name: "Ancient Wounds", type: "gather", objective: "Collect healing sap", reward: { exp: 340, gold: 680 } }
        },
        {
            id: "fairy_queen", name: "Queen Titania", sprite: "🧚",
            personality: "mischievous",
            dialogue: ["You amuse me, mortal.", "Fairies see all secrets.", "Care for a bargain?"],
            quest: { id: "fairy_bargain", name: "Fey Contract", type: "special", objective: "Complete 3 fairy tasks", reward: { exp: 360, gold: 720, item: "fairy_dust" } }
        },
        {
            id: "mushroom_collector", name: "Mycologist Spore", sprite: "🍄",
            personality: "obsessed",
            dialogue: ["Fungi are fascinating!", "This one glows in the dark!", "Never eat the red ones."],
            quest: { id: "rare_mushrooms", name: "Fungal Expedition", type: "gather", objective: "Collect 15 rare mushrooms", reward: { exp: 300, gold: 600 } }
        },
        {
            id: "beast_tamer", name: "Tamer Wildheart", sprite: "🦁",
            personality: "fierce",
            dialogue: ["Animals respect strength.", "I've tamed every beast here.", "Dragons are next."],
            quest: { id: "tame_hydra", name: "Hydra Taming", type: "challenge", objective: "Tame the forest hydra", reward: { exp: 400, gold: 800 } }
        },
        {
            id: "vine_mage", name: "Green Mage Ivy", sprite: "🌿",
            personality: "nurturing",
            dialogue: ["Plants grow at my command.", "Life magic flows through me.", "Death feeds rebirth."],
            quest: { id: "overgrowth", name: "Wild Growth", type: "special", objective: "Control rampant vegetation", reward: { exp: 330, gold: 660 } }
        },
        {
            id: "honey_harvester", name: "Beekeeper Buzzworth", sprite: "🐝",
            personality: "gentle",
            dialogue: ["Bees are misunderstood.", "They give us sweet gold.", "Never anger the hive!"],
            quest: { id: "giant_hive", name: "Royal Jelly", type: "gather", objective: "Harvest from giant bee hive", reward: { exp: 310, gold: 620, item: "royal_jelly" } }
        },
        {
            id: "elder_shaman", name: "Shaman Spirit-Walker", sprite: "🔮",
            personality: "mystical",
            dialogue: ["The spirits guide me.", "Past and future blur.", "I walk between worlds."],
            quest: { id: "spirit_journey", name: "Vision Quest", type: "special", objective: "Complete ritual journey", reward: { exp: 370, gold: 740 } }
        },
        {
            id: "phoenix_keeper", name: "Keeper Ashenwing", sprite: "🔥",
            personality: "reborn",
            dialogue: ["I've died 7 times.", "Each rebirth brings wisdom.", "The phoenix teaches immortality."],
            quest: { id: "phoenix_feather", name: "Eternal Flame", type: "fetch", objective: "Obtain phoenix feather", reward: { exp: 380, gold: 760, item: "phoenix_feather" } }
        },
        {
            id: "centaur_chief", name: "Chief Thunderhoof", sprite: "🐴",
            personality: "proud_warrior",
            dialogue: ["Centaurs bow to no one!", "Our tribe is strong.", "You fight well, for a human."],
            quest: { id: "tribal_alliance", name: "Proving Ground", type: "challenge", objective: "Win centaur honor duel", reward: { exp: 350, gold: 700 } }
        },
        {
            id: "fruit_cultivator", name: "Grower Eden", sprite: "🍎",
            personality: "peaceful",
            dialogue: ["These fruits grant power.", "Each blessed by nature.", "Taste perfection."],
            quest: { id: "magic_orchard", name: "Enchanted Harvest", type: "gather", objective: "Collect 8 magic fruits", reward: { exp: 300, gold: 600 } }
        },
        {
            id: "satyr_bard", name: "Satyr Pan", sprite: "🎵",
            personality: "playful",
            dialogue: ["*plays pipes* Dance with me!", "Life is music!", "The forest sings!"],
            quest: { id: "enchanted_melody", name: "Song of the Wild", type: "special", objective: "Learn ancient melody", reward: { exp: 320, gold: 640, item: "pans_flute" } }
        },
        {
            id: "ancient_guardian", name: "Stone Guardian Gaia", sprite: "🗿",
            personality: "protector",
            dialogue: ["I guard the sacred grove.", "None shall pass who mean harm.", "Prove your worth."],
            quest: { id: "guardian_test", name: "Trial of Earth", type: "challenge", objective: "Defeat stone guardian", reward: { exp: 360, gold: 720 } }
        },
        {
            id: "herbalist_sage", name: "Sage Willowmoon", sprite: "🌸",
            personality: "healer",
            dialogue: ["Every plant heals something.", "Nature provides cures.", "Even dragon poison."],
            quest: { id: "antidote_rare", name: "Ultimate Remedy", type: "craft", objective: "Create panacea potion", reward: { exp: 340, gold: 680, item: "panacea" } }
        },
        {
            id: "owl_keeper", name: "Owl Master Hoot", sprite: "🦉",
            personality: "nocturnal",
            dialogue: ["Owls see in darkness.", "Wisdom comes at night.", "I never sleep."],
            quest: { id: "night_patrol", name: "Nocturnal Watch", type: "exploration", objective: "Scout at night", reward: { exp: 310, gold: 620 } }
        },
        {
            id: "ancient_turtle", name: "Elder Turtle Shelldon", sprite: "🐢",
            personality: "ancient_slow",
            dialogue: ["I've seen empires rise and fall...", "Slow and steady wins...", "What's your hurry?"],
            quest: { id: "turtle_wisdom", name: "Lessons of Time", type: "talk", objective: "Learn patience", reward: { exp: 300, gold: 600, item: "wisdom_shell" } }
        },
        {
            id: "poison_ivy_witch", name: "Witch Nightshade", sprite: "🌿",
            personality: "dangerous",
            dialogue: ["Beautiful things are deadly.", "My garden kills.", "One touch... game over."],
            quest: { id: "poison_garden", name: "Toxic Beauty", type: "gather", objective: "Collect deadly plants", reward: { exp: 330, gold: 660 } }
        },
        {
            id: "rainbow_rider", name: "Unicorn Rider Luna", sprite: "🦄",
            personality: "pure",
            dialogue: ["Only the pure can ride unicorns.", "I protect the innocent.", "Evil cannot touch me."],
            quest: { id: "unicorn_rescue", name: "Stolen Horn", type: "rescue", objective: "Save captured unicorn", reward: { exp: 370, gold: 740, item: "unicorn_horn" } }
        }
    ]
};

// Merge function to combine with main file
export function mergeNPCs(mainNPCs) {
    return {
        ...mainNPCs,
        town_4: TOWN_NPCS_PART2.town_4,
        town_5: TOWN_NPCS_PART2.town_5
    };
}
