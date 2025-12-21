import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';

const MythicForge = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // Legendary/God-tier crafting recipes
    const mythicRecipes = [
        {
            id: 'excalibur',
            name: 'Excalibur',
            tier: 'Legendary',
            description: 'The sword of kings. Only the worthy may wield it.',
            materials: {
                mythril_blade: 1,
                dragon_scale: 10,
                demon_soul: 3,
                diamond: 5
            },
            goldCost: 50000,
            levelRequired: 50
        },
        {
            id: 'god_slayer',
            name: 'God Slayer',
            tier: 'God-Tier',
            description: 'A blade forged to slay gods themselves.',
            materials: {
                excalibur: 1,
                orichalcum: 20,
                demon_soul: 10,
                diamond_perfect: 3
            },
            goldCost: 500000,
            levelRequired: 80
        },
        {
            id: 'staff_of_eternity',
            name: 'Staff of Eternity',
            tier: 'Legendary',
            description: 'Contains infinite magical energy.',
            materials: {
                arch_mage_staff: 1,
                sapphire_flawless: 10,
                demon_soul: 5,
                mythril: 30
            },
            goldCost: 75000,
            levelRequired: 55
        },
        {
            id: 'heavens_arrow',
            name: "Heaven's Arrow",
            tier: 'Legendary',
            description: 'Never misses its mark.',
            materials: {
                elven_bow: 1,
                phoenix_feather: 5,
                demon_soul: 5,
                emerald_flawless: 10
            },
            goldCost: 60000,
            levelRequired: 52
        },
        {
            id: 'titan_armor',
            name: 'Titan Armor',
            tier: 'Legendary',
            description: 'Armor of the ancient titans.',
            materials: {
                dragon_mail: 1,
                adamantite: 50,
                demon_soul: 8,
                diamond: 10
            },
            goldCost: 90000,
            levelRequired: 60
        },
        {
            id: 'god_blade',
            name: "God's Blade",
            tier: 'God-Tier',
            description: 'Divine weapon of celestial beings.',
            materials: {
                god_slayer: 1,
                orichalcum: 100,
                demon_soul: 50,
                opal: 10
            },
            goldCost: 999999,
            levelRequired: 99
        }
    ];

    const inventory = state.player.inventory || [];

    const hasMaterials = (recipe) => {
        const materials = recipe.materials;
        return Object.entries(materials).every(([itemId, requiredCount]) => {
            const inventoryCount = inventory.filter(item => item.id === itemId).length;
            return inventoryCount >= requiredCount;
        });
    };

    const canCraft = (recipe) => {
        return state.player.level >= recipe.levelRequired &&
            state.player.gold >= recipe.goldCost &&
            hasMaterials(recipe);
    };

    const handleCraft = () => {
        if (!selectedRecipe) return;

        if (!canCraft(selectedRecipe)) {
            alert("Requirements not met!");
            return;
        }

        const confirm = window.confirm(
            `Craft ${selectedRecipe.name}?\n\nCost: ${selectedRecipe.goldCost}g\nThis will consume all materials.`
        );

        if (!confirm) return;

        // Remove materials from inventory
        let newInventory = [...inventory];
        Object.entries(selected Recipe.materials).forEach(([itemId, count]) => {
            let removed = 0;
            newInventory = newInventory.filter(item => {
                if (item.id === itemId && removed < count) {
                    removed++;
                    return false;
                }
                return true;
            });
        });

        // Add crafted item
        newInventory.push({ id: selectedRecipe.id, count: 1 });

        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: {
                ...state.player,
                inventory: newInventory,
                gold: state.player.gold - selectedRecipe.goldCost
            }
        });

        alert(`${selectedRecipe.name} crafted successfully!`);
        setSelectedRecipe(null);
    };

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'modal-content mythic-modal' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, "🔥 Mythic Forge"),
                React.createElement('button', { className: 'close-btn', onClick: onClose }, "CLOSE")
            ),

            React.createElement('div', { className: 'mythic-content' },
                React.createElement('p', { className: 'intro' },
                    "Forge legendary and god-tier equipment from the rarest materials. Only the most powerful adventurers dare attempt these crafts."
                ),

                React.createElement('div', { className: 'recipe-grid' },
                    mythicRecipes.map(recipe =>
                        React.createElement('div', {
                            key: recipe.id,
                            className: `recipe-card ${selectedRecipe === recipe ? 'selected' : ''} ${recipe.tier === 'God-Tier' ? 'god-tier' : 'legendary'}`,
                            onClick: () => setSelectedRecipe(recipe)
                        },
                            React.createElement('div', { className: 'recipe-header' },
                                React.createElement('h3', null, recipe.name),
                                React.createElement('span', { className: `tier-badge ${recipe.tier.toLowerCase().replace('-', '')}` },
                                    recipe.tier
                                )
                            ),
                            React.createElement('p', { className: 'recipe-desc' }, recipe.description),
                            React.createElement('div', { className: 'requirements' },
                                React.createElement('p', { className: 'level-req' },
                                    `Level Required: ${recipe.levelRequired}${state.player.level >= recipe.levelRequired ? ' ✓' : ' ✗'}`
                                ),
                                React.createElement('p', { className: 'gold-req' },
                                    `Cost: ${recipe.goldCost}g ${state.player.gold >= recipe.goldCost ? '✓' : '✗'}`
                                )
                            ),
                            React.createElement('div', { className: 'materials' },
                                React.createElement('p', { className: 'mat-header' }, "Materials:"),
                                Object.entries(recipe.materials).map(([itemId, count]) => {
                                    const has = inventory.filter(item => item.id === itemId).length;
                                    const enough = has >= count;
                                    return React.createElement('p', {
                                        key: itemId,
                                        className: `material ${enough ? 'has' : 'missing'}`
                                    }, `${itemId}: ${has}/${count} ${enough ? '✓' : '✗'}`);
                                })
                            )
                        )
                    )
                ),

                selectedRecipe && React.createElement('div', { className: 'craft-action' },
                    React.createElement('button', {
                        className: 'craft-btn',
                        onClick: handleCraft,
                        disabled: !canCraft(selectedRecipe)
                    }, `Forge ${selectedRecipe.name}`)
                )
            )
        ),

        React.createElement('style', null, `
      .mythic-modal { width: 900px; max-height: 90vh; }
      .mythic-content { padding: 25px; }
      .intro { text-align: center; color: var(--text-muted); margin-bottom: 25px; font-size: 1.05rem; }
      
      .recipe-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; margin-bottom: 25px; }
      .recipe-card { background: var(--bg-dark); border: 3px solid var(--border); border-radius: var(--radius-md); padding: 20px; cursor: pointer; transition: all 0.2s; position: relative; }
      .recipe-card:hover { border-color: var(--primary); transform: translateY(-3px); }
       .recipe-card.selected { border-color: #10b981; box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
      .recipe-card.legendary { border-color: #f59e0b; }
      .recipe-card.god-tier { border-color: #8b5cf6; background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%); }
      
      .recipe-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
      .recipe-header h3 { margin: 0; color: var(--primary); font-size: 1.2rem; }
      .tier-badge { padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; }
      .tier-badge.legendary { background: #f59e0b; color: white; }
      .tier-badge.godtier { background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: white; }
      
      .recipe-desc { color: var(--text-muted); font-size: 0.9rem; font-style: italic; margin-bottom: 15px; }
      
      .requirements { margin-bottom: 15px; padding: 10px; background: var(--bg-panel); border-radius: var(--radius-md); }
      .level-req, .gold-req { margin: 5px 0; color: var(--text-main); font-size: 0.9rem; }
      
      .materials { padding: 10px; background: var(--bg-panel); border-radius: var(--radius-md); }
      .mat-header { font-weight: bold; color: var(--accent); margin-bottom: 8px; }
      .material { margin: 3px 0; font-size: 0.85rem; }
      .material.has { color: #10b981; }
      .material.missing { color: #ef4444; }
      
      .craft-action { position: sticky; bottom: 0; background: var(--bg-main); padding-top: 20px; }
      .craft-btn { width: 100%; padding: 20px; background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%); color: white; border: none; border-radius: var(--radius-md); font-size: 1.3rem; font-weight: bold; cursor: pointer; transition: all 0.2s; text-transform: uppercase; letter-spacing: 1px; }
      .craft-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(245, 158, 11, 0.5); }
      .craft-btn:disabled { opacity: 0.3; cursor: not-allowed; background: var(--bg-dark); }
    `)
    );
};

export default MythicForge;
