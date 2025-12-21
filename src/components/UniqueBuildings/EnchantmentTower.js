import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { GEM_SYSTEM } from '../../data/gemSystem.js';

const EnchantmentTower = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [selectedGem, setSelectedGem] = useState(null);
    const [selectedSocket, setSelectedSocket] = useState(0);

    const equipment = state.player.equipment || { weapon: null, armor: null, accessory: null };
    const inventory = state.player.inventory || [];

    // Get gems from inventory
    const gemsInInventory = inventory.filter(item =>
        GEM_SYSTEM.GEMS[item.id]
    );

    const handleSocketGem = () => {
        if (!selectedEquipment || !selectedGem) {
            alert("Select both equipment and gem!");
            return;
        }

        const gem = GEM_SYSTEM.GEMS[selectedGem.id];
        const cost = gem.socketCost;

        if (state.player.gold < cost) {
            alert(`Not enough gold! Cost: ${cost}g`);
            return;
        }

        // Socket the gem
        const equipItem = equipment[selectedEquipment];
        if (!equipItem.sockets) {
            equipItem.sockets = [];
        }

        equipItem.sockets[selectedSocket] = selectedGem.id;

        // Remove gem from inventory
        const newInventory = inventory.filter(item => item.id !== selectedGem.id || item !== selectedGem);

        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: {
                ...state.player,
                equipment: { ...equipment, [selectedEquipment]: equipItem },
                inventory: newInventory,
                gold: state.player.gold - cost
            }
        });

        alert(`${gem.name} socketed successfully!`);
        setSelectedGem(null);
    };

    const handleRemoveGem = (socketIndex) => {
        if (!selectedEquipment) return;

        const equipItem = equipment[selectedEquipment];
        if (!equipItem.sockets || !equipItem.sockets[socketIndex]) return;

        const gemId = equipItem.sockets[socketIndex];
        const gem = GEM_SYSTEM.GEMS[gemId];
        const cost = Math.floor(gem.socketCost * GEM_SYSTEM.REMOVAL_COST_MULTIPLIER);

        if (state.player.gold < cost) {
            alert(`Not enough gold! Removal cost: ${cost}g`);
            return;
        }

        const destroyed = Math.random() < GEM_SYSTEM.REMOVAL_DESTROY_CHANCE;

        equipItem.sockets[socketIndex] = null;

        const updates = {
            ...state.player,
            equipment: { ...equipment, [selectedEquipment]: equipItem },
            gold: state.player.gold - cost
        };

        if (!destroyed) {
            updates.inventory = [...inventory, { id: gemId, count: 1 }];
        }

        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: updates
        });

        alert(destroyed
            ? `${gem.name} was destroyed during removal!`
            : `${gem.name} removed successfully!`
        );
    };

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'modal-content enchant-modal' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, "✨ Enchantment Tower"),
                React.createElement('button', { className: 'close-btn', onClick: onClose }, "CLOSE")
            ),

            React.createElement('div', { className: 'enchant-content' },
                React.createElement('p', { className: 'intro' },
                    "Socket gems into your equipment for powerful stat bonuses!"
                ),

                // Equipment Selection
                React.createElement('div', { className: 'equipment-section' },
                    React.createElement('h3', null, "Select Equipment"),
                    React.createElement('div', { className: 'equipment-grid' },
                        Object.entries(equipment).map(([slot, item]) =>
                            item ? React.createElement('div', {
                                key: slot,
                                className: `equip-card ${selectedEquipment === slot ? 'selected' : ''}`,
                                onClick: () => setSelectedEquipment(slot)
                            },
                                React.createElement('h4', null, slot.toUpperCase()),
                                React.createElement('p', null, item.label || item.id),
                                React.createElement('div', { className: 'socket-display' },
                                    Array.from({ length: GEM_SYSTEM.MAX_SOCKETS[item.type] || 0 }).map((_, i) =>
                                        React.createElement('div', {
                                            key: i,
                                            className: `socket ${item.sockets?.[i] ? 'filled' : 'empty'}`,
                                            onClick: (e) => { e.stopPropagation(); setSelectedSocket(i); }
                                        },
                                            item.sockets?.[i]
                                                ? GEM_SYSTEM.GEMS[item.sockets[i]]?.name.charAt(0)
                                                : '○'
                                        )
                                    )
                                )
                            ) : null
                        )
                    )
                ),

                // Gem Selection
                selectedEquipment && React.createElement('div', { className: 'gem-section' },
                    React.createElement('h3', null, "Select Gem to Socket"),
                    React.createElement('div', { className: 'gem-grid' },
                        gemsInInventory.map((gemItem, idx) => {
                            const gem = GEM_SYSTEM.GEMS[gemItem.id];
                            return React.createElement('div', {
                                key: idx,
                                className: `gem-card ${selectedGem === gemItem ? 'selected' : ''}`,
                                onClick: () => setSelectedGem(gemItem)
                            },
                                React.createElement('h4', null, gem.name),
                                React.createElement('p', null, gem.description),
                                React.createElement('p', { className: 'gem-stats' },
                                    Object.entries(gem.stats).map(([stat, val]) => `${stat.toUpperCase()}+${val}`).join(', ')
                                ),
                                React.createElement('p', { className: 'gem-cost' }, `Cost: ${gem.socketCost}g`)
                            );
                        })
                    ),
                    gemsInInventory.length === 0 && React.createElement('p', { className: 'no-gems' },
                        "No gems in inventory!"
                    )
                ),

                // Actions
                selectedEquipment && React.createElement('div', { className: 'enchant-actions' },
                    React.createElement('button', {
                        className: 'socket-btn',
                        onClick: handleSocketGem,
                        disabled: !selectedGem
                    }, "Socket Gem"),
                    React.createElement('button', {
                        className: 'remove-btn',
                        onClick: () => handleRemoveGem(selectedSocket),
                        disabled: !equipment[selectedEquipment]?.sockets?.[selectedSocket]
                    }, `Remove Gem (${Math.floor((GEM_SYSTEM.GEMS[equipment[selectedEquipment]?.sockets?.[selectedSocket]]?.socketCost || 0) * 0.5)}g, 25% destroy)`)
                )
            )
        ),

        React.createElement('style', null, `
      .enchant-modal { width: 900px; max-height: 90vh; }
      .enchant-content { padding: 25px; }
      .intro { text-align: center; color: var(--text-muted); margin-bottom: 20px; font-size: 1.1rem; }
      
      .equipment-section, .gem-section { margin-bottom: 25px; }
      .equipment-section h3, .gem-section h3 { color: var(--primary); margin-bottom: 15px; }
      
      .equipment-grid, .gem-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; }
      .equip-card, .gem-card { background: var(--bg-dark); border: 2px solid var(--border); border-radius: var(--radius-md); padding: 15px; cursor: pointer; transition: all 0.2s; }
      .equip-card:hover, .gem-card:hover { border-color: var(--primary); transform: translateY(-2px); }
      .equip-card.selected, .gem-card.selected { border-color: #10b981; background: rgba(16, 185, 129, 0.1); box-shadow: 0 0 15px rgba(16, 185, 129, 0.3); }
      
      .equip-card h4, .gem-card h4 { margin: 0 0 10px 0; color: var(--accent); }
      .equip-card p, .gem-card p { margin: 5px 0; color: var(--text-muted); font-size: 0.9rem; }
      
      .socket-display { display: flex; gap: 8px; margin-top: 12px; }
      .socket { width: 30px; height: 30px; border: 2px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; }
      .socket.empty { color: var(--text-muted); }
      .socket.filled { background: var(--primary); color: white; border-color: var(--primary); }
      
      .gem-stats { color: #10b981 !important; font-weight: bold; }
      .gem-cost { color: #fbbf24 !important; font-weight: bold; }
      
      .no-gems { text-align: center; padding: 40px; color: var(--text-muted); font-style: italic; }
      
      .enchant-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
      .socket-btn, .remove-btn { padding: 15px; border: none; border-radius: var(--radius-md); font-weight: bold; font-size: 1.1rem; cursor: pointer; transition: all 0.2s; }
      .socket-btn { background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%); color: white; }
      .socket-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4); }
      .remove-btn { background: #ef4444; color: white; }
      .remove-btn:hover:not(:disabled) { background: #dc2626; transform: translateY(-2px); }
      .socket-btn:disabled, .remove-btn:disabled { opacity: 0.3; cursor: not-allowed; }
    `)
    );
};

export default EnchantmentTower;
