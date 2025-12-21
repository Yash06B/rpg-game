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

    const currentTownId = state.world.location === 'town_1' ? 'town_1' : state.world.location;
    const npcs = ALL_NPCS[currentTownId] || [];

    return React.createElement('div', { className: 'npc-panel' },
        React.createElement('h3', null, "Town Inhabitants"),
        React.createElement('div', { className: 'npc-list' },
            npcs.map(npc =>
                React.createElement('div', {
                    key: npc.id,
                    className: 'npc-card',
                    onClick: () => setSelectedNPC(npc)
                },
                    React.createElement('span', { className: 'npc-sprite' }, npc.sprite),
                    React.createElement('div', { className: 'npc-info' },
                        React.createElement('span', { className: 'npc-name' }, npc.name),
                        npc.quest && React.createElement('span', { className: 'quest-marker' }, "!")
                    )
                )
            )
        ),

        selectedNPC && React.createElement(NPCInteractionModal, {
            npc: selectedNPC,
            onClose: () => setSelectedNPC(null)
        }),

        React.createElement('style', null, `
            .npc-panel { background: var(--bg-panel); padding: 15px; border-radius: var(--radius-md); height: 100%; display: flex; flex-direction: column; }
            .npc-panel h3 { color: var(--text-main); margin-bottom: 10px; border-bottom: 1px solid var(--border); padding-bottom: 5px; }
            .npc-list { overflow-y: auto; flex: 1; display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
            
            .npc-card { 
                background: var(--bg-dark); 
                padding: 10px; 
                border-radius: var(--radius-sm); 
                cursor: pointer; 
                display: flex; 
                align-items: center; 
                gap: 10px; 
                border: 1px solid transparent; 
                transition: all 0.2s; 
            }
            .npc-card:hover { border-color: var(--primary); transform: translateX(2px); }
            
            .npc-sprite { font-size: 1.5rem; }
            .npc-info { display: flex; flex-direction: column; }
            .npc-name { font-size: 0.9rem; font-weight: 500; }
            .quest-marker { color: #fbbf24; font-weight: bold; font-size: 0.8rem; }
        `)
    );
};

export default NPCList;
