import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { TOWNS, BUILDINGS } from '../../data/towns.js';
import InventoryModal from '../Shared/InventoryModal.js';
import Blacksmith from './Blacksmith.js';
import GuildHall from './GuildHall.js';
import PassiveSkillManager from '../Shared/PassiveSkillManager.js';
import QuestBoard from '../Quests/QuestBoard.js';
import QuestBoard from '../Quests/QuestBoard.js';
import AchievementModal from '../Shared/AchievementModal.js';
import NPCList from './NPCList.js';
import TrainingGrounds from '../UniqueBuildings/TrainingGrounds.js';

const TownInterface = () => {
    const { state, dispatch, ACTIONS } = useGame();
    const [showInventory, setShowInventory] = useState(false);
    const [showPassives, setShowPassives] = useState(false);
    const [showQuestBoard, setShowQuestBoard] = useState(false);
    const [showAchievements, setShowAchievements] = useState(false);
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

        if (bKey === 'guild') {
            setActiveBuilding('guild');
            return;
        }

        if (bKey === 'quest_board') {
            setShowQuestBoard(true);
            return;
        }

        if (bKey === 'training') {
            setActiveBuilding('training');
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
                    }),
                    // Add Quest Board button
                    React.createElement('button', {
                        className: 'building-btn',
                        onClick: () => setShowQuestBoard(true)
                    },
                        React.createElement('span', { className: 'b-name' }, "📋 Quest Board"),
                        React.createElement('span', { className: 'b-desc' }, "Accept common quests")
                    )
                )
            )
        )
    ),

        // NPCs Panel (New)
        React.createElement('div', { className: 'npcs-container', style: { gridRow: 'span 2' } },
            React.createElement(NPCList, null)
        ),

        // Actions Panel
        React.createElement('div', { className: 'actions-panel' },
            React.createElement('div', { className: 'player-card' },
                React.createElement('h3', null, state.player.name),
                React.createElement('p', null, `Lv. ${state.player.level} ${state.player.race} ${state.player.class}`),
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
                React.createElement('button', {
                    className: 'action-btn',
                    onClick: () => setShowInventory(true)
                }, "Inventory / Bag"),

                React.createElement('button', {
                    className: 'action-btn',
                    onClick: () => setShowAchievements(true)
                }, "🏆 Achievements"),

                React.createElement('button', {
                    className: 'action-btn passive-btn',
                    onClick: () => setShowPassives(true)
                }, "Passive Skills"),

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
        showPassives && React.createElement(PassiveSkillManager, { onClose: () => setShowPassives(false) }),
        showQuestBoard && React.createElement(QuestBoard, { onClose: () => setShowQuestBoard(false) }),
        showAchievements && React.createElement(AchievementModal, { onClose: () => setShowAchievements(false) }),
        activeBuilding === 'blacksmith' && React.createElement(Blacksmith, { onClose: () => setActiveBuilding(null) }),
        activeBuilding === 'guild' && React.createElement(GuildHall, { onClose: () => setActiveBuilding(null) }),
        activeBuilding === 'training' && React.createElement(TrainingGrounds, { onClose: () => setActiveBuilding(null) })
    );
};

export default TownInterface;
