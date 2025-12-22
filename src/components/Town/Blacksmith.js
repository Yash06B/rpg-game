import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { RECIPES, ITEMS, ENHANCEMENT, getEnhancedStats, getItemDisplayName } from '../../data/items.js';

const Blacksmith = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const [tab, setTab] = useState('craft');
    const [selectedEquipment, setSelectedEquipment] = useState(null);

    // --- CRAFTING ---
    const hasMaterials = (mats) => {
        for (const [id, count] of Object.entries(mats)) {
            const invItem = state.player.inventory.find(i => i.id === id);
            if (!invItem || invItem.count < count) return false;
        }
        return true;
    };

    const handleCraft = (recipe) => {
        if (state.player.gold < recipe.cost) {
            alert("Not enough gold!");
            return;
        }
        if (!hasMaterials(recipe.materials)) {
            alert("Missing materials!");
            return;
        }

        const newInv = [...state.player.inventory];
        const existing = newInv.find(i => i.id === recipe.result);
        if (existing) existing.count++;
        else newInv.push({ id: recipe.result, count: 1 });

        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: { ...state.player, inventory: newInv, gold: state.player.gold - recipe.cost }
        });

        alert(`Crafted ${ITEMS[recipe.result].label}!`);
    };

    // --- ENHANCEMENT ---
    const getPlayerEquipment = () => {
        return state.player.inventory.filter(item => {
            const itemData = ITEMS[item.id];
            return itemData && (itemData.type === 'weapon' || itemData.type === 'armor');
        });
    };

    const handleEnhance = () => {
        if (!selectedEquipment) {
            alert("Select equipment first!");
            return;
        }

        const item = state.player.inventory.find(i => i.id === selectedEquipment);
        if (!item) return;

        const currentLevel = item.enhance || 0;
        if (currentLevel >= 15) {
            alert("Maximum enhancement reached (+15)!");
            return;
        }

        const cost = ENHANCEMENT.costs[currentLevel];
        if (state.player.gold < cost) {
            alert(`Need ${cost} gold to enhance!`);
            return;
        }

        const successRate = ENHANCEMENT.successRates[currentLevel];
        const success = Math.random() < successRate;

        if (success) {
            // Success!
            const newInv = state.player.inventory.map(i =>
                i.id === selectedEquipment ? { ...i, enhance: (i.enhance || 0) + 1 } : i
            );

            dispatch({
                type: ACTIONS.UPDATE_PLAYER_DATA,
                payload: { ...state.player, inventory: newInv, gold: state.player.gold - cost }
            });

            alert(`SUCCESS! ${ITEMS[selectedEquipment].label} is now +${currentLevel + 1}!`);
        } else {
            // Failure - lose gold but item stays same
            dispatch({
                type: ACTIONS.UPDATE_PLAYER_DATA,
                payload: { ...state.player, gold: state.player.gold - cost }
            });

            alert(`Enhancement FAILED. Better luck next time!`);
        }
    };

    const playerEquipment = getPlayerEquipment();
    const selectedItem = selectedEquipment ? state.player.inventory.find(i => i.id === selectedEquipment) : null;
    const selectedItemData = selectedItem ? ITEMS[selectedItem.id] : null;
    const currentEnhance = selectedItem?.enhance || 0;
    const nextEnhanceCost = ENHANCEMENT.costs[currentEnhance];
    const enhanceRate = ENHANCEMENT.successRates[currentEnhance];

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'retro-modal-box' },
            React.createElement('div', { className: 'retro-modal-header' },
                React.createElement('h2', { className: 'retro-h2' }, "> BLACKSMITH WORKSHOP"),
                React.createElement('div', { className: 'retro-tabs' },
                    React.createElement('button', { className: `retro-tab-btn ${tab === 'craft' ? 'active' : ''}`, onClick: () => setTab('craft') }, "[ 1 ] CRAFT"),
                    React.createElement('button', { className: `retro-tab-btn ${tab === 'enhance' ? 'active' : ''}`, onClick: () => setTab('enhance') }, "[ 2 ] ENHANCE"),
                    React.createElement('button', { className: 'retro-tab-btn', onClick: onClose }, "[ X ] EXIT")
                )
            ),

            React.createElement('div', { className: 'retro-content-area' },

                // === CRAFTING TAB ===
                tab === 'craft' && React.createElement('div', { className: 'retro-list-container' },
                    React.createElement('p', { className: 'retro-text' }, "> SELECT BLUEPRINT TO FABRICATE:"),
                    RECIPES.map((r, idx) => {
                        const item = ITEMS[r.result];
                        const canCraft = hasMaterials(r.materials) && state.player.gold >= r.cost;
                        return React.createElement('div', { key: idx, className: 'retro-list-item' },
                            React.createElement('div', { className: 'item-details' },
                                React.createElement('span', { className: 'item-name' }, `${item.label.toUpperCase()}`),
                                React.createElement('span', { className: 'item-cost' }, `COST: ${r.cost}g | STATUS: ${canCraft ? 'READY' : 'INSUFFICIENT'}`)
                            ),
                            React.createElement('button', {
                                className: 'retro-action-btn',
                                disabled: !canCraft,
                                onClick: () => handleCraft(r)
                            }, "[ CRAFT ]")
                        );
                    })
                ),

                // === ENHANCE TAB ===
                tab === 'enhance' && React.createElement('div', { className: 'retro-enhance-panel' },
                    !selectedEquipment ? React.createElement(React.Fragment, null,
                        React.createElement('p', { className: 'retro-text' }, "> SELECT ITEM TO UPGRADE:"),
                        React.createElement('div', { className: 'retro-list-container' },
                            playerEquipment.length === 0
                                ? React.createElement('p', { className: 'retro-text' }, "> NO ELIGIBLE EQUIPMENT FOUND.")
                                : playerEquipment.map(item => {
                                    const itemData = ITEMS[item.id];
                                    const enhanceLvl = item.enhance || 0;
                                    return React.createElement('button', {
                                        key: item.id,
                                        className: 'retro-list-item selectable',
                                        onClick: () => setSelectedEquipment(item.id)
                                    }, `> ${getItemDisplayName(itemData, enhanceLvl).toUpperCase()}`);
                                })
                        )
                    ) : React.createElement('div', { className: 'enhance-view' },
                        React.createElement('h3', { className: 'retro-h3' }, `> UPGRADING: ${getItemDisplayName(selectedItemData, currentEnhance).toUpperCase()}`),

                        currentEnhance < 15 ? React.createElement(React.Fragment, null,
                            React.createElement('div', { className: 'retro-stats-box' },
                                React.createElement('p', null, `COST: ${nextEnhanceCost}G`),
                                React.createElement('p', null, `CHANCE: ${(enhanceRate * 100).toFixed(0)}%`),
                            ),
                            React.createElement('div', { className: 'enhance-actions' },
                                React.createElement('button', {
                                    className: 'retro-action-btn primary',
                                    onClick: handleEnhance,
                                    disabled: state.player.gold < nextEnhanceCost
                                }, "[ ATTEMPT UPGRADE ]"),
                                React.createElement('button', {
                                    className: 'retro-action-btn',
                                    onClick: () => setSelectedEquipment(null)
                                }, "[ BACK ]")
                            )
                        ) : React.createElement('p', { className: 'retro-text' }, "> ITEM IS MAX LEVEL.")
                    )
                )
            )
        ),
        React.createElement('style', null, `
            .retro-modal-box {
                background: #000;
                border: 2px solid var(--primary);
                padding: 20px;
                width: 800px;
                max-width: 95vw;
                height: 80vh;
                display: flex;
                flex-direction: column;
                color: var(--primary);
                font-family: monospace;
            }
            .retro-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 2px solid var(--border);
                padding-bottom: 15px;
                margin-bottom: 20px;
            }
            .retro-tabs { display: flex; gap: 15px; }
            .retro-tab-btn {
                background: transparent;
                border: none;
                color: var(--text-muted);
                cursor: pointer;
                font-family: monospace;
                font-size: 1rem;
            }
            .retro-tab-btn:hover, .retro-tab-btn.active {
                color: var(--primary);
                text-decoration: underline;
            }
            .retro-content-area { flex: 1; overflow-y: auto; }
            .retro-list-container { display: flex; flex-direction: column; gap: 10px; }
            .retro-list-item { 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                padding: 10px; 
                border: 1px solid #333; 
            }
            .retro-list-item.selectable:hover {
                border-color: var(--primary);
                background: rgba(0, 255, 0, 0.1);
                cursor: pointer;
            }
            .item-details { display: flex; flex-direction: column; }
            .item-name { color: var(--primary); font-weight: bold; }
            .item-cost { font-size: 0.8rem; color: var(--text-muted); }
            
            .retro-action-btn {
                background: transparent;
                border: 1px solid var(--primary);
                color: var(--primary);
                font-family: monospace;
                padding: 5px 15px;
                cursor: pointer;
            }
            .retro-action-btn:hover:not(:disabled) {
                background: var(--primary);
                color: #000;
            }
            .retro-action-btn:disabled {
                border-color: #555;
                color: #555;
                cursor: not-allowed;
            }
            .retro-stats-box {
                border: 1px dashed var(--accent);
                padding: 15px;
                margin: 20px 0;
                color: var(--accent);
            }
            .enhance-actions { display: flex; gap: 20px; }
        `)
    );  );
};

export default Blacksmith;
