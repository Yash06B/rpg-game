// Common/Daily Quests - 50+ repeatable quests
export const COMMON_QUESTS = {
    // === HUNT QUESTS ===
    hunt_slimes: {
        id: "hunt_slimes", name: "Slime Extermination", type: "hunt",
        description: "Clear out the slime infestation in the forest.",
        objective: "Defeat 10 Slimes",
        condition: { type: "KILL", target: "slime", count: 10 },
        rewards: { exp: 50, gold: 100 },
        repeatable: true, level: 1
    },
    hunt_wolves: {
        id: "hunt_wolves", name: "Wolf Pack Threat", type: "hunt",
        description: "Wolves are attacking travelers. Thin their numbers.",
        objective: "Defeat 15 Wolves",
        condition: { type: "KILL", target: "wolf", count: 15 },
        rewards: { exp: 80, gold: 150 },
        repeatable: true, level: 3
    },
    hunt_goblins: {
        id: "hunt_goblins", name: "Goblin Raiders", type: "hunt",
        description: "Goblins stole from the village. Hunt them down!",
        objective: "Defeat 12 Goblins",
        condition: { type: "KILL", target: "goblin", count: 12 },
        rewards: { exp: 100, gold: 200 },
        repeatable: true, level: 2
    },
    hunt_bandits: {
        id: "hunt_bandits", name: "Bandit Trouble", type: "hunt",
        description: "Bandits are terrorizing the roads.",
        objective: "Defeat 8 Bandits",
        condition: { type: "KILL", target: "bandit", count: 8 },
        rewards: { exp: 150, gold: 300 },
        repeatable: true, level: 5
    },
    hunt_orcs: {
        id: "hunt_orcs", name: "Orc Warband", type: "hunt",
        description: "An orc warband threatens the town!",
        objective: "Defeat 10 Orcs",
        condition: { type: "KILL", target: "orc", count: 10 },
        rewards: { exp: 200, gold: 400 },
        repeatable: true, level: 12
    },
    hunt_undead: {
        id: "hunt_undead", name: "Cleanse the Undead", type: "hunt",
        description: "Undead plague the graveyard. Purify them.",
        objective: "Defeat 20 Undead (any type)",
        condition: { type: "KILL", targets: ["skeleton", "zombie", "lich"], count: 20 },
        rewards: { exp: 300, gold: 500 },
        repeatable: true, level: 20
    },
    hunt_dragons: {
        id: "hunt_dragons", name: "Dragon Slaying", type: "hunt",
        description: "Prove your worth by slaying dragons!",
        objective: "Defeat 3 Dragons",
        condition: { type: "KILL", targets: ["drake", "wyvern", "young_fire_dragon"], count: 3 },
        rewards: { exp: 2000, gold: 3000, items: ["dragon_scale"] },
        repeatable: true, level: 60
    },

    // === GATHERING QUESTS ===
    gather_wood: {
        id: "gather_wood", name: "Lumber Needed", type: "gather",
        description: "The carpenter needs wood for repairs.",
        objective: "Collect 20 Wood",
        condition: { type: "COLLECT", item: "wood", count: 20 },
        rewards: { exp: 30, gold: 80 },
        repeatable: true, level: 1
    },
    gather_iron: {
        id: "gather_iron", name: "Iron Ore Request", type: "gather",
        description: "The blacksmith needs iron ore.",
        objective: "Collect 15 Iron Ore",
        condition: { type: "COLLECT", item: "iron_ore", count: 15 },
        rewards: { exp: 60, gold: 150 },
        repeatable: true, level: 5
    },
    gather_mythril: {
        id: "gather_mythril", name: "Rare Mythril", type: "gather",
        description: "Mythril is needed for advanced crafting.",
        objective: "Collect 10 Mythril",
        condition: { type: "COLLECT", item: "mythril", count: 10 },
        rewards: { exp: 150, gold: 500 },
        repeatable: true, level: 15
    },
    gather_gems: {
        id: "gather_gems", name: "Precious Gems", type: "gather",
        description: "The jeweler needs various gems.",
        objective: "Collect 5 Gems (any type)",
        condition: { type: "COLLECT", items: ["ruby", "sapphire", "emerald"], count: 5 },
        rewards: { exp: 200, gold: 600 },
        repeatable: true, level: 20
    },
    gather_potions: {
        id: "gather_potions", name: "Potion Ingredients", type: "gather",
        description: "The alchemist needs materials.",
        objective: "Collect potion materials",
        condition: { type: "COLLECT", item: "herbs", count: 30 },
        rewards: { exp: 100, gold: 250 },
        repeatable: true, level: 10
    },

    // === DELIVERY QUESTS ===
    delivery_letter: {
        id: "delivery_letter", name: "Urgent Letter", type: "delivery",
        description: "Deliver a letter to the next town.",
        objective: "Deliver letter to Town 2",
        condition: { type: "DELIVER", item: "letter", to: "town_2" },
        rewards: { exp: 50, gold: 100 },
        repeatable: true, level: 1
    },
    delivery_package: {
        id: "delivery_package", name: "Merchant's Package", type: "delivery",
        description: "A merchant needs this package delivered.",
        objective: "Deliver package safely",
        condition: { type: "DELIVER", item: "package", to: "merchant_npc" },
        rewards: { exp: 80, gold: 200 },
        repeatable: true, level: 5
    },
    delivery_medicine: {
        id: "delivery_medicine", name: "Emergency Medicine", type: "delivery",
        description: "A sick child needs this medicine urgently!",
        objective: "Deliver medicine within time limit",
        condition: { type: "DELIVER_TIMED", item: "medicine", to: "sick_child", time: 300 },
        rewards: { exp: 150, gold: 400 },
        repeatable: true, level: 10
    },

    // === CRAFTING QUESTS ===
    craft_swords: {
        id: "craft_swords", name: "Weapon Order", type: "craft",
        description: "The guard needs 5 iron swords.",
        objective: "Craft 5 Iron Swords",
        condition: { type: "CRAFT", item: "iron_sword", count: 5 },
        rewards: { exp: 120, gold: 300 },
        repeatable: true, level: 8
    },
    craft_armor: {
        id: "craft_armor", name: "Armor Commission", type: "craft",
        description: "Craft leather armor for new recruits.",
        objective: "Craft 3 Leather Armor",
        condition: { type: "CRAFT", item: "leather_armor", count: 3 },
        rewards: { exp: 100, gold: 250 },
        repeatable: true, level: 6
    },
    craft_potions: {
        id: "craft_potions", name: "Potion Stock", type: "craft",
        description: "The shop needs health potions restocked.",
        objective: "Craft 10 Health Potions",
        condition: { type: "CRAFT", item: "potion_hp_sm", count: 10 },
        rewards: { exp: 80, gold: 200 },
        repeatable: true, level: 5
    },

    // === TRAINING QUESTS ===
    train_combat: {
        id: "train_combat", name: "Combat Training", type: "training",
        description: "Practice your combat skills.",
        objective: "Win 5 battles in a row",
        condition: { type: "WIN_STREAK", count: 5 },
        rewards: { exp: 150, gold: 0 },
        repeatable: true, level: 1
    },
    train_flawless: {
        id: "train_flawless", name: "Perfect Victory", type: "training",
        description: "Win without taking damage.",
        objective: "Win 3 flawless battles",
        condition: { type: "WIN_FLAWLESS", count: 3 },
        rewards: { exp: 250, gold: 300 },
        repeatable: true, level: 10
    },
    train_skills: {
        id: "train_skills", name: "Skill Mastery", type: "training",
        description: "Level up any skill 3 times.",
        objective: "Gain 3 skill levels",
        condition: { type: "SKILL_LEVEL_UP", count: 3 },
        rewards: { exp: 200, gold: 400 },
        repeatable: true, level: 8
    },

    // === EXPLORATION QUESTS ===
    explore_forest: {
        id: "explore_forest", name: "Forest Survey", type: "exploration",
        description: "Map the entire forest area.",
        objective: "Explore 5 forest zones",
        condition: { type: "EXPLORE", zones: ["forest_1", "forest_2", "forest_3", "forest_4", "forest_5"] },
        rewards: { exp: 100, gold: 200 },
        repeatable: false, level: 3
    },
    find_treasure: {
        id: "find_treasure", name: "Hidden Treasure", type: "exploration",
        description: "Rumors speak of hidden treasure nearby.",
        objective: "Find the treasure chest",
        condition: { type: "FIND", target: "treasure_chest" },
        rewards: { exp: 200, gold: 1000, items: ["random_rare"] },
        repeatable: true, level: 15
    },
    discover_cave: {
        id: "discover_cave", name: "Cave Discovery", type: "exploration",
        description: "Find and clear the mysterious cave.",
        objective: "Discover and clear hidden cave",
        condition: { type: "DISCOVER", target: "hidden_cave" },
        rewards: { exp: 300, gold: 500 },
        repeatable: false, level: 20
    },

    // === HELP/MISC QUESTS ===
    help_farmer: {
        id: "help_farmer", name: "Farmer's Pest Problem", type: "help",
        description: "Farmers are losing crops to pests.",
        objective: "Defeat 20 pests",
        condition: { type: "KILL", targets: ["rat", "crow", "bug"], count: 20 },
        rewards: { exp: 60, gold: 120 },
        repeatable: true, level: 2
    },
    rescue_cat: {
        id: "rescue_cat", name: "Lost Cat", type: "help",
        description: "A child's cat is stuck in a tree!",
        objective: "Find and rescue the cat",
        condition: { type: "RESCUE", target: "cat" },
        rewards: { exp: 40, gold: 80 },
        repeatable: true, level: 1
    },
    escort_merchant: {
        id: "escort_merchant", name: "Merchant Escort", type: "escort",
        description: "Protect a merchant traveling to the next town.",
        objective: "Escort merchant safely",
        condition: { type: "ESCORT", npc: "merchant", to: "town_2" },
        rewards: { exp: 200, gold: 500 },
        repeatable: true, level: 12
    },
    protect_village: {
        id: "protect_village", name: "Village Defense", type: "defense",
        description: "Monsters are attacking! Defend the village!",
        objective: "Survive 3 waves of enemies",
        condition: { type: "SURVIVE_WAVES", count: 3 },
        rewards: { exp: 400, gold: 800 },
        repeatable: true, level: 25
    },

    // === BOSS/ELITE QUESTS ===
    elite_bounty_1: {
        id: "elite_bounty_1", name: "Wanted: Bandit Chief", type: "bounty",
        description: "Defeat the notorious bandit leader.",
        objective: "Defeat Bandit Chief",
        condition: { type: "KILL_BOSS", target: "bandit_chief" },
        rewards: { exp: 500, gold: 1000, items: ["bandit_chief_head"] },
        repeatable: false, level: 15
    },
    elite_bounty_2: {
        id: "elite_bounty_2", name: "Wanted: Corrupted Treant", type: "bounty",
        description: "A treant has gone mad. Stop it!",
        objective: "Defeat Corrupted Treant",
        condition: { type: "KILL_BOSS", target: "corrupted_treant" },
        rewards: { exp: 800, gold: 1500 },
        repeatable: false, level: 30
    },
    elite_bounty_3: {
        id: "elite_bounty_3", name: "Wanted: Vampire Count", type: "bounty",
        description: "A vampire terrorizes the night.",
        objective: "Defeat Vampire Count",
        condition: { type: "KILL_BOSS", target: "vampire_count" },
        rewards: { exp: 1200, gold: 2000 },
        repeatable: false, level: 40
    },

    // === CHALLENGE QUESTS ===
    challenge_speedrun: {
        id: "challenge_speedrun", name: "Speed Challenge", type: "challenge",
        description: "Complete 10 battles in under 5 minutes.",
        objective: "Win 10 battles quickly",
        condition: { type: "WIN_TIMED", count: 10, time: 300 },
        rewards: { exp: 500, gold: 1000 },
        repeatable: true, level: 20
    },
    challenge_noheal: {
        id: "challenge_noheal", name: "No Healing Challenge", type: "challenge",
        description: "Win 5 battles without using healing items or skills.",
        objective: "Win without healing",
        condition: { type: "WIN_NO_HEAL", count: 5 },
        rewards: { exp: 600, gold: 1200 },
        repeatable: true, level: 25
    },
    challenge_lowlevel: {
        id: "challenge_lowlevel", name: "David vs Goliath", type: "challenge",
        description: "Defeat an enemy 10+ levels higher.",
        objective: "Defeat high-level enemy",
        condition: { type: "KILL_HIGHER_LEVEL", diff: 10 },
        rewards: { exp: 1000, gold: 2000 },
        repeatable: true, level: 15
    },

    // === DAILY QUESTS ===
    daily_combat: {
        id: "daily_combat", name: "Daily Combat", type: "daily",
        description: "Complete your daily training.",
        objective: "Win 10 battles today",
        condition: { type: "WIN_COUNT", count: 10 },
        rewards: { exp: 200, gold: 300 },
        repeatable: "daily", level: 1
    },
    daily_gather: {
        id: "daily_gather", name: "Daily Gathering", type: "daily",
        description: "Collect resources for the town.",
        objective: "Gather 50 resources (any type)",
        condition: { type: "GATHER_ANY", count: 50 },
        rewards: { exp: 150, gold: 250 },
        repeatable: "daily", level: 1
    },
    daily_gold: {
        id: "daily_gold", name: "Daily Fortune", type: "daily",
        description: "Earn gold through battles.",
        objective: "Earn 1000 gold today",
        condition: { type: "EARN_GOLD", amount: 1000 },
        rewards: { exp: 100, gold: 500 },
        repeatable: "daily", level: 5
    },

    // === COLLECTION QUESTS ===
    collect_rare_drops: {
        id: "collect_rare_drops", name: "Rare Item Hunter", type: "collection",
        description: "Collect rare drops from enemies.",
        objective: "Collect 5 rare items",
        condition: { type: "COLLECT_RARITY", rarity: "rare", count: 5 },
        rewards: { exp: 300, gold: 600 },
        repeatable: true, level: 18
    },
    collect_dragon_parts: {
        id: "collect_dragon_parts", name: "Dragon Materials", type: "collection",
        description: "Gather materials from dragons.",
        objective: "Collect 10 Dragon Scales",
        condition: { type: "COLLECT", item: "dragon_scale", count: 10 },
        rewards: { exp: 1000, gold: 2500 },
        repeatable: true, level: 60
    },

    // === ACHIEVEMENT QUESTS ===
    achieve_level_10: {
        id: "achieve_level_10", name: "Rising Star", type: "achievement",
        description: "Reach Level 10.",
        objective: "Reach Level 10",
        condition: { type: "REACH_LEVEL", level: 10 },
        rewards: { exp: 0, gold: 1000, items: ["skill_book"] },
        repeatable: false, level: 1
    },
    achieve_level_50: {
        id: "achieve_level_50", name: "Veteran Adventurer", type: "achievement",
        description: "Reach Level 50.",
        objective: "Reach Level 50",
        condition: { type: "REACH_LEVEL", level: 50 },
        rewards: { exp: 0, gold: 10000, items: ["legendary_weapon"] },
        repeatable: false, level: 1
    },
    achieve_rich: {
        id: "achieve_rich", name: "Wealthy Merchant", type: "achievement",
        description: "Accumulate 100,000 gold.",
        objective: "Have 100,000 gold",
        condition: { type: "HAVE_GOLD", amount: 100000 },
        rewards: { exp: 2000, items: ["golden_crown"] },
        repeatable: false, level: 1
    },
    achieve_max_skill: {
        id: "achieve_max_skill", name: "Master of Skills", type: "achievement",
        description: "Get any skill to Level 10.",
        objective: "Max a skill",
        condition: { type: "MAX_SKILL" },
        rewards: { exp: 1000, gold: 5000 },
        repeatable: false, level: 1
    },
    achieve_evolve: {
        id: "achieve_evolve", name: "Evolution Complete", type: "achievement",
        description: "Evolve your class for the first time.",
        objective: "Complete first evolution",
        condition: { type: "EVOLVE", tier: 1 },
        rewards: { exp: 500, gold: 2000 },
        repeatable: false, level: 1
    },

    // === SPECIAL EVENT QUESTS ===
    event_dragon_hunt: {
        id: "event_dragon_hunt", name: "Dragon Festival", type: "event",
        description: "Special event! Increased dragon spawns!",
        objective: "Defeat 5 dragons during the event",
        condition: { type: "KILL", targets: ["dragon"], count: 5 },
        rewards: { exp: 3000, gold: 5000, items: ["dragon_trophy"] },
        repeatable: false, level: 60
    }
};

// Quest categories for UI organization
export const QUEST_CATEGORIES = {
    HUNT: "Hunt & Combat",
    GATHER: "Gathering",
    DELIVERY: "Delivery",
    CRAFT: "Crafting",
    TRAINING: "Training",
    EXPLORATION: "Exploration",
    HELP: "Help Others",
    BOUNTY: "Bounties",
    CHALLENGE: "Challenges",
    DAILY: "Daily Quests",
    ACHIEVEMENT: "Achievements",
    EVENT: "Special Events"
};

// Get available quests based on player level
export function getAvailableQuests(playerLevel) {
    return Object.values(COMMON_QUESTS).filter(quest =>
        quest.level <= playerLevel
    );
}

// Get quests by category
export function getQuestsByCategory(category) {
    return Object.values(COMMON_QUESTS).filter(quest =>
        quest.type === category
    );
}
