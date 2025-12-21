// Quest Database - 7 Hidden Questlines (7 steps each)
export const QUESTS = {
    // === TOWN 1 - Pride Demon Questline ===
    pride_quest: {
        id: "pride_quest",
        town: "town_1",
        name: "The Path of Humility",
        steps: [
            {
                step: 1,
                title: "The Boastful Scholar",
                description: "An old scholar in the Ancient Library speaks of a legendary artifact that can humble even the proudest demon.",
                npc: "Scholar Aldric",
                dialogue: [
                    "Ah, another adventurer seeking glory? How... typical.",
                    "If you TRULY wish to be great, you must first learn humility.",
                    "Speak to the beggar outside the Inn. He has more wisdom than you'd expect."
                ],
                condition: "TALK_TO_SCHOLAR",
                reward: { item: "old_book", flag: "pride_1_complete" }
            },
            {
                step: 2,
                title: "The Beggar's Wisdom",
                description: "Find the beggar near the Inn.",
                npc: "Old Beggar",
                dialogue: [
                    "*cough* Spare a coin, friend?",
                    "Ah, the scholar sent you? Good, good.",
                    "Pride is a hungry beast. It devours from within.",
                    "Defeat 10 enemies in the forest without using skills. Only basic attacks. Learn discipline."
                ],
                condition: "DEFEAT_10_BASIC_ONLY",
                reward: { item: "torn_scroll", flag: "pride_2_complete" }
            },
            {
                step: 3,
                title: "The Merchant's Test",
                description: "Deliver the scroll to the merchant in Town 2.",
                npc: "Traveling Merchant",
                dialogue: [
                    "This scroll? Haven't seen one in YEARS!",
                    "Legend says it's part of a map to the Mirror of Humility.",
                    "But first... I need Dragon Scales. Risky business, those dragons.",
                    "Bring me 3 Dragon Scales."
                ],
                condition: "COLLECT_DRAGON_SCALE_3",
                reward: { item: "map_fragment_1", flag: "pride_3_complete" }
            },
            {
                step: 4,
                title: "The Forgotten Shrine",
                description: "Use the map to find the hidden shrine in the forest.",
                dialogue: [
                    "You discover an ancient shrine covered in vines.",
                    "An inscription reads: 'The proud see only themselves. The humble see all.'",
                    "Place three different colored gems on the altar."
                ],
                condition: "PLACE_GEMS_RUBY_SAPPHIRE_EMERALD",
                reward: { item: "shrine_key", flag: "pride_4_complete" }
            },
            {
                step: 5,
                title: "The Underground Labyrinth",
                description: "Enter the shrine's hidden passage.",
                dialogue: [
                    "The passage descends deep underground.",
                    "You hear whispers: 'Turn back... this is not your path...'",
                    "Defeat the Guardian Statue without taking damage."
                ],
                condition: "DEFEAT_GUARDIAN_FLAWLESS",
                reward: { item: "ancient_crest", flag: "pride_5_complete" }
            },
            {
                step: 6,
                title: "The Final Offering",
                description: "Return to Scholar Aldric with all your findings.",
                npc: "Scholar Aldric",
                dialogue: [
                    "You've returned! And with the crest, no less!",
                    "But there's one final test.",
                    "Donate 1000 gold to the church. Wealth means nothing to the humble."
                ],
                condition: "DONATE_GOLD_1000",
                reward: { item: "blessed_water", flag: "pride_6_complete" }
            },
            {
                step: 7,
                title: "Forging the Mirror",
                description: "Take all the items to the Blacksmith.",
                npc: "Master Blacksmith",
                dialogue: [
                    "*examines items* This... this is extraordinary craftwork from the old world.",
                    "I can forge these into the Mirror of Humility.",
                    "With this, the Pride Demon's power will be broken!"
                ],
                condition: "CRAFT_MIRROR_OF_HUMILITY",
                reward: { item: "mirror_of_humility", flag: "pride_quest_complete", exp: 1000, gold: 500 }
            }
        ]
    },

    // === TOWN 2 - Greed Demon Questline ===
    greed_quest: {
        id: "greed_quest",
        town: "town_2",
        name: "The Price of Charity",
        steps: [
            {
                step: 1,
                title: "The Desperate Merchant",
                description: "A merchant has lost everything to bandits.",
                npc: "Ruined Merchant",
                dialogue: [
                    "*sobbing* They took EVERYTHING! My life's work!",
                    "The Greed Demon's influence spreads... everyone wants more, more, MORE!",
                    "Please, help me recover my stolen goods from the bandits' cave."
                ],
                condition: "TALK_TO_MERCHANT",
                reward: { item: "merchant_ledger", flag: "greed_1_complete" }
            },
            {
                step: 2,
                title: "Bandit's Den",
                description: "Raid the bandit hideout and recover the goods.",
                condition: "DEFEAT_BANDIT_LEADER",
                reward: { item: "stolen_goods", flag: "greed_2_complete", exp: 300 }
            },
            {
                step: 3,
                title: "The Unexpected Choice",
                npc: "Ruined Merchant",
                dialogue: [
                    "You got it all back! I'm saved!",
                    "Wait... there's extra gold here that wasn't mine.",
                    "Keep it. You earned it... or give it to the orphanage. Your choice will be remembered."
                ],
                condition: "CHOOSE_CHARITY", // Player must choose to donate
                reward: { item: "charity_deed", flag: "greed_3_complete" }
            },
            {
                step: 4,
                title: "The Orphanage's Gratitude",
                npc: "Sister Mary",
                dialogue: [
                    "You donated to us? In these dark times?",
                    "Bless you, child. Your kindness is rare.",
                    "Take this. It belonged to our founder - a saint who fought greed itself."
                ],
                condition: "TALK_TO_SISTER",
                reward: { item: "saint_medallion", flag: "greed_4_complete" }
            },
            {
                step: 5,
                title: "The Cursed Hoard",
                description: "Investigate rumors of a cursed treasure cave.",
                dialogue: [
                    "Gold everywhere... mountains of it...",
                    "But touching it burns your soul. This is the Greed Demon's trap!",
                    "Resist the temptation. Take only what you need - exactly 100 gold."
                ],
                condition: "TAKE_ONLY_100_GOLD",
                reward: { item: "pure_gold_coin", flag: "greed_5_complete" }
            },
            {
                step: 6,
                title: "The Generous Gift",
                description: "A stranger asks for help with medical expenses.",
                npc: "Desperate Father",
                dialogue: [
                    "My daughter is sick... the medicine costs 500 gold...",
                    "I know we just met but... please... I'm begging you..."
                ],
                condition: "GIVE_500_GOLD",
                reward: { item: "gratitude_letter", flag: "greed_6_complete" }
            },
            {
                step: 7,
                title: "Seal of Charity",
                npc: "High Priest",
                dialogue: [
                    "Your acts of charity have not gone unnoticed.",
                    "The gods smile upon you. Take this - the Seal of Charity.",
                    "It will weaken the Greed Demon significantly!"
                ],
                condition: "SHOW_ALL_CHARITY_ITEMS",
                reward: { item: "seal_of_charity", flag: "greed_quest_complete", exp: 1500, gold: 0 }
            }
        ]
    },

    // === TOWN 7 - Special Tome of Mastery Quest ===
    mastery_quest: {
        id: "mastery_quest",
        town: "town_7",
        name: "The Ultimate Knowledge",
        steps: [
            {
                step: 1,
                title: "The Grand Sage",
                npc: "Grand Sage Merlin",
                dialogue: [
                    "You've reached the summit of the world, young one.",
                    "Few make it this far. Even fewer are worthy of... THE TOME.",
                    "Prove yourself. Complete all six Demon Lord artifacts first."
                ],
                condition: "HAVE_ALL_6_ARTIFACTS",
                reward: { flag: "mastery_1_complete" }
            },
            {
                step: 2,
                title: "Trial of Combat",
                description: "Defeat 100 Ancient Dragons without dying.",
                condition: "DEFEAT_100_ANCIENT_DRAGONS_NO_DEATH",
                reward: { item: "trial_seal_1", flag: "mastery_2_complete", exp: 5000 }
            },
            {
                step: 3,
                title: "Trial of Wisdom",
                description: "Answer the sage's riddles correctly.",
                dialogue: [
                    "Riddle 1: I am weightless, but you can see me. Put me in a bucket and I make it lighter. What am I?",
                    "(Answer: A hole)",
                    "Riddle 2: What has 15 evolutions but starts as one?",
                    "(Answer: A class/character)"
                ],
                condition: "ANSWER_RIDDLES_CORRECTLY",
                reward: { item: "trial_seal_2", flag: "mastery_3_complete" }
            },
            {
                step: 4,
                title: "Trial of Charity",
                description: "Donate all your gold and equipment to charity.",
                condition: "DONATE_EVERYTHING",
                reward: { item: "trial_seal_3", flag: "mastery_4_complete" }
            },
            {
                step: 5,
                title: "Trial of Patience",
                description: "Meditate for 100 turns in battle without attacking.",
                condition: "MEDITATE_100_TURNS",
                reward: { item: "trial_seal_4", flag: "mastery_5_complete" }
            },
            {
                step: 6,
                title: "Trial of Mastery",
                description: "Defeat a God-tier enemy using ONLY basic attacks.",
                condition: "DEFEAT_GOD_TIER_BASIC_ONLY",
                reward: { item: "trial_seal_5", flag: "mastery_6_complete", exp: 10000 }
            },
            {
                step: 7,
                title: "The Tome is Yours",
                npc: "Grand Sage Merlin",
                dialogue: [
                    "You have completed all trials. Extraordinary.",
                    "No one has done this in 500 years.",
                    "Behold... the TOME OF MASTERY!",
                    "All your skills will instantly reach maximum level and evolve to their final forms!",
                    "The Sloth Demon will cower before your might!"
                ],
                condition: "RECEIVE_TOME",
                reward: { item: "tome_of_mastery", flag: "mastery_quest_complete", exp: 20000 }
            }
        ]
    },

    // === TOWN 3 - Wrath Demon Questline ===
    wrath_quest: {
        id: "wrath_quest",
        town: "town_3",
        name: "Calming the Storm",
        steps: [
            {
                step: 1,
                title: "The Raging Blacksmith",
                npc: "Furious Smith",
                dialogue: [
                    "*smashing hammer* THEY STOLE FROM ME!",
                    "Those bandits! I'll DESTROY them all!",
                    "My tools... my LIFE'S WORK! Gone!",
                    "Help me get revenge... or I'll lose myself to rage."
                ],
                condition: "TALK_TO_SMITH",
                reward: { item: "rage_note", flag: "wrath_1_complete" }
            },
            {
                step: 2,
                title: "Defeating Anger",
                description: "Defeat 20 enemies WITHOUT getting hit. Control your anger.",
                condition: "DEFEAT_20_FLAWLESS",
                reward: { item: "patience_medal", flag: "wrath_2_complete", exp: 500 }
            },
            {
                step: 3,
                title: "The Meditation Master",
                npc: "Zen Monk",
                dialogue: [
                    "Anger clouds judgment. Peace brings clarity.",
                    "Meditate at the mountaintop for 3 turns in battle.",
                    "Do not attack. Only defend."
                ],
                condition: "MEDITATE_3_TURNS_COMBAT",
                reward: { item: "zen_scroll", flag: "wrath_3_complete" }
            },
            {
                step: 4,
                title: "Forgiving the Thief",
                npc: "Captured Bandit",
                dialogue: [
                    "*trembling* Please... I was desperate... my family was starving...",
                    "The blacksmith wants me dead. But I'll return everything!",
                    "Convince him to forgive me?"
                ],
                condition: "CONVINCE_SMITH_FORGIVE",
                reward: { item: "forgiveness_letter", flag: "wrath_4_complete" }
            },
            {
                step: 5,
                title: "The Blacksmith's Choice",
                npc: "Furious Smith",
                dialogue: [
                    "*reading letter* He... he has children?",
                    "*tears up* I... I was going to kill a father...",
                    "Thank you for stopping me. Take this amulet. It calms rage."
                ],
                condition: "GIVE_LETTER_TO_SMITH",
                reward: { item: "peaceful_amulet", flag: "wrath_5_complete" }
            },
            {
                step: 6,
                title: "Inner Peace",
                description: "Win 10 battles using ONLY defensive skills.",
                condition: "WIN_10_DEFENSE_ONLY",
                reward: { item: "serene_gem", flag: "wrath_6_complete", exp: 800 }
            },
            {
                step: 7,
                title: "Forging the Calm",
                npc: "Zen Monk",
                dialogue: [
                    "You have learned true peace. The opposite of wrath.",
                    "Take these blessed items to the altar.",
                    "The Calm Amulet will drain Wrath's power!"
                ],
                condition: "FORGE_CALM_AMULET",
                reward: { item: "calm_amulet", flag: "wrath_quest_complete", exp: 2000 }
            }
        ]
    },

    // === TOWN 4 - Envy Demon Questline ===
    envy_quest: {
        id: "envy_quest",
        town: "town_4",
        name: "The Sin of Comparison",
        steps: [
            {
                step: 1,
                title: "The Jealous Rival",
                npc: "Bitter Mage",
                dialogue: [
                    "Everyone praises THEM. Never me!",
                    "I'm just as powerful! No, MORE powerful!",
                    "I hate them. I HATE them all!",
                    "Envy consumes this town. We need to break it."
                ],
                condition: "TALK_TO_MAGE",
                reward: { item: "envy_diary", flag: "envy_1_complete" }
            },
            {
                step: 2,
                title: "Celebrating Others",
                description: "Donate 1000 gold to 3 different NPCs.",
                condition: "DONATE_TO_3_NPCS",
                reward: { item: "generosity_badge", flag: "envy_2_complete" }
            },
            {
                step: 3,
                title: "The Mirror of Truth",
                description: "Find the cursed mirror showing people their inadequacies.",
                dialogue: [
                    "You find a dark mirror. It shows your worst fears.",
                    "Every failure. Every missed opportunity.",
                    "Resist the urge to compare. Break the mirror."
                ],
                condition: "BREAK_CURSED_MIRROR",
                reward: { item: "mirror_shard", flag: "envy_3_complete" }
            },
            {
                step: 4,
                title: "Helping a Competitor",
                npc: "Rival Adventurer",
                dialogue: [
                    "You... you're helping ME? Your rival?",
                    "I've been so jealous of your success...",
                    "But you showed me... we can both succeed.",
                    "Here, take this. You earned it more than I did."
                ],
                condition: "HELP_RIVAL_QUEST",
                reward: { item: "friendship_ring", flag: "envy_4_complete" }
            },
            {
                step: 5,
                title: "Being Content",
                description: "Refuse a powerful legendary item offer. Choose contentment.",
                condition: "REFUSE_LEGENDARY",
                reward: { item: "contentment_stone", flag: "envy_5_complete" }
            },
            {
                step: 6,
                title: "The Shapeshifter's Lesson",
                npc: "Doppelganger",
                dialogue: [
                    "I copy everyone. Never myself.",
                    "I envy all... am nothing.",
                    "Teach me... to be myself?"
                ],
                condition: "TEACH_DOPPELGANGER",
                reward: { item: "identity_crystal", flag: "envy_6_complete" }
            },
            {
                step: 7,
                title: "Ring of Contentment",
                npc: "Sage of Self",
                dialogue: [
                    "You've learned the greatest lesson: to be yourself.",
                    "Envy dies when we accept who we are.",
                    "This ring will weaken the Envy Demon greatly!"
                ],
                condition: "FORGE_CONTENTMENT_RING",
                reward: { item: "ring_of_contentment", flag: "envy_quest_complete", exp: 3000 }
            }
        ]
    },

    // === TOWN 5 - Lust Demon Questline ===
    lust_quest: {
        id: "lust_quest",
        town: "town_5",
        name: "Resisting Temptation",
        steps: [
            {
                step: 1,
                title: "The Enchanted",
                npc: "Charmed Villager",
                dialogue: [
                    "*glazed eyes* She's... so beautiful...",
                    "I'd do anything for her...",
                    "My family? Job? Who cares! I need HER!",
                    "Please... save me from this curse..."
                ],
                condition: "TALK_TO_CHARMED",
                reward: { item: "charm_analysis", flag: "lust_1_complete" }
            },
            {
                step: 2,
                title: "Breaking the Charm",
                description: "Defeat the Succubus without looking at her. Resist temptation.",
                condition: "DEFEAT_SUCCUBUS_BLIND",
                reward: { item: "broken_charm", flag: "lust_2_complete", exp: 800 }
            },
            {
                step: 3,
                title: "The Faithful Partner",
                npc: "Loyal Spouse",
                dialogue: [
                    "My husband was taken by that demon...",
                    "But I never stopped loving him. Never gave up.",
                    "True love isn't about desire. It's about commitment.",
                    "Take this ring. It protected our marriage for 50 years."
                ],
                condition: "TALK_TO_SPOUSE",
                reward: { item: "wedding_band", flag: "lust_3_complete" }
            },
            {
                step: 4,
                title: "Rejecting Desire",
                description: "A goddess offers you ultimate power for your devotion. Refuse.",
                condition: "REJECT_GODDESS",
                reward: { item: "purity_seal", flag: "lust_4_complete" }
            },
            {
                step: 5,
                title: "Saving the Innocent",
                description: "Rescue 10 charmed villagers from the demon's lair.",
                condition: "RESCUE_10_CHARMED",
                reward: { item: "savior_medal", flag: "lust_5_complete", exp: 1200 }
            },
            {
                step: 6,
                title: "The Heart of Purity",
                npc: "High Priestess",
                dialogue: [
                    "Your heart remains pure despite temptation.",
                    "This clarity of mind is rare in this corrupted age.",
                    "Take the Crystal of Clarity. Guard it well."
                ],
                condition: "RECEIVE_CRYSTAL",
                reward: { item: "clarity_crystal", flag: "lust_6_complete" }
            },
            {
                step: 7,
                title: "Crown of Clarity",
                npc: "Temple Smith",
                dialogue: [
                    "These holy items together... incredible!",
                    "I can forge the Crown of Clarity!",
                    "The Lust Demon will lose all power over minds!"
                ],
                condition: "FORGE_CLARITY_CROWN",
                reward: { item: "crown_of_clarity", flag: "lust_quest_complete", exp: 4000 }
            }
        ]
    },

    // === TOWN 6 - Gluttony Demon Questline ===
    gluttony_quest: {
        id: "gluttony_quest",
        town: "town_6",
        name: "The Price of Excess",
        steps: [
            {
                step: 1,
                title: "The Endless Feast",
                npc: "Bloated Noble",
                dialogue: [
                    "*eating* More! I need MORE!",
                    "I can't stop eating... I'm dying... but I CAN'T STOP!",
                    "The demon's curse... it makes us HUNGER...",
                    "*sobbing* Help us..."
                ],
                condition: "TALK_TO_NOBLE",
                reward: { item: "gluttony_note", flag: "gluttony_1_complete" }
            },
            {
                step: 2,
                title: "Fasting Challenge",
                description: "Complete 5 battles without using any consumable items.",
                condition: "WIN_5_NO_ITEMS",
                reward: { item: "self_control_badge", flag: "gluttony_2_complete", exp: 1000 }
            },
            {
                step: 3,
                title: "Feeding the Poor",
                description: "Donate all your food items to the hungry in town.",
                condition: "DONATE_ALL_FOOD",
                reward: { item: "charity_deed_food", flag: "gluttony_3_complete" }
            },
            {
                step: 4,
                title: "The Starving Merchant",
                npc: "Thin Trader",
                dialogue: [
                    "I used to be like them. Always wanting more.",
                    "Then I lost everything. Learned to survive on nothing.",
                    "Now I'm free. Hunger no longer controls me.",
                    "This belt kept me disciplined. You'll need it."
                ],
                condition: "TALK_TO_TRADER",
                reward: { item: "discipline_belt", flag: "gluttony_4_complete" }
            },
            {
                step: 5,
                title: "Destroying the Feast",
                description: "Find and destroy the demon's corrupted feast hall.",
                condition: "DESTROY_FEAST_HALL",
                reward: { item: "holy_fire", flag: "gluttony_5_complete", exp: 1500 }
            },
            {
                step: 6,
                title: "Taking Only What's Needed",
                description: "In a room of treasure, take only 1 gold. Show restraint.",
                condition: "TAKE_ONLY_1_GOLD",
                reward: { item: "restraint_proof", flag: "gluttony_6_complete" }
            },
            {
                step: 7,
                title: "Belt of Restraint",
                npc: "Master of Discipline",
                dialogue: [
                    "You've shown perfect self-control.",
                    "In a world of excess, you chose balance.",
                    "The Belt of Restraint will bind the Gluttony Demon!",
                    "He who consumes all... will be consumed by nothing!"
                ],
                condition: "FORGE_RESTRAINT_BELT",
                reward: { item: "belt_of_restraint", flag: "gluttony_quest_complete", exp: 5000 }
            }
        ]
    }
};

// NPC Dialogue Database
export const NPCS = {
    scholar_aldric: {
        id: "scholar_aldric",
        name: "Scholar Aldric",
        location: "town_1",
        sprite: "📚",
        defaultDialogue: [
            "The library contains knowledge from a thousand years past.",
            "Many seek power. Few seek wisdom.",
            "Have you heard of the legendary artifacts? They say seven exist..."
        ],
        questDialogue: {
            pride_quest: "Ah, seeking the Mirror of Humility? Ambitious.",
            greed_quest: "Greed blinds even the wisest souls. Be careful."
        }
    },

    old_beggar: {
        id: "old_beggar",
        name: "Old Beggar",
        location: "town_1",
        sprite: "🧙‍♂️",
        defaultDialogue: [
            "*cough* Spare some gold for an old man?",
            "This young generation... always rushing everywhere.",
            "I've seen things you wouldn't believe..."
        ]
    },

    master_blacksmith: {
        id: "master_blacksmith",
        name: "Master Blacksmith",
        location: "all_towns",
        sprite: "⚒️",
        defaultDialogue: [
            "*hammering* What do you need?",
            "Good steel is worth more than gold.",
            "Bring me the materials, I'll craft you something special."
        ]
    },

    traveling_merchant: {
        id: "traveling_merchant",
        name: "Traveling Merchant",
        location: "town_2",
        sprite: "🎒",
        defaultDialogue: [
            "Welcome, welcome! Best prices in all the land!",
            "I travel far and wide. Seen many strange things.",
            "Dragon scales? Expensive, but I might have some..."
        ]
    },

    guild_master: {
        id: "guild_master",
        name: "Guild Master",
        location: "all_towns",
        sprite: "👑",
        defaultDialogue: [
            "The Guild accepts all who seek adventure.",
            "Quests are posted on the board. Take what you can handle.",
            "We've lost too many good people to the Demon Lords..."
        ]
    },

    sister_mary: {
        id: "sister_mary",
        name: "Sister Mary",
        location: "town_2",
        sprite: "🕊️",
        defaultDialogue: [
            "May the light guide you, child.",
            "Even in darkness, hope remains.",
            "Our orphanage survives through charity alone."
        ]
    },

    grand_sage: {
        id: "grand_sage",
        name: "Grand Sage Merlin",
        location: "town_7",
        sprite: "🔮",
        defaultDialogue: [
            "You stand before the wisest mage in existence.",
            "The Tome of Mastery... yes, I guard it still.",
            "But are you TRULY ready for such power?"
        ]
    },

    mysterious_stranger: {
        id: "mysterious_stranger",
        name: "Mysterious Stranger",
        location: "random",
        sprite: "🎭",
        defaultDialogue: [
            "...",
            "We'll meet again, traveler.",
            "*vanishes into shadows*"
        ],
        special: "May offer secret hints or rare items"
    }
};

// Quest helper functions
export function getActiveQuestStep(questId, completedFlags) {
    const quest = QUESTS[questId];
    if (!quest) return null;

    for (let i = 0; i < quest.steps.length; i++) {
        const flagKey = `${questId.replace('_quest', '')}_${i + 1}_complete`;
        if (!completedFlags[flagKey]) {
            return { ...quest.steps[i], questName: quest.name };
        }
    }

    return null; // Quest completed
}

export function isQuestComplete(questId, completedFlags) {
    return !!completedFlags[`${questId}_complete`];
}
