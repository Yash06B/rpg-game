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
        React.createElement('div', { className: 'modal-content blacksmith-modal' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, "⚒️ Blacksmith"),
                React.createElement('div', { className: 'tabs' },
                    React.createElement('button', { className: tab === 'craft' ? 'active' : '', onClick: () => setTab('craft') }, "Craft"),
                    React.createElement('button', { className: tab === 'enhance' ? 'active' : '', onClick: () => setTab('enhance') }, "Enhance")
                ),
                React.createElement('button', { className: 'close-btn', onClick: onClose }, "CLOSE")
            ),

            React.createElement('div', { className: 'bs-content' },

                // === CRAFTING TAB ===
                tab === 'craft' && React.createElement('div', { className: 'recipe-list' },
                    RECIPES.map((r, idx) => {
                        const item = ITEMS[r.result];
                        const canCraft = hasMaterials(r.materials) && state.player.gold >= r.cost;
                        return React.createElement('div', { key: idx, className: 'recipe-card' },
                            React.createElement('div', { className: 'r-icon' }, item.type === 'weapon' ? "⚔️" : item.type === 'armor' ? "🛡️" : "🧪"),
                            React.createElement('div', { className: 'r-info' },
                                React.createElement('h3', null, item.label),
                                React.createElement('p', { className: 'cost' }, `${r.cost}g`),
                                React.createElement('div', { className: 'mats' },
                                    Object.entries(r.materials).map(([k, v]) =>
                                        React.createElement('span', { key: k }, `${ITEMS[k]?.label || k}: ${v} `)
                                    )
                                )
                            ),
                            React.createElement('button', {
                                className: 'craft-btn',
                                disabled: !canCraft,
                                onClick: () => handleCraft(r)
                            }, "Craft")
                        );
                    })
                ),

                // === ENHANCE TAB ===
                tab === 'enhance' && React.createElement('div', { className: 'enhance-panel' },
                    React.createElement('h3', null, "Select Equipment to Enhance"),

                    playerEquipment.length === 0
                        ? React.createElement('p', { className: 'no-items' }, "No equipment in inventory!")
                        : React.createElement('div', { className: 'equip-list' },
                            playerEquipment.map(item => {
                                const itemData = ITEMS[item.id];
                                const enhanceLvl = item.enhance || 0;
                                return React.createElement('button', {
                                    key: item.id,
                                    className: `equip-item ${selectedEquipment === item.id ? 'selected' : ''}`,
                                    onClick: () => setSelectedEquipment(item.id)
                                },
                                    React.createElement('span', null, getItemDisplayName(itemData, enhanceLvl)),
                                    enhanceLvl > 0 && React.createElement('span', { className: 'enhance-badge' }, `+${enhanceLvl}`)
                                );
                            })
                        ),

                    selectedItemData && React.createElement('div', { className: 'enhance-details' },
                        React.createElement('h3', null, getItemDisplayName(selectedItemData, currentEnhance)),
                        React.createElement('div', { className: 'stats-display' },
                            React.createElement('div', { className: 'stat-col' },
                                React.createElement('h4', null, "Current Stats"),
                                Object.entries(getEnhancedStats(selectedItemData, currentEnhance)).map(([stat, val]) =>
                                    React.createElement('p', { key: stat }, `${stat.toUpperCase()}: ${val}`)
                                )
                            ),
                            React.createElement('div', { className: 'arrow' }, "→"),
                            React.createElement('div', { className: 'stat-col' },
                                React.createElement('h4', null, "Next Level"),
                                currentEnhance < 15
                                    ? Object.entries(getEnhancedStats(selectedItemData, currentEnhance + 1)).map(([stat, val]) =>
                                        React.createElement('p', { key: stat, className: 'upgrade' }, `${stat.toUpperCase()}: ${val}`)
                                    )
                                    : React.createElement('p', null, "MAX LEVEL")
                            )
                        ),

                        currentEnhance < 15 && React.createElement('div', { className: 'enhance-info' },
                            React.createElement('p', null, `Cost: ${nextEnhanceCost} Gold`),
                            React.createElement('p', null, `Success Rate: ${(enhanceRate * 100).toFixed(1)}%`),
                            React.createElement('div', { className: 'rate-bar' },
                                React.createElement('div', {
                                    className: 'rate-fill',
                                    style: { width: `${enhanceRate * 100}%`, background: enhanceRate > 0.5 ? '#10b981' : '#ef4444' }
                                })
                            ),
                            React.createElement('button', {
                                className: 'enhance-btn',
                                onClick: handleEnhance,
                                disabled: state.player.gold < nextEnhanceCost
                            }, `Enhance to +${currentEnhance + 1}`)
                        )
                    )
                )
            )
        ),
        React.createElement('style', null, `
      .blacksmith-modal { width: 850px; max-height: 90vh; display: flex; flex-direction: column; }
      .tabs { display: flex; gap: 10px; }
      .tabs button { background: transparent; border: 1px solid var(--border); color: var(--text-muted); padding: 8px 20px; cursor: pointer; border-radius: var(--radius-md); }
      .tabs button.active { background: var(--primary); color: white; border-color: var(--primary); }
      
      .bs-content { flex: 1; overflow-y: auto; padding-top: 20px; }
      
      .recipe-card {
        background: var(--bg-dark);
        padding: 15px;
        margin-bottom: 10px;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        gap: 15px;
        border: 1px solid var(--border);
      }
      .r-icon { font-size: 2rem; }
      .r-info { flex: 1; }
      .cost { color: #fbbf24; font-weight: bold; }
      .mats { font-size: 0.85rem; color: var(--text-muted); }
      
      .craft-btn, .enhance-btn {
        background: var(--primary);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: var(--radius-md);
        cursor: pointer;
        font-weight: bold;
        font-size: 1rem;
      }
      .craft-btn:disabled, .enhance-btn:disabled { background: var(--bg-panel); color: var(--text-muted); cursor: not-allowed; }

      /* Enhancement Styles */
      .enhance-panel h3 { margin-bottom: 15px; color: var(--primary); }
      .equip-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-bottom: 20px; }
      .equip-item {
        background: var(--bg-dark);
        border: 2px solid var(--border);
        padding: 12px;
        border-radius: var(--radius-md);
        cursor: pointer;
        text-align: left;
        color: var(--text-main);
        transition: all 0.2s;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .equip-item:hover { border-color: var(--primary); }
      .equip-item.selected { background: var(--primary); color: white; border-color: var(--primary); }
      .enhance-badge { background: #fbbf24; color: black; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem; font-weight: bold; }

      .enhance-details { background: var(--bg-panel); padding: 20px; border-radius: var(--radius-lg); margin-top: 20px; }
      .stats-display { display: flex; gap: 30px; justify-content: center; margin: 20px 0; }
      .stat-col { background: var(--bg-dark); padding: 15px; border-radius: var(--radius-md); min-width: 150px; }
      .stat-col h4 { margin-bottom: 10px; font-size: 0.9rem; color: var(--text-muted); }
      .stat-col p { margin: 5px 0; }
      .stat-col p.upgrade { color: #10b981; font-weight: bold; }
      .arrow { font-size: 2rem; color: var(--primary); align-self: center; }

      .enhance-info { margin-top: 20px; text-align: center; }
      .enhance-info p { margin: 8px 0; }
      .rate-bar { background: #222; height: 20px; border-radius: 10px; margin: 15px 0; overflow: hidden; }
      .rate-fill { height: 100%; transition: width 0.3s; }
      .no-items { text-align: center; color: var(--text-muted); padding: 40px; font-style: italic; }
    `)
    );
};

export default Blacksmith;
