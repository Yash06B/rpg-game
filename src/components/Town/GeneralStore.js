import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { ITEMS } from '../../data/items.js';

const GeneralStore = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();

    // Items available in the general store
    const SHOP_INVENTORY = [
        'potion_hp_sm',
        'potion_hp_md',
        'potion_mp_sm',
        'potion_mp_md',
        'whetstone'
    ];

    const handleBuy = (itemId) => {
        const item = ITEMS[itemId];
        if (state.player.gold < item.buyPrice) {
            alert("INSUFFICIENT FUNDS.");
            return;
        }

        const newInv = [...state.player.inventory];
        const existing = newInv.find(i => i.id === itemId);
        if (existing) existing.count++;
        else newInv.push({ id: itemId, count: 1 });

        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: {
                ...state.player,
                inventory: newInv,
                gold: state.player.gold - item.buyPrice
            }
        });

        // No alert, just seamless purchase
        // alert(`BOUGHT ${item.label.toUpperCase()}`);
    };

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'retro-modal-box' },
            React.createElement('div', { className: 'retro-modal-header' },
                React.createElement('h2', { className: 'retro-h2' }, "> GENERAL SUPPLIES"),
                React.createElement('button', { className: 'retro-close-btn', onClick: onClose }, "[ X ] EXIT")
            ),

            React.createElement('div', { className: 'retro-content-area' },
                React.createElement('div', { className: 'store-header' },
                    React.createElement('p', { className: 'retro-text' }, "Shelves are lined with bottles and basic tools."),
                    React.createElement('p', { className: 'highlight-text' }, `YOUR GOLD: ${state.player.gold}g`)
                ),

                React.createElement('div', { className: 'retro-list-container' },
                    SHOP_INVENTORY.map(itemId => {
                        const item = ITEMS[itemId];
                        const canAfford = state.player.gold >= item.buyPrice;

                        return React.createElement('div', { key: itemId, className: 'retro-list-item' },
                            React.createElement('div', { className: 'item-details' },
                                React.createElement('span', { className: 'item-name' }, item.label.toUpperCase()),
                                React.createElement('span', { className: 'item-meta' }, item.effect || "Material"),
                                React.createElement('span', { className: 'item-price' }, `${item.buyPrice}g`)
                            ),
                            React.createElement('button', {
                                className: 'retro-action-btn small',
                                disabled: !canAfford,
                                onClick: () => handleBuy(itemId)
                            }, "[ BUY ]")
                        );
                    })
                )
            ),

            React.createElement('style', null, `
                .retro-modal-box {
                    background: #000;
                    border: 2px solid var(--primary);
                    padding: 20px;
                    width: 600px;
                    max-width: 95vw;
                    height: 70vh;
                    display: flex; flex-direction: column;
                    color: var(--primary);
                    font-family: monospace;
                    box-shadow: 0 0 0 1000px rgba(0,0,0,0.8);
                }
                .retro-modal-header {
                    display: flex; justify-content: space-between; align-items: center;
                    border-bottom: 2px solid var(--border); padding-bottom: 15px; margin-bottom: 20px;
                }
                .retro-h2 { margin: 0; color: var(--primary); }
                .retro-close-btn { background: transparent; border: none; color: var(--danger); font-family: monospace; cursor: pointer; }
                
                .retro-content-area { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; }
                
                .store-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
                .retro-text { color: #ccc; }
                .highlight-text { color: #fdb931; font-weight: bold; }

                .retro-list-container { display: flex; flex-direction: column; gap: 10px; padding-bottom: 20px; }
                .retro-list-item { 
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 10px; border: 1px solid #333;
                }
                .item-details { display: flex; flex-direction: column; gap: 4px; }
                .item-name { color: #fff; font-weight: bold; }
                .item-meta { font-size: 0.8rem; color: #888; }
                .item-price { color: var(--accent); }

                .retro-action-btn.small {
                    background: transparent; border: 1px solid var(--primary);
                    color: var(--primary); padding: 5px 15px; cursor: pointer;
                    font-family: monospace;
                }
                .retro-action-btn.small:hover:not(:disabled) {
                    background: var(--primary); color: black;
                }
                .retro-action-btn.small:disabled {
                    border-color: #555; color: #555; cursor: not-allowed;
                }
            `)
        )
    );
};

export default GeneralStore;
