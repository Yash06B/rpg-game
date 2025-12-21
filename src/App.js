import React from 'react';
import { GameProvider, useGame } from './context/GameContext.js';
import CharacterCreation from './components/Character/CharacterCreation.js';
import TownInterface from './components/Town/TownInterface.js';
import CombatInterface from './components/Combat/CombatInterface.js';
import AdminPanel from './components/Admin/AdminPanel.js';
import EvolutionModal from './components/Character/EvolutionModal.js';
import QuestTracker from './components/Shared/QuestTracker.js';
import StoryModal from './components/Shared/StoryModal.js';
import VictoryScreen from './components/Shared/VictoryScreen.js';

import { ACHIEVEMENTS } from './data/achievements.js';

const GameContainer = () => {
    const { state } = useGame();

    import MainMenu from './components/MainMenu.js';
    import { ACHIEVEMENTS } from './data/achievements.js';

    const GameContainer = () => {
        const { state } = useGame();

        // View Router
        const renderView = () => {
            switch (state.system.view) {
                case 'main_menu': return React.createElement(MainMenu);
                case 'character_creation': return React.createElement(CharacterCreation);
                case 'town': return React.createElement(TownInterface);
                case 'combat': return React.createElement(CombatInterface);
                case 'admin': return React.createElement('div', null, "Admin View");
                default: return React.createElement('div', { className: 'error' }, "Unknown View: " + state.system.view);
            }
        };

        return React.createElement('div', { className: 'app-container' },
            renderView(),
            // Modular Overlays
            state.system.adminMode && React.createElement(AdminPanel),
            state.player.class && React.createElement(EvolutionModal),
            React.createElement(StoryModal), // Narrative Controller
            React.createElement(VictoryScreen), // Win State
            // Quest Tracker (shows in town/combat, not in char creation)
            state.system.view !== 'character_creation' && React.createElement(QuestTracker)
        );
    };



    const App = () => {
        return React.createElement(GameProvider, null,
            React.createElement(GameContainerWithAchievements)
        );
    };

    // Wrapper to allow useGame hook usage
    const GameContainerWithAchievements = () => {
        const { state, dispatch, ACTIONS } = useGame();

        // Global Achievement Check
        React.useEffect(() => {
            // Check all achievements
            Object.values(ACHIEVEMENTS).forEach(ach => {
                // If satisfied and not already unlocked
                if (ach.condition(state) && !(state.player.achievements || []).includes(ach.id)) {
                    dispatch({ type: ACTIONS.UNLOCK_ACHIEVEMENT, payload: ach.id });
                    // Could add a toast notification here
                    console.log(`Achievement Unlocked: ${ach.title}`);
                    // Simple toast system could go here

                    // Alert for impact (optional, might be annoying if too many at once)
                    // alert(`🏆 Achievement Unlocked: ${ach.title}\n${ach.description}`);
                }
            });
        }, [state.player, state.world, dispatch, ACTIONS]);

        return React.createElement(GameContainer);
    };

    export default App;
