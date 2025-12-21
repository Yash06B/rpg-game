// Combat Flavor Text Database
export const COMBAT_FLAVOR = {
    // Player Attacks
    player_weak: [
        "You land a glancing blow on {enemy}.",
        "You scratch {enemy}.",
        "A weak hit on {enemy}.",
        "You barely graze {enemy}."
    ],
    player_normal: [
        "You strike {enemy} with force.",
        "A solid hit on {enemy}!",
        "You attack {enemy} swiftly.",
        "Your weapon finds its mark on {enemy}."
    ],
    player_strong: [
        "CRITICAL HIT! You devastate {enemy}!",
        "An incredibly powerful strike against {enemy}!",
        "You smash {enemy} with overwhelming force!",
        "{enemy} reels from your massive blow!"
    ],

    // Enemy Attacks
    enemy_weak: [
        "{enemy} tries to hit you but stumbles.",
        "{enemy} barely touches you.",
        "You easily deflect {enemy}'s attack.",
        "{enemy}'s attack is weak."
    ],
    enemy_normal: [
        "{enemy} attacks you!",
        "{enemy} lands a hit.",
        "{enemy} strikes you.",
        "You take damage from {enemy}."
    ],
    enemy_strong: [
        "{enemy} CRUSHES you with a heavy blow!",
        "A brutal attack from {enemy}!",
        "{enemy} lands a critical strike!",
        "You are sent flying by {enemy}'s attack!"
    ],

    // Special Events
    miss: [
        "You missed {enemy}!",
        "{enemy} dodged your attack!",
        "Your attack swings wide!",
        "Too slow! {enemy} evades."
    ],
    enemy_miss: [
        "{enemy} missed you!",
        "You dodged {enemy}'s attack!",
        "{enemy} strikes the air.",
        "You sidestep {enemy}'s clumsy attack."
    ],
    flee_success: [
        "You successfully ran away!",
        "You escaped with your life!",
        "Retreat successful!",
        "You live to fight another day."
    ],
    flee_fail: [
        "You failed to escape!",
        "Blocked! You cannot flee.",
        "{enemy} prevents your retreat!",
        "Nowhere to run!"
    ]
};

export function getFlavorText(type, context = {}) {
    const texts = COMBAT_FLAVOR[type] || ["Action occurred."];
    const template = texts[Math.floor(Math.random() * texts.length)];
    return template.replace(/{enemy}/g, context.enemyName || "the enemy");
}
