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
            id: "vampire_lord_reformed", name: "Lord Alucard", sprite: "🍷",
            personality: "aristocratic",
            dialogue: ["To drink blood is to know life.", "Immortality has a price.", "Will you pay it?"],
            quest: {
                id: "race_vampire", name: "The Embrace", type: "special",
                objective: "Survive the night in the crypt",
                reward: { exp: 600, gold: 600, race: "Vampire" }
            }
        },
        {
            id: "blood_merchant", name: "Merchant Crimson", sprite: "🩸",
            personality: "shady",
            dialogue: ["Blood for sale.", "Don't ask where it's from.", "Vampires pay well."],
            quest: { id: "blood_collection", name: "Rare Blood Types", type: "gather", objective: "Collect 5 special blood vials", reward: { exp: 220, gold: 440 } }
        },
        // ... (existing code)
    ],
    // Town 5
    town_5: [
        {
            id: "druid_elder", name: "Arch-Druid Oakenshield", sprite: "🌳",
            personality: "wise_ancient",
            dialogue: ["The forest remembers all.", "Trees speak to those who listen.", "Balance must be maintained."],
            quest: { id: "forest_corruption", name: "Purge the Blight", type: "special", objective: "Cleanse corrupted grove", reward: { exp: 350, gold: 700 } }
        },
        {
            id: "high_elf_ranger", name: "Ranger Legolas", sprite: "🏹",
            personality: "elegant",
            dialogue: ["Our eyes see further.", "Magic runs in our veins.", "The forest is our kin."],
            quest: {
                id: "race_elf", name: "Sylvan Trial", type: "hunt",
                objective: "Hunt the White Stag",
                reward: { exp: 550, gold: 550, race: "Elf" }
            }
        },
        {
            id: "lich_king_remnant", name: "The Forgotten King", sprite: "💀",
            personality: "hollow",
            dialogue: ["Life is... fleeting.", "Death is... eternal.", "Serve me..."],
            quest: {
                id: "race_undead", name: "Eternal Servitude", type: "special",
                objective: "Bind your soul to the phylactery",
                reward: { exp: 666, gold: 666, race: "Undead" }
            }
        },
        // ...
    ],
    // Town 6
    town_6: [
        {
            id: "infernal_duke", name: "Duke Balrog", sprite: "👿",
            personality: "destructive",
            dialogue: ["Fire purges all!", "Let chaos reign!", "Burn with me!"],
            quest: {
                id: "race_demon", name: "Infernal Pact", type: "special",
                objective: "Bathe in the lava pool",
                reward: { exp: 800, gold: 800, race: "Demon" }
            }
        },
        // ...
    ],
    town_7: [
        {
            id: "archangel_tyrael", name: "Angel Tyrael", sprite: "👼",
            personality: "divine",
            dialogue: ["Greetings, mortal.", "The heavens watch you.", "Prepare for the final battle."],
            quest: { id: "divine_trial", name: "Trial of Valor", type: "challenge", objective: "Defeat the shadow echo", reward: { exp: 1000, gold: 2000, item: "angel_feather" } }
        },
        {
            id: "seraph_guardian", name: "Guardian Michael", sprite: "🌟",
            personality: "holy",
            dialogue: ["Ascend, mortal.", "Shed your earthly form.", "Become light."],
            quest: {
                id: "race_angel", name: "Ascension", type: "special",
                objective: "Touch the divine light",
                reward: { exp: 1200, gold: 1200, race: "Angel" }
            }
        },
        // ...
    ]
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
],
// ===== TOWN 6 - DRAGON'S PEAK (Volcanic/Mountain) =====
town_6: [
    {
        id: "dragon_priest", name: "High Priest Ignis", sprite: "🔥",
        personality: "fanatic",
        dialogue: ["The great dragons demand tribute!", "Fire cleanses the weak.", "Do not look them in the eye."],
        quest: { id: "dragon_offering", name: "Fiery Tribute", type: "gather", objective: "Collect 5 Dragon Scales", reward: { exp: 400, gold: 1000 } }
    },
    {
        id: "wyvern_rider", name: "Rider Stormborn", sprite: "🐲",
        personality: "reckless",
        dialogue: ["My wyvern is faster than any dragon.", "We race the lightning.", "Sky battles are the only true thrill."],
        quest: { id: "sky_race", name: "Aerial Ace", type: "challenge", objective: "Win the sky race", reward: { exp: 450, gold: 900, item: "wind_boots" } }
    },
    {
        id: "obsidian_smith", name: "Smith Blackrock", sprite: "⚒️",
        personality: "intense",
        dialogue: ["Ordinary fire isn't hot enough.", "I forge in the volcano's mouth.", "Obsidian blades never dull."],
        quest: { id: "volcanic_hammer", name: "Magma Forge", type: "fetch", objective: "Retrieve hammer from lava pool", reward: { exp: 420, gold: 840 } }
    },
    {
        id: "dragon_slayer_ret", name: "Old Slayer Siegfried", sprite: "⚔️",
        personality: "grumpy_veteran",
        dialogue: ["I killed a dragon once...", "Cost me my leg.", "Don't be a hero, kid."],
        quest: { id: "slayer_legacy", name: "Broken Sword", type: "fetch", objective: "Find pieces of his old sword", reward: { exp: 500, gold: 1000, item: "slayer_hilt" } }
    },
    {
        id: "lava_mage", name: "Pyromancer Ash", sprite: "🌋",
        personality: "destructive",
        dialogue: ["Burn it all!", "Lava flows like water to me.", "Beautiful destruction..."],
        quest: { id: "magma_core", name: "Core Sample", type: "gather", objective: "Collect active magma core", reward: { exp: 430, gold: 860 } }
    },
    {
        id: "egg_keeper", name: "Keeper Hatha", sprite: "🥚",
        personality: "protective",
        dialogue: ["Shh! They are sleeping.", "Dragon eggs are fragile.", "Thieves will be incinerated."],
        quest: { id: "egg_incubator", name: "Warmth for the Nest", type: "gather", objective: "Collect 10 Fire Opals", reward: { exp: 410, gold: 820 } }
    },
    {
        id: "ash_merchant", name: "Merchant Cinder", sprite: "🏺",
        personality: "coughing",
        dialogue: ["*cough* Ash masks for sale.", "Volcanic dust is good for... something.", "Rare minerals here!"],
        quest: { id: "rare_minerals", name: "Volcanic Gems", type: "gather", objective: "Collect 5 Sulfur Crystals", reward: { exp: 380, gold: 760 } }
    },
    {
        id: "drake_trainer", name: "Trainer Fang", sprite: "🦎",
        personality: "scarred",
        dialogue: ["Drakes are just small dragons.", "They bite.", "Got a finger bit off yesterday."],
        quest: { id: "runaway_drake", name: "Loose Drake", type: "hunt", objective: "Capture the escaped drake", reward: { exp: 400, gold: 800 } }
    },
    {
        id: "historian_draco", name: "Scholar Scales", sprite: "📜",
        personality: "fascinated",
        dialogue: ["Dragons speak the primal tongue.", "I'm translating the ruins.", "Did they really eat rocks?"],
        quest: { id: "draconic_tablet", name: "Ancient Script", type: "search", objective: "Find 3 stone tablets", reward: { exp: 440, gold: 880 } }
    },
    {
        id: "sulfur_miner", name: "Miner Cole", sprite: "⛏️",
        personality: "smelly",
        dialogue: ["I smell like rotten eggs.", "Money smells good though.", "Watch out for gas pockets."],
        quest: { id: "miner_rescue", name: "Gas Leak", type: "rescue", objective: "Save miners from gas", reward: { exp: 420, gold: 840 } }
    },
    {
        id: "phoenix_priestess", name: "Priestess Ember", sprite: "🕊️",
        personality: "hopeful",
        dialogue: ["From the ashes, we rise.", "Fire brings new life.", "Let the past burn away."],
        quest: { id: "sacred_flame", name: "Rekindle", type: "special", objective: "Light the eternal brazier", reward: { exp: 460, gold: 920 } }
    },
    {
        id: "obsidian_golem", name: "Golem Rocky", sprite: "🗿",
        personality: "silent",
        dialogue: ["...", "Rumble...", "*points to mountain*"],
        quest: { id: "golem_heart", name: "Heart of Stone", type: "fetch", objective: "Find heartstone", reward: { exp: 450, gold: 900 } }
    },
    {
        id: "treasure_hunter_lea", name: "Hunter Lea", sprite: "💰",
        personality: "adventurous",
        dialogue: ["Dragons hoard gold.", "I'm going to steal it.", "Want in?"],
        quest: { id: "heist_plan", name: "Dragon Heist", type: "special", objective: "Steal from sleeping dragon", reward: { exp: 600, gold: 2000, item: "dragon_chalice" } }
    },
    {
        id: "hermit_oracle", name: "Oracle Pythia", sprite: "🔮",
        personality: "mad",
        dialogue: ["Smoke shows the future!", "Darkness comes!", "The Demon Lords... they wake!"],
        quest: { id: "doom_prophecy", name: "Visions of Ruin", type: "talk", objective: "Interpret 3 visions", reward: { exp: 400, gold: 800 } }
    },
    {
        id: "volcano_chef", name: "Chef Gordon", sprite: "👨‍🍳",
        personality: "angry",
        dialogue: ["IT'S RAW!", "Cook it on the lava!", "Dragon steak needs spice!"],
        quest: { id: "spicy_peppers", name: "Ghost Peppers", type: "gather", objective: "Collect 5 Ghost Peppers", reward: { exp: 390, gold: 780 } }
    },
    {
        id: "exiled_knight", name: "Sir Galahad", sprite: "🛡️",
        personality: "stoic",
        dialogue: ["I failed my king.", "I seek redemption here.", "Fire purifies honor."],
        quest: { id: "honor_duel", name: "Redemption", type: "challenge", objective: "Defeat Galahad in a duel", reward: { exp: 500, gold: 1000, item: "knights_honor" } }
    },
    {
        id: "salamander_tamer", name: "Tamer Sal", sprite: "🦎",
        personality: "playful",
        dialogue: ["Fire lizards are cute!", "Don't touch, they burn.", "Want to pet one?"],
        quest: { id: "lost_salamander", name: "Fiery Pet", type: "search", objective: "Find Sparky the salamander", reward: { exp: 380, gold: 760 } }
    },
    {
        id: "runemaster_stone", name: "Runemaster Korg", sprite: "🪨",
        personality: "ancient",
        dialogue: ["Runes hold power.", "Fire runes are unstable.", "I bind them to stone."],
        quest: { id: "rune_collection", name: "Unstable Runes", type: "gather", objective: "Stabilize 5 fire runes", reward: { exp: 440, gold: 880 } }
    },
    {
        id: "dragon_worshipper", name: "Cultist Vane", sprite: "🗡️",
        personality: "creepy",
        dialogue: ["Become one with the dragon.", "Scales are perfection.", "Join us..."],
        quest: { id: "cult_infiltration", name: "Dragon Cult", type: "investigation", objective: "Spy on the cult meeting", reward: { exp: 420, gold: 840 } }
    },
    {
        id: "climber_max", name: "Climber Max", sprite: "🧗",
        personality: "energetic",
        dialogue: ["Highest peak in the world!", "I'm going to the top!", "Air is thin up there."],
        quest: { id: "flag_planting", name: "Top of the World", type: "exploration", objective: "Plant flag at summit", reward: { exp: 480, gold: 960 } }
    }
],

    // ===== TOWN 7 - CELESTIAL SUMMIT (Floating/Holy City) =====
    town_7: [
        {
            id: "archangel_tyrael", name: "Angel Tyrael", sprite: "👼",
            personality: "divine",
            dialogue: ["Greetings, mortal.", "The heavens watch you.", "Prepare for the final battle."],
            quest: { id: "divine_trial", name: "Trial of Valor", type: "challenge", objective: "Defeat the shadow echo", reward: { exp: 1000, gold: 2000, item: "angel_feather" } }
        },
        {
            id: "cloud_keeper", name: "Keeper Nimbus", sprite: "☁️",
            personality: "dreamy",
            dialogue: ["Walking on clouds...", "Don't look down.", "The sky is our ocean."],
            quest: { id: "cloud_harvest", name: "Condensed Mist", type: "gather", objective: "Collect 10 Cloud Essence", reward: { exp: 600, gold: 1200 } }
        },
        {
            id: "celestial_smith", name: "Smith Aurum", sprite: "⚒️",
            personality: "shining",
            dialogue: ["I forge with starlight.", "Gold is too soft.", "This metal sings."],
            quest: { id: "star_metal", name: "Fallen Star", type: "fetch", objective: "Retrieve meteorite ore", reward: { exp: 700, gold: 1400, item: "stardust_ingot" } }
        },
        {
            id: "void_watcher", name: "Watcher Void", sprite: "👁️",
            personality: "serious",
            dialogue: ["The abyss gazes back.", "I watch the demons below.", "They are coming."],
            quest: { id: "seal_breach", name: "Void Rift", type: "special", objective: "Close the dimensional tear", reward: { exp: 800, gold: 1600 } }
        },
        {
            id: "stargazer_luna", name: "Stargazer Luna", sprite: "🔭",
            personality: "quiet",
            dialogue: ["The stars align.", "Destiny is written above.", "A comet approaches."],
            quest: { id: "constellation_map", name: "Star Chart", type: "exploration", objective: "Map 5 constellations", reward: { exp: 650, gold: 1300 } }
        },
        {
            id: "harpy_queen_ref", name: "Queen Aella", sprite: "🦅",
            personality: "haughty",
            dialogue: ["Harpies rule the winds.", "Land-walkers are slow.", "We tolerate you."],
            quest: { id: "wind_challenge", name: "Race the Wind", type: "challenge", objective: "Beat harpy in flight", reward: { exp: 700, gold: 1400 } }
        },
        {
            id: "demigod_hero", name: "Hero Hercules", sprite: "💪",
            personality: "boisterous",
            dialogue: ["Haha! A fellow warrior!", "I've defeated hydras!", "Are you strong enough?"],
            quest: { id: "strength_test", name: "Labors of Hero", type: "challenge", objective: "Lift the heavy stone", reward: { exp: 750, gold: 1500 } }
        },
        {
            id: "light_mage", name: "Lux User", sprite: "✨",
            personality: "bright",
            dialogue: ["Darkness cannot exist here.", "Let there be light!", "Shadows flee from me."],
            quest: { id: "prism_focus", name: "Pure Light", type: "gather", objective: "Collect 5 Light Prisms", reward: { exp: 600, gold: 1200 } }
        },
        {
            id: "wing_healer", name: "Healer Raphael", sprite: "⚕️",
            personality: "caring",
            dialogue: ["Broken wings heal slow.", "I tend to the angels.", "Your soul is weary."],
            quest: { id: "ambrosia_nectar", name: "Food of Gods", type: "gather", objective: "Collect Ambrosia", reward: { exp: 800, gold: 1600, item: "ambrosia" } }
        },
        {
            id: "thunder_god", name: "Lord Zeus (Avatar)", sprite: "⚡",
            personality: "commanding",
            dialogue: ["Thunder strikes the wicked!", "Kneel, mortal.", "Power is everything."],
            quest: { id: "thunder_bolt", name: "Lightning Rod", type: "fetch", objective: "Place rod in storm", reward: { exp: 900, gold: 1800 } }
        },
        {
            id: "valkyrie_leader", name: "Commander Brunhilde", sprite: "🛡️",
            personality: "fierce",
            dialogue: ["We choose the slain.", "Valhalla awaits.", "Fight with honor!"],
            quest: { id: "fallen_warrior", name: "Souls of Heroes", type: "hunt", objective: "Defeat 10 Corrupted Souls", reward: { exp: 800, gold: 1600 } }
        },
        {
            id: "library_spirit", name: "Spirit Archivist", sprite: "👻",
            personality: "whispering",
            dialogue: ["All history is here.", "The first age... the fall...", "Knowledge is eternal."],
            quest: { id: "forbidden_tome", name: "Book of Truth", type: "search", objective: "Find the missing scroll", reward: { exp: 700, gold: 1400 } }
        },
        {
            id: "garden_keeper", name: "Keeper Eden", sprite: "🌸",
            personality: "blissful",
            dialogue: ["This is paradise.", "No sorrow here.", "Eat the fruit..."],
            quest: { id: "golden_apple", name: "Fruit of Life", type: "gather", objective: "Pick a Golden Apple", reward: { exp: 1000, gold: 2000, item: "golden_apple" } }
        },
        {
            id: "fate_weaver", name: "Weaver Moira", sprite: "🧶",
            personality: "blind",
            dialogue: ["I cut the thread.", "Your life is fragile.", "Do not resist fate."],
            quest: { id: "destiny_thread", name: "Tangled Fate", type: "special", objective: "Untangle the loom", reward: { exp: 850, gold: 1700 } }
        },
        {
            id: "gatekeeper_peter", name: "Gatekeeper Peter", sprite: "🗝️",
            personality: "judgemental",
            dialogue: ["Who seeks entry?", "Are your hands clean?", "The gate opens for the worthy."],
            quest: { id: "judgment_day", name: "Weighing of Heart", type: "special", objective: "Pass the judgment test", reward: { exp: 900, gold: 1800 } }
        },
        {
            id: "fallen_angel_spy", name: "Spy Lucifer", sprite: "🧛",
            personality: "deceptive",
            dialogue: ["It's too bright here.", "They are arrogant.", "Power lies elsewhere..."],
            quest: { id: "dark_influence", name: "Whispers", type: "talk", objective: "Plant seeds of doubt", reward: { exp: 750, gold: 1500 } }
        },
        {
            id: "astrologer_sol", name: "Sol User", sprite: "☀️",
            personality: "radiant",
            dialogue: ["The sun is our father.", "Feel the warmth.", "Night is fleeting."],
            quest: { id: "solar_flare", name: "Sun Stone", type: "gather", objective: "Capture a sunbeam", reward: { exp: 700, gold: 1400 } }
        },
        {
            id: "cloud_giant", name: "Giant Titan", sprite: "👺",
            personality: "slow_loud",
            dialogue: ["FO_FI_FO_FUM!", "I smell... hero.", "Need... beanstalk."],
            quest: { id: "beanstalk_climb", name: "Giant Problem", type: "challenge", objective: "Arm wrestle the giant", reward: { exp: 800, gold: 1600 } }
        },
        {
            id: "time_keeper", name: "Chronos", sprite: "⏳",
            personality: "impatient",
            dialogue: ["Tick tock...", "Time runs out.", "Do not waste it."],
            quest: { id: "time_warp", name: "Lost Seconds", type: "special", objective: "Recover lost time fragments", reward: { exp: 1000, gold: 2000, item: "hourglass" } }
        },
        {
            id: "divine_beast", name: "Beast Kirin", sprite: "🦄",
            personality: "noble",
            dialogue: ["I walk on air.", "Innocence guides me.", "Evil cannot hide."],
            quest: { id: "purify_water", name: "Cleansing Hoof", type: "special", objective: "Purify the sky fountain", reward: { exp: 900, gold: 1800 } }
        }
    ]
};

// Merge function to combine with main file
export function mergeNPCs(mainNPCs) {
    return {
        ...mainNPCs,
        town_4: TOWN_NPCS_PART2.town_4,
        town_5: TOWN_NPCS_PART2.town_5,
        town_6: TOWN_NPCS_PART2.town_6,
        town_7: TOWN_NPCS_PART2.town_7
    };
}
