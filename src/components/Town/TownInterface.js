import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { TOWNS, BUILDINGS } from '../../data/towns.js';
import InventoryModal from '../Shared/InventoryModal.js';
import Blacksmith from './Blacksmith.js';

const TownInterface = () => {
    const { state, dispatch, ACTIONS } = useGame();
    const [showInventory, setShowInventory] = useState(false);
    const [activeBuilding, setActiveBuilding] = useState(null);

    const currentTownId = state.world.location === 'town_1' ? 'town_1' : state.world.location;
    const town = TOWNS[currentTownId] || TOWNS.town_1;

    const handleBuildingClick = (bKey) => {
        const building = BUILDINGS[bKey];
        console.log(`Entering ${building.label}`);

        if (bKey === 'blacksmith') {
            setActiveBuilding('blacksmith');
            return;
        }

        // Default fallback
        alert(`Entered ${building.label}. (Feature coming soon)`);
    };

    const handleDungeon = () => {
        dispatch({ type: ACTIONS.NAVIGATE, payload: 'combat' });
    };

    return React.createElement('div', { className: 'town-container fade-in' },
        // Header
        React.createElement('div', { className: 'town-header' },
            React.createElement('h1', null, town.name),
            React.createElement('p', { className: 'town-desc' }, town.description)
        ),

        // Content Grid
        React.createElement('div', { className: 'town-grid' },
            // Buildings List
            React.createElement('div', { className: 'buildings-panel' },
                React.createElement('h3', null, "Facilities"),
                React.createElement('div', { className: 'building-list' },
                    town.buildings.map(bKey => {
                        const b = BUILDINGS[bKey];
                        return React.createElement('button', {
                            key: bKey,
                            className: `building-btn ${b.action === 'UNIQUE' ? 'unique' : ''}`,
                            onClick: () => handleBuildingClick(bKey)
                        },
                            React.createElement('span', { className: 'b-name' }, b.label),
                            React.createElement('span', { className: 'b-desc' }, b.description)
                        );
                    })
                )
            ),

            // Actions Panel
            React.createElement('div', { className: 'actions-panel' },
                React.createElement('div', { className: 'player-card' },
                    React.createElement('h3', null, state.player.name),
                    React.createElement('p', null, `Lv. ${state.player.level} ${state.player.class}`),
                    React.createElement('div', { className: 'stat-bar hp' }, `HP: ${state.player.stats.hp}/${state.player.stats.maxHp}`),
                    React.createElement('div', { className: 'stat-bar mp' }, `MP: ${state.player.stats.mp}/${state.player.stats.maxMp}`),
                    React.createElement('p', { style: { color: '#fbbf24', marginTop: '10px' } }, `Gold: ${state.player.gold}g`)
                ),

                React.createElement('button', {
                    className: 'action-btn dungeon-btn',
                    onClick: handleDungeon
                }, `Enter ${town.dungeon}`),

                React.createElement('button', {
                    className: 'action-btn',
                    onClick: () => setShowInventory(true)
                }, "Inventory / Bag"),

                React.createElement('button', {
                    className: 'action-btn map-btn',
                    onClick: () => alert("World Map coming soon")
                }, "Open World Map")
            )
        ),

        // Admin Button
        React.createElement('button', {
            className: 'admin-btn-trigger',
            onClick: () => {
                const code = prompt("Enter Admin Code:");
                if (code === 'yash') dispatch({ type: ACTIONS.ADMIN_TOGGLE, payload: true });
            }
        }, "⚙"),

        // Modals
        showInventory && React.createElement(InventoryModal, { onClose: () => setShowInventory(false) }),
        activeBuilding === 'blacksmith' && React.createElement(Blacksmith, { onClose: () => setActiveBuilding(null) })
    );
};

export default TownInterface;
