import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';

const TimeVault = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const [saveSlots, setSaveSlots] = useState(() => {
        const saved = {};
        for (let i = 1; i <= 5; i++) {
            const slot = localStorage.getItem(`time_vault_slot_${i}`);
            if (slot) {
                try {
                    saved[i] = JSON.parse(slot);
                } catch (e) {
                    saved[i] = null;
                }
            }
        }
        return saved;
    });

    const handleSave = (slotNumber) => {
        const confirm = window.confirm(`Save current game to Slot ${slotNumber}?\n\nThis will overwrite any existing save in this slot.`);

        if (confirm) {
            const saveData = {
                ...state,
                timestamp: Date.now(),
                playerName: state.player.name,
                playerLevel: state.player.level,
                playerClass: state.player.class
            };

            localStorage.setItem(`time_vault_slot_${slotNumber}`, JSON.stringify(saveData));

            setSaveSlots(prev => ({
                ...prev,
                [slotNumber]: saveData
            }));

            alert(`Game saved to Slot ${slotNumber}!`);
        }
    };

    const handleLoad = (slotNumber) => {
        const saveData = saveSlots[slotNumber];
        if (!saveData) {
            alert("No save data in this slot!");
            return;
        }

        const confirm = window.confirm(
            `Load save from Slot ${slotNumber}?\n\n` +
            `${saveData.playerName} - Lv.${saveData.playerLevel} ${saveData.playerClass}\n` +
            `Saved: ${new Date(saveData.timestamp).toLocaleString()}\n\n` +
            `⚠️ Current progress will be replaced!`
        );

        if (confirm) {
            dispatch({
                type: ACTIONS.LOAD_STATE,
                payload: saveData
            });
            alert("Save loaded successfully!");
            onClose();
        }
    };

    const handleDelete = (slotNumber) => {
        const confirm = window.confirm(`Delete save in Slot ${slotNumber}?\n\nThis cannot be undone!`);

        if (confirm) {
            localStorage.removeItem(`time_vault_slot_${slotNumber}`);
            setSaveSlots(prev => ({
                ...prev,
                [slotNumber]: null
            }));
            alert(`Slot ${slotNumber} deleted.`);
        }
    };

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'modal-content vault-modal' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, "⏰ Time Vault"),
                React.createElement('button', { className: 'close-btn', onClick: onClose }, "CLOSE")
            ),

            React.createElement('div', { className: 'vault-content' },
                React.createElement('p', { className: 'intro' },
                    "The Time Vault allows you to save and load multiple game states. Preserve your progress across different timelines!"
                ),

                React.createElement('div', { className: 'save-slots' },
                    [1, 2, 3, 4, 5].map(slotNum => {
                        const saveData = saveSlots[slotNum];
                        const isEmpty = !saveData;

                        return React.createElement('div', { key: slotNum, className: 'save-slot' },
                            React.createElement('div', { className: 'slot-header' },
                                React.createElement('h3', null, `Slot ${slotNum}`),
                                !isEmpty && React.createElement('span', { className: 'timestamp' },
                                    new Date(saveData.timestamp).toLocaleDateString()
                                )
                            ),

                            isEmpty
                                ? React.createElement('div', { className: 'empty-slot' },
                                    React.createElement('p', null, "Empty Slot"),
                                    React.createElement('button', {
                                        className: 'save-btn',
                                        onClick: () => handleSave(slotNum)
                                    }, "Save Here")
                                )
                                : React.createElement('div', { className: 'filled-slot' },
                                    React.createElement('div', { className: 'save-info' },
                                        React.createElement('p', { className: 'char-name' }, saveData.playerName),
                                        React.createElement('p', { className: 'char-details' },
                                            `Lv.${saveData.playerLevel} ${saveData.playerClass}`
                                        ),
                                        React.createElement('p', { className: 'save-time' },
                                            new Date(saveData.timestamp).toLocaleString()
                                        )
                                    ),
                                    React.createElement('div', { className: 'slot-actions' },
                                        React.createElement('button', {
                                            className: 'load-btn',
                                            onClick: () => handleLoad(slotNum)
                                        }, "Load"),
                                        React.createElement('button', {
                                            className: 'overwrite-btn',
                                            onClick: () => handleSave(slotNum)
                                        }, "Overwrite"),
                                        React.createElement('button', {
                                            className: 'delete-btn',
                                            onClick: () => handleDelete(slotNum)
                                        }, "Delete")
                                    )
                                )
                        );
                    })
                ),

                React.createElement('div', { className: 'vault-info' },
                    React.createElement('h4', null, " Current Game"),
                    React.createElement('p', null, `${state.player.name} - Lv.${state.player.level} ${state.player.class}`),
                    React.createElement('p', { className: 'auto-save-note' },
                        "💾 Auto-save is always active. Use Time Vault for manual backups."
                    )
                )
            )
        ),

        React.createElement('style', null, `
      .vault-modal { width: 800px; max-height: 90vh; }
      .vault-content { padding: 25px; }
      .intro { text-align: center; color: var(--text-muted); margin-bottom: 25px; font-size: 1.05rem; }
      
      .save-slots { display: flex; flex-direction: column; gap: 15px; margin-bottom: 25px; }
      .save-slot { background: var(--bg-dark); border: 2px solid var(--border); border-radius: var(--radius-md); padding: 20px; transition: all 0.2s; }
      .save-slot:hover { border-color: var(--primary); }
      
      .slot-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
      .slot-header h3 { margin: 0; color: var(--accent); }
      .timestamp { color: var(--text-muted); font-size: 0.85rem; }
      
      .empty-slot { text-align: center; padding: 20px; }
      .empty-slot p { color: var(--text-muted); margin-bottom: 15px; font-style: italic; }
      .save-btn { padding: 12px 30px; background: var(--primary); color: white; border: none; border-radius: var(--radius-md); font-weight: bold; cursor: pointer; transition: all 0.2s; }
      .save-btn:hover { background: var(--accent); transform: translateY(-2px); }
      
      .filled-slot { display: flex; justify-content: space-between; align-items: center; }
      .save-info { flex: 1; }
      .char-name { font-size: 1.3rem; font-weight: bold; color: var(--primary); margin: 0 0 5px 0; }
      .char-details { color: var(--text-main); margin: 3px 0; }
      .save-time { color: var(--text-muted); font-size: 0.85rem; margin: 5px 0 0 0; }
      
      .slot-actions { display: flex; gap: 10px; }
      .load-btn, .overwrite-btn, .delete-btn { padding: 10px 20px; border: none; border-radius: var(--radius-md); font-weight: bold; cursor: pointer; transition: all 0.2s; }
      .load-btn { background: #10b981; color: white; }
      .load-btn:hover { background: #059669; transform: translateY(-2px); }
      .overwrite-btn { background: #f59e0b; color: white; }
      .overwrite-btn:hover { background: #d97706; transform: translateY(-2px); }
      .delete-btn { background: #ef4444; color: white; }
      .delete-btn:hover { background: #dc2626; transform: translateY(-2px); }
      
      .vault-info { background: var(--bg-panel); padding: 20px; border-radius: var(--radius-md); border-left: 4px solid var(--primary); }
      .vault-info h4 { margin: 0 0 10px 0; color: var(--primary); }
      .vault-info p { margin: 5px 0; color: var(--text-main); }
      .auto-save-note { margin-top: 10px; color: var(--text-muted); font-size: 0.9rem; font-style: italic; }
    `)
    );
};

export default TimeVault;
