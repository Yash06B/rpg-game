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
        // 1. Header is sticky top
        React.createElement('div', { className: 'town-header' },
            React.createElement('h1', null, town.name),
            React.createElement('p', { className: 'town-desc' }, town.description)
        ),

        // 2. Main Scrollable Area
        React.createElement('div', { className: 'town-content' },

            // Facilities Row
            React.createElement('div', { className: 'section-panel' },
                React.createElement('h3', { className: 'section-title' }, "Facilities"),
                React.createElement('div', { className: 'building-list' },
                    town.buildings.map(bKey => {
                        const b = BUILDINGS[bKey];
                        return React.createElement('button', {
                            key: bKey,
                            className: `building-btn ${b.action === 'UNIQUE' ? 'unique' : ''}`,
                            onClick: () => handleBuildingClick(bKey)
                        },
                            React.createElement('div', { className: 'b-icon' }, "🏛️"),
                            React.createElement('div', { className: 'b-info' },
                                React.createElement('span', { className: 'b-name' }, b.label),
                                React.createElement('span', { className: 'b-desc' }, b.description)
                            )
                        );
                    }),
                    // Quest Board Button
                    React.createElement('button', {
                        className: 'building-btn',
                        onClick: () => setShowQuestBoard(true)
                    },
                        React.createElement('div', { className: 'b-icon' }, "📋"),
                        React.createElement('div', { className: 'b-info' },
                            React.createElement('span', { className: 'b-name' }, "Quest Board"),
                            React.createElement('span', { className: 'b-desc' }, "Accept common quests")
                        )
                    )
                )
            ),

            // NPCs Row
            React.createElement('div', { className: 'section-panel' },
                React.createElement('h3', { className: 'section-title' }, "Inhabitants"),
                React.createElement(NPCList, null)
            )
        ),

        // 3. Bottom Action Bar (Fixed)
        React.createElement('div', { className: 'action-bar' },
            React.createElement('div', { className: 'player-mini-status' },
                React.createElement('span', { className: 'status-item' }, `${state.player.name} (Lv.${state.player.level})`),
                React.createElement('span', { className: 'status-item hp' }, `HP:${state.player.stats.hp}`),
                React.createElement('span', { className: 'status-item gold' }, `${state.player.gold}g`)
            ),

            React.createElement('div', { className: 'action-buttons' },
                React.createElement('button', { className: 'action-btn dungeon-btn', onClick: handleDungeon }, `⚔️ Enter ${town.dungeon}`),
                React.createElement('button', { className: 'action-btn', onClick: () => setShowInventory(true) }, "🎒 Inventory"),
                React.createElement('button', { className: 'action-btn', onClick: () => setShowQuestLog(true) }, "📜 Quest Log"),
                React.createElement('button', { className: 'action-btn', onClick: () => setShowAchievements(true) }, "🏆 Achievements"),
                React.createElement('button', { className: 'action-btn', onClick: () => setShowPassives(true) }, "✨ Skills"),
                React.createElement('button', { className: 'action-btn', onClick: () => alert("Map coming soon") }, "🗺️ Map")
            )
        ),

        // 4. Admin Toggle
        React.createElement('button', {
            className: 'admin-btn-trigger',
            onClick: () => {
                const code = prompt("Enter Admin Code:");
                if (code === 'yash') dispatch({ type: ACTIONS.ADMIN_TOGGLE, payload: true });
            }
        }, "⚙"),

        // 5. Modals
        showInventory && React.createElement(InventoryModal, { onClose: () => setShowInventory(false) }),
        showPassives && React.createElement(PassiveSkillManager, { onClose: () => setShowPassives(false) }),
        showQuestBoard && React.createElement(QuestBoard, { onClose: () => setShowQuestBoard(false) }),
        showQuestLog && React.createElement(QuestTracker, { onClose: () => setShowQuestLog(false) }),
        showAchievements && React.createElement(AchievementModal, { onClose: () => setShowAchievements(false) }),
        activeBuilding === 'blacksmith' && React.createElement(Blacksmith, { onClose: () => setActiveBuilding(null) }),
        activeBuilding === 'guild' && React.createElement(GuildHall, { onClose: () => setActiveBuilding(null) }),
        activeBuilding === 'training' && React.createElement(TrainingGrounds, { onClose: () => setActiveBuilding(null) }),

        // 6. STYLES
        React.createElement('style', null, `
            .town-container {
                height: 100vh;
                display: flex;
                flex-direction: column;
                background: linear-gradient(to bottom, #0f172a, #111827);
                color: #e2e8f0;
                overflow: hidden; /* Prevent body scroll */
            }

            .town-header {
                padding: 15px 20px;
                background: rgba(15, 23, 42, 0.95);
                border-bottom: 1px solid #334155;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                z-index: 10;
            }
            .town-header h1 { margin: 0; font-size: 1.5rem; color: #fbbf24; }
            .town-desc { margin: 5px 0 0; color: #94a3b8; font-size: 0.9rem; }

            /* Scrollable Content Area */
            .town-content {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .section-panel {
                background: rgba(30, 41, 59, 0.5);
                border-radius: 8px;
                padding: 15px;
                border: 1px solid #334155;
            }
            .section-title {
                margin: 0 0 15px 0;
                color: #cbd5e1;
                font-size: 1.1rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                border-bottom: 2px solid #475569;
                padding-bottom: 5px;
                display: inline-block;
            }

            /* Facilities Grid */
            .building-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 15px;
            }

            .building-btn {
                background: rgba(15, 23, 42, 0.6);
                border: 1px solid #475569;
                border-radius: 6px;
                padding: 12px;
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
                transition: all 0.2s;
                text-align: left;
            }
            .building-btn:hover {
                background: rgba(30, 41, 59, 0.9);
                border-color: #60a5fa;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }
            .building-btn.unique {
                border-color: #fbbf24;
                background: rgba(251, 191, 36, 0.1);
            }
            .b-icon { font-size: 1.5rem; }
            .b-info { display: flex; flex-direction: column; }
            .b-name { color: #f1f5f9; font-weight: bold; font-size: 1rem; }
            .b-desc { color: #94a3b8; font-size: 0.8rem; }

            /* Bottom Action Bar */
            .action-bar {
                background: rgba(15, 23, 42, 0.98);
                border-top: 1px solid #334155;
                padding: 10px 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.2);
            }
            .player-mini-status {
                display: flex;
                gap: 15px;
                color: #94a3b8;
                font-size: 0.9rem;
                border-bottom: 1px solid #334155;
                padding-bottom: 5px;
            }
            .status-item.hp { color: #ef4444; }
            .status-item.gold { color: #fbbf24; }

            .action-buttons {
                display: flex;
                gap: 10px;
                overflow-x: auto;
                padding-bottom: 5px; /* For scrollbar if needed */
            }
            .action-buttons::-webkit-scrollbar { height: 4px; }
            .action-buttons::-webkit-scrollbar-thumb { background: #475569; border-radius: 2px; }

            .action-btn {
                background: #334155;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 6px;
                cursor: pointer;
                white-space: nowrap;
                font-weight: 500;
                transition: background 0.2s;
            }
            .action-btn:hover { background: #475569; }
            .action-btn.dungeon-btn {
                background: #ef4444;
                box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
            }
            .action-btn.dungeon-btn:hover { background: #dc2626; }

            .admin-btn-trigger {
                position: fixed;
                bottom: 10px;
                right: 10px;
                opacity: 0.3;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
            }
            .admin-btn-trigger:hover { opacity: 1; }

            /* MOBILE RESPONSIVENESS */
            @media (max-width: 768px) {
                .town-header h1 { font-size: 1.2rem; }
                .town-desc { font-size: 0.8rem; }
                .town-content { padding: 10px; gap: 10px; }
                
                .building-list {
                    grid-template-columns: 1fr; /* Stack on very small screens */
                }
                
                .action-buttons {
                    flex-wrap: wrap;
                    justify-content: center;
                    overflow-x: visible; /* Remove scroll, allow wrap */
                }
                
                .action-btn {
                    flex: 1 0 40%; /* 2 buttons per row */
                    font-size: 0.9rem;
                    padding: 8px;
                    text-align: center;
                }
                
                .player-mini-status {
                    flex-wrap: wrap;
                    justify-content: center;
                    font-size: 0.8rem;
                }
            }
        `)
    );
};

export default TownInterface;
