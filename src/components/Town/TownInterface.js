import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { TOWNS, BUILDINGS } from '../../data/towns.js';
import InventoryModal from '../Shared/InventoryModal.js';
import Blacksmith from './Blacksmith.js';
import GuildHall from './GuildHall.js';
import PassiveSkillManager from '../Shared/PassiveSkillManager.js';
import QuestBoard from '../Shared/QuestBoard.js';
import QuestTracker from '../Shared/QuestTracker.js';
import AchievementModal from '../Shared/AchievementModal.js';
import NPCList from './NPCList.js';
import TrainingGrounds from '../UniqueBuildings/TrainingGrounds.js';

const TownInterface = () => {
    const { state, dispatch, ACTIONS } = useGame();
    const [showInventory, setShowInventory] = useState(false);
    const [showPassives, setShowPassives] = useState(false);
    const [showQuestBoard, setShowQuestBoard] = useState(false);
    const [showQuestLog, setShowQuestLog] = useState(false);
    const [showAchievements, setShowAchievements] = useState(false);
    const [activeBuilding, setActiveBuilding] = useState(null);

    // Safety check for location
    const currentTownId = (state.world && state.world.location) ? state.world.location : 'town_1';
    // Fallback if town ID is invalid (e.g. 'character_creation' view bug)
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
        // Top Status Bar (Always Visible)
        React.createElement('div', { className: 'retro-status-bar' },
            React.createElement('span', null, `HERO: ${state.player.name} [LVL ${state.player.level}]`),
            React.createElement('span', null, `HP: ${state.player.stats.hp}/${state.player.stats.maxHp}`),
            React.createElement('span', null, `GOLD: ${state.player.gold}g`),
            React.createElement('span', null, `LOC: ${town.name.toUpperCase()}`)
        ),

        // Main Text Output Area
        React.createElement('div', { className: 'town-content' },

            // Location Description
            React.createElement('div', { className: 'location-block' },
                React.createElement('h2', { className: 'retro-h2' }, `> YOU ARE IN ${town.name.toUpperCase()}.`),
                React.createElement('p', { className: 'retro-text' }, town.description),
                React.createElement('p', { className: 'retro-text' }, "Visible Exits: North (Blacksmith), East (Guild Hall), South (Forest).")
            ),

            // Facilities Command List
            React.createElement('div', { className: 'command-section' },
                React.createElement('h3', { className: 'retro-h3' }, "-- PLACES OF INTEREST --"),
                React.createElement('div', { className: 'command-list' },
                    town.buildings.map((bKey, index) => {
                        const b = BUILDINGS[bKey];
                        return React.createElement('button', {
                            key: bKey,
                            className: 'retro-command-btn',
                            onClick: () => handleBuildingClick(bKey)
                        }, `[ ${index + 1} ] ENTER ${b.label.toUpperCase()}`);
                    }),
                    React.createElement('button', {
                        className: 'retro-command-btn',
                        onClick: () => setShowQuestBoard(true)
                    }, `[ Q ] EXAMINE QUEST BOARD`)
                )
            ),

            // NPCs (Text List)
            React.createElement('div', { className: 'command-section' },
                React.createElement('h3', { className: 'retro-h3' }, "-- INHABITANTS --"),
                React.createElement(NPCList, null)
            ),

            // Actions
            React.createElement('div', { className: 'command-section' },
                React.createElement('h3', { className: 'retro-h3' }, "-- ACTIONS --"),
                React.createElement('div', { className: 'command-list' },
                    React.createElement('button', { className: 'retro-command-btn danger', onClick: handleDungeon }, `[ X ] ENTER ${town.dungeon.toUpperCase()}`),
                    React.createElement('button', { className: 'retro-command-btn', onClick: () => setShowInventory(true) }, "[ I ] INVENTORY"),
                    React.createElement('button', { className: 'retro-command-btn', onClick: () => setShowQuestLog(true) }, "[ L ] QUEST LOG"),
                    React.createElement('button', { className: 'retro-command-btn', onClick: () => setShowAchievements(true) }, "[ A ] ACHIEVEMENTS"),
                    React.createElement('button', { className: 'retro-command-btn', onClick: () => setShowPassives(true) }, "[ S ] SKILLS"),
                )
            )
        ),

        // Admin
        React.createElement('button', {
            className: 'admin-text-trigger',
            onClick: () => {
                const code = prompt("OVERRIDE CODE:");
                if (code === 'yash') dispatch({ type: ACTIONS.ADMIN_TOGGLE, payload: true });
            }
        }, "> ADMIN"),

        // Modals
        showInventory && React.createElement(InventoryModal, { onClose: () => setShowInventory(false) }),
        showPassives && React.createElement(PassiveSkillManager, { onClose: () => setShowPassives(false) }),
        showQuestBoard && React.createElement(QuestBoard, { onClose: () => setShowQuestBoard(false) }),
        showQuestLog && React.createElement(QuestTracker, { onClose: () => setShowQuestLog(false) }),
        showAchievements && React.createElement(AchievementModal, { onClose: () => setShowAchievements(false) }),
        activeBuilding === 'blacksmith' && React.createElement(Blacksmith, { onClose: () => setActiveBuilding(null) }),
        activeBuilding === 'guild' && React.createElement(GuildHall, { onClose: () => setActiveBuilding(null) }),
        activeBuilding === 'training' && React.createElement(TrainingGrounds, { onClose: () => setActiveBuilding(null) }),

        React.createElement('style', null, `
            .town-container {
                height: 100vh;
                display: flex;
                flex-direction: column;
                background: #000;
                color: var(--primary);
                font-family: monospace;
            }
            .retro-status-bar {
                display: flex;
                justify-content: space-between;
                padding: 10px;
                border-bottom: 2px solid var(--border);
                background: #000;
                font-weight: bold;
                flex-wrap: wrap;
                gap: 10px;
            }
            .town-content {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 30px;
            }
            .location-block {
                margin-bottom: 20px;
            }
            .retro-h2 {
                color: var(--primary);
                margin-bottom: 10px;
                font-size: 1.2rem;
            }
            .retro-text {
                color: var(--text-muted);
                margin-bottom: 10px;
                line-height: 1.5;
            }
            .retro-h3 {
                color: var(--accent);
                border-bottom: 1px dashed var(--accent);
                display: inline-block;
                margin-bottom: 15px;
            }
            .command-section {
                display: flex;
                flex-direction: column;
            }
            .command-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 10px;
            }
            .retro-command-btn {
                background: transparent;
                border: none;
                color: var(--primary);
                font-family: monospace;
                text-align: left;
                cursor: pointer;
                font-size: 1rem;
                padding: 5px;
            }
            .retro-command-btn:hover {
                background: var(--primary);
                color: #000;
            }
            .retro-command-btn.danger {
                color: var(--danger);
            }
            .retro-command-btn.danger:hover {
                background: var(--danger);
                color: #000;
            }
            .admin-text-trigger {
                position: fixed;
                bottom: 5px;
                right: 5px;
                background: none;
                border: none;
                color: #333;
                font-family: monospace;
                cursor: pointer;
            }
            .admin-text-trigger:hover { color: var(--primary); }
            
            @media (max-width: 600px) {
                .retro-status-bar { flex-direction: column; align-items: flex-start; gap: 5px; font-size: 0.9rem; }
            }
        `)
    );
};

export default TownInterface;
