import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { ITEMS } from '../../data/items.js';

const FusionChamber = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const [slot1, setSlot1] = useState(null);
    const [slot2, setSlot2] = useState(null);
    const [fusionCost] = useState(5000);

    const inventory = state.player.inventory || [];

    // Fusion recipes (combine 2 items to create a new one)
    const fusionRecipes = [
        { items: ['iron_sword', 'iron_sword'], result: 'steel_sword', name: 'Steel Sword' },
        { items: ['steel_sword', 'mythril'], result: 'mythril_blade', name: 'Mythril Blade' },
        { items: ['mythril_blade', 'dragon_scale'], result: 'dragon_slayer', name: 'Dragon Slayer' },
        { items: ['ruby', 'ruby'], result: 'ruby_flawless', name: 'Flawless Ruby' },
        { items: ['sapphire', 'sapphire'], result: 'sapphire_flawless', name: 'Flawless Sapphire' },
        { items: ['emerald', 'emerald'], result: 'emerald_flawless', name: 'Flawless Emerald' },
        { items: ['diamond', 'diamond'], result: 'diamond_perfect', name: 'Perfect Diamond' },
        { items: ['potion_hp_sm', 'potion_hp_sm'], result: 'potion_hp_md', name: 'Health Potion' },
        { items: ['potion_hp_md', 'potion_hp_md'], result: 'potion_hp_lg', name: 'Greater Health Potion' },
        { items: ['iron_ore', 'iron_ore'], result: 'mythril', name: 'Mythril' },
        { items: ['mythril', 'mythril'], result: 'adamantite', name: 'Adamantite' },
        { items: ['adamantite', 'demon_soul'], result: 'orichalcum', name: 'Orichalcum' }
    ];

    const findRecipe = () => {
        if (!slot1 || !slot2) return null;

        return fusionRecipes.find(recipe =>
        (recipe.items.includes(slot1.id) && recipe.items.includes(slot2.id) &&
            (recipe.items[0] === slot1.id && recipe.items[1] === slot2.id ||
                recipe.items[0] === slot2.id && recipe.items[1] === slot1.id))
        );
    };

    const recipe = findRecipe();

    const handleFuse = () => {
        if (!recipe) {
            alert("No fusion recipe found for these items!");
            return;
        }

        if (state.player.gold < fusionCost) {
            alert(`Not enough gold! Fusion cost: ${fusionCost}g`);
            return;
        }

        // Remove items from inventory
        const newInventory = inventory.filter(item => item !== slot1 && item !== slot2);

        // Add result
        newInventory.push({ id: recipe.result, count: 1 });

        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: {
                ...state.player,
                inventory: newInventory,
                gold: state.player.gold - fusionCost
            }
        });

        alert(`Fusion successful! Created: ${recipe.name}`);
        setSlot1(null);
        setSlot2(null);
    };

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'modal-content fusion-modal' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, "⚗️ Fusion Chamber"),
                React.createElement('button', { className: 'close-btn', onClick: onClose }, "CLOSE")
            ),

            React.createElement('div', { className: 'fusion-content' },
                React.createElement('p', { className: 'intro' },
                    "Combine two items to create something more powerful! Some fusions require rare materials."
                ),

                React.createElement('div', { className: 'fusion-area' },
                    React.createElement('div', { className: 'fusion-slots' },
                        React.createElement('div', {
                            className: `fusion-slot ${slot1 ? 'filled' : 'empty'}`,
                            onClick: () => setSlot1(null)
                        },
                            slot1 ? React.createElement('span', null, ITEMS[slot1.id]?.label || slot1.id)
                                : React.createElement('span', { className: 'placeholder' }, "Click Item Below")
                        ),
                        React.createElement('div', { className: 'fusion-symbol' }, "+"),
                        React.createElement('div', {
                            className: `fusion-slot ${slot2 ? 'filled' : 'empty'}`,
                            onClick: () => setSlot2(null)
                        },
                            slot2 ? React.createElement('span', null, ITEMS[slot2.id]?.label || slot2.id)
                                : React.createElement('span', { className: 'placeholder' }, "Click Item Below")
                        ),
                        React.createElement('div', { className: 'fusion-symbol' }, "="),
                        React.createElement('div', { className: 'fusion-result' },
                            recipe
                                ? React.createElement('span', { className: 'result-name' }, recipe.name)
                                : React.createElement('span', { className: 'unknown' }, "???")
                        )
                    ),

                    React.createElement('button', {
                        className: 'fuse-btn',
                        onClick: handleFuse,
                        disabled: !recipe || state.player.gold < fusionCost
                    }, `Fuse Items (${fusionCost}g)`)
                ),

                React.createElement('div', { className: 'inventory-select' },
                    React.createElement('h3', null, "Select Items from Inventory"),
                    React.createElement('div', { className: 'item-grid' },
                        inventory.map((item, idx) =>
                            React.createElement('div', {
                                key: idx,
                                className: `item-card ${slot1 === item || slot2 === item ? 'selected' : ''}`,
                                onClick: () => {
                                    if (slot1 === item) { setSlot1(null); return; }
                                    if (slot2 === item) { setSlot2(null); return; }
                                    if (!slot1) setSlot1(item);
                                    else if (!slot2) setSlot2(item);
                                }
                            },
                                React.createElement('p', null, ITEMS[item.id]?.label || item.id)
                            )
                        )
                    ),
                    inventory.length === 0 && React.createElement('p', { className: 'no-items' },
                        "No items in inventory!"
                    )
                ),

                React.createElement('div', { className: 'recipe-hints' },
                    React.createElement('h3', null, "Known Recipes"),
                    React.createElement('div', { className: 'recipe-list' },
                        fusionRecipes.slice(0, 6).map((r, idx) =>
                            React.createElement('div', { key: idx, className: 'recipe-hint' },
                                `${ITEMS[r.items[0]]?.label || r.items[0]} + ${ITEMS[r.items[1]]?.label || r.items[1]} = ${r.name}`
                            )
                        ),
                        React.createElement('p', { className: 'more-recipes' }, "...and more to discover!")
                    )
                )
            )
        ),

        React.createElement('style', null, `
      .fusion-modal { width: 800px; max-height: 90vh; }
      .fusion-content { padding: 25px; }
      .intro { text-align: center; color: var(--text-muted); margin-bottom: 25px; }
      
      .fusion-area { background: var(--bg-dark); padding: 30px; border-radius: var(--radius-lg); margin-bottom: 25px; border: 2px solid var(--primary); }
      .fusion-slots { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 25px; }
      .fusion-slot { min-width: 150px; height: 80px; border: 3px dashed var(--border); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; background: var(--bg-panel); cursor: pointer; transition: all 0.2s; }
      .fusion-slot.filled { border-color: var(--primary); border-style: solid; background: rgba(139, 92, 246, 0.1); }
      .fusion-slot:hover { border-color: var(--accent); }
      .fusion-slot span { font-weight: bold; color: var(--text-main); }
      .fusion-slot .placeholder { color: var(--text-muted); font-size: 0.85rem; }
      
      .fusion-symbol { font-size: 2rem; font-weight: bold; color: var(--accent); }
      .fusion-result { min-width: 150px; height: 80px; border: 3px solid #10b981; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; background: rgba(16, 185, 129, 0.1); }
      .result-name { font-weight: bold; color: #10b981; font-size: 1.1rem; }
      .unknown { color: var(--text-muted); font-size: 1.5rem; }
      
      .fuse-btn { width: 100%; padding: 18px; background: linear-gradient(135deg, #8b5cf6 0%, #10b981 100%); color: white; border: none; border-radius: var(--radius-md); font-weight: bold; font-size: 1.2rem; cursor: pointer; transition: all 0.2s; }
      .fuse-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4); }
      .fuse-btn:disabled { opacity: 0.3; cursor: not-allowed; }
      
      .inventory-select { margin-bottom: 25px; }
      .inventory-select h3 { color: var(--primary); margin-bottom: 15px; }
      .item-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; max-height: 200px; overflow-y: auto; }
      .item-card { background: var(--bg-dark); border: 2px solid var(--border); border-radius: var(--radius-md); padding: 12px; text-align: center; cursor: pointer; transition: all 0.2s; }
      .item-card:hover { border-color: var(--primary); transform: scale(1.05); }
      .item-card.selected { border-color: #10b981; background: rgba(16, 185, 129, 0.1); }
      .item-card p { margin: 0; color: var(--text-main); font-size: 0.9rem; }
      .no-items { text-align: center; padding: 20px; color: var(--text-muted); font-style: italic; }
      
      .recipe-hints h3 { color: var(--accent); margin-bottom: 10px; }
      .recipe-list { background: var(--bg-panel); padding: 15px; border-radius: var(--radius-md); max-height: 150px; overflow-y: auto; }
      .recipe-hint { color: var(--text-muted); font-size: 0.85rem; margin: 5px 0; padding: 5px; border-left: 2px solid var(--primary); padding-left: 10px; }
      .more-recipes { margin-top: 10px; color: var(--accent); font-style: italic; font-size: 0.9rem; }
    `)
    );
};

export default FusionChamber;
