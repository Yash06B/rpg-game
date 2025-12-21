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
        React.createElement('div', { className: 'npc-grid' },
            filteredNpcs.map(npc => {
                // Check if this specific NPC has an available quest matching current state
                // (Simple check: is it the active one? yes, we just filtered for it)
                const hasQuest = npc.quest && !state.world.completedQuests.includes(npc.quest.id);
                const isAccepted = state.world.activeCommonQuests.some(q => q.id === npc.quest?.id);

                return React.createElement('div', {
                    key: npc.id,
                    className: `npc-card ${hasQuest && !isAccepted ? 'has-quest' : ''}`,
                    onClick: () => setSelectedNPC(npc)
                },
                    React.createElement('span', { className: 'npc-sprite' }, npc.sprite),
                    React.createElement('div', { className: 'npc-info' },
                        React.createElement('span', { className: 'npc-name' }, npc.name),
                        // Show "!" if quest available and not accepted
                        // Show "?" if accepted and ready to turn in? (That logic is in Modal, keeping it simple here)
                        (hasQuest && !isAccepted) && React.createElement('span', { className: 'quest-marker' }, "!")
                    )
                );
            })
        ),

        selectedNPC && React.createElement(NPCInteractionModal, {
            npc: selectedNPC,
            onClose: () => setSelectedNPC(null)
        }),

        React.createElement('style', null, `
            .npc-list-container {
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            .npc-grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); 
                gap: 12px; 
                padding: 5px;
            }
            
            .npc-card { 
                background: rgba(30, 41, 59, 0.6); 
                padding: 12px; 
                border-radius: 8px; 
                cursor: pointer; 
                display: flex; 
                align-items: center; 
                gap: 12px; 
                border: 1px solid #475569; 
                transition: all 0.2s; 
            }
            .npc-card:hover { 
                background: rgba(51, 65, 85, 0.8);
                border-color: #94a3b8; 
                transform: translateY(-2px); 
            }
            .npc-card.has-quest {
                border-color: #fbbf24;
                box-shadow: 0 0 5px rgba(251, 191, 36, 0.2);
            }
            
            .npc-sprite { font-size: 1.8rem; }
            .npc-info { display: flex; flex-direction: column; }
            .npc-name { font-size: 0.95rem; font-weight: 600; color: #e2e8f0; }
            .quest-marker { color: #fbbf24; font-weight: bold; font-size: 1rem; animation: bounce 1s infinite; }

            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-3px); }
            }
        `)
    );
};

export default NPCList;
