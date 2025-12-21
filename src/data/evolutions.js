export const EVOLUTIONS = {
    // --- MAGE ---
    Mage: {
        10: [
            { id: "pyromancer", label: "Pyromancer", desc: "Fire specialist. High burst damage." },
            { id: "cryomancer", label: "Cryomancer", desc: "Ice specialist. CC and defense." },
            { id: "stormbringer", label: "Stormbringer", desc: "Lightning specialist. Speed and multi-hit." }
        ]
    },
    Pyromancer: { 40: [{ id: "inferno_sage", label: "Inferno Sage", desc: "Master of burning hellfire." }] },
    Cryomancer: { 40: [{ id: "frost_archon", label: "Frost Archon", desc: "Ruler of eternal winter." }] },
    Stormbringer: { 40: [{ id: "thunder_god", label: "Thunder God", desc: "Avatar of storms." }] },
    // ... (Full tree is massive, implementing truncated path logic for MAGE/WARRIOR for demo, 
    // but structure supports all. User can add more in this file easily.)

    // --- WARRIOR ---
    Warrior: {
        10: [
            { id: "swordmaster", label: "Swordmaster", desc: "Fast attacks with blades." },
            { id: "axe_berserker", label: "Axe Berserker", desc: "Heavy crushing blows." },
            { id: "spear_lancer", label: "Spear Lancer", desc: "Mid-range piercing." }
        ]
    },

    // --- ROGUE ---
    Rogue: {
        10: [
            { id: "assassin_evo", label: "Assassin", desc: "Killing blows from shadows." },
            { id: "shadow_dancer", label: "Shadow Dancer", desc: "Evasion tank." },
            { id: "trickster", label: "Trickster", desc: "Debuffs and confusion." }
        ]
    },

    // Generic fallback if not defined yet
    fallback: {
        10: [{ id: "veteran", label: "Veteran", desc: "Experienced fighter." }]
    }
};

// Growth Mods per Tier (Multiplier to base growth)
export const TIER_MODS = {
    0: 1.0,
    1: 1.5, // Lv10
    2: 2.0, // Lv40
    3: 3.0, // Lv70
    4: 5.0  // Lv90 (God)
};
