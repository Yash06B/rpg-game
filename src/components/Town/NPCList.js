import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { TOWN_NPCS } from '../../data/townNPCs.js';
import { mergeNPCs } from '../../data/townNPCs_part2.js';
import NPCInteractionModal from './NPCInteractionModal.js';

// Merge all NPCs
const ALL_NPCS = mergeNPCs(TOWN_NPCS);

const NPCList = () => {
    const { state } = useGame();
    const [selectedNPC, setSelectedNPC] = useState(null);

    const currentTownId = (state.world && state.world.location) ? state.world.location : 'town_1';
    const rawNpcs = ALL_NPCS[currentTownId] || [];

    // --- FILTERING LOGIC ---
    // Group duplicates (like Grandmaster Uther 1-7) and show only the active one
    const filteredNpcs = React.useMemo(() => {
        const groups = {};

        // 1. Group by Name
        rawNpcs.forEach(npc => {
            if (!groups[npc.name]) groups[npc.name] = [];
            groups[npc.name].push(npc);
        });

        // 2. Select Active NPC for each group
        return Object.values(groups).map(group => {
            if (group.length === 1) return group[0];

            // Filter for the first one whose quest is NOT completed
            const active = group.find(npc => {
                // If it has a quest, check if it's completed
                if (npc.quest) {
                    const isCompleted = state.world.completedQuests.includes(npc.quest.id);
                    return !isCompleted;
                }
                return true; // No quest? Always a candidate if previous ones were completed
            });

            // If found an active quest step, return it.
            // If ALL are completed, return the LAST one (final state).
            return active || group[group.length - 1];
        }).sort((a, b) => a.name.localeCompare(b.name)); // Optional: Sort alphabetically

    }, [rawNpcs, state.world.completedQuests]);


    return React.createElement('div', { className: 'npc-list-container' },
        React.createElement('div', { className: 'retro-npc-list' },
            filteredNpcs.map((npc, index) => {
                const hasQuest = npc.quest && !state.world.completedQuests.includes(npc.quest.id);
                const isAccepted = state.world.activeCommonQuests.some(q => q.id === npc.quest?.id);

                // Retro marker
                let marker = "";
                if (hasQuest && !isAccepted) marker = " [ ! ]";
                if (isAccepted) marker = " [ ? ]";

                return React.createElement('button', {
                    key: npc.id,
                    className: `retro-command-btn ${hasQuest ? 'highlight' : ''}`,
                    onClick: () => setSelectedNPC(npc)
                }, `> [ TALK ] ${npc.name.toUpperCase()} ${npc.sprite}${marker}`);
            })
        ),

        selectedNPC && React.createElement(NPCInteractionModal, {
            npc: selectedNPC,
            onClose: () => setSelectedNPC(null)
        }),

        React.createElement('style', null, `
            .npc-list-container {
                display: flex;
                flex-direction: column;
            }
            .retro-npc-list { 
                display: grid; 
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
                gap: 10px; 
            }
            .retro-command-btn {
                background: transparent;
                border: none;
                color: var(--primary);
                font-family: monospace;
                text-align: left;
                cursor: pointer;
                font-size: 1rem;
                padding: 5px;
            }
            .retro-command-btn:hover {
                background: var(--primary);
                color: #000;
            }
            .retro-command-btn.highlight {
                color: var(--accent);
            }
            .retro-command-btn.highlight:hover {
                background: var(--accent);
                color: #000;
            }
        `)
    );
};

export default NPCList;
