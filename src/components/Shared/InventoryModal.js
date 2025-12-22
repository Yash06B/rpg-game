import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { ITEMS } from '../../data/items.js';

const InventoryModal = ({ onClose }) => {
  const { state } = useGame();

  // Aggregate items (GameContext stores as array of objects or just list? 
  // Reducer checks: currently 'inventory' is empty array.
  // We need to assume inventory is [{ id: 'iron_ore', count: 5 }]
  const inventory = state.player.inventory;

  return React.createElement('div', { className: 'modal-overlay fade-in' },
    React.createElement('div', { className: 'retro-modal-box' },
      React.createElement('div', { className: 'retro-modal-header' },
        React.createElement('h2', { className: 'retro-h2' }, "> INVENTORY DATABASE"),
        React.createElement('button', { className: 'retro-close-btn', onClick: onClose }, "[ X ] CLOSE")
      ),

      React.createElement('div', { className: 'retro-list-container' },
        inventory.length === 0
          ? React.createElement('p', { className: 'retro-text' }, "> STORAGE EMPTY.")
          : inventory.map((item, idx) => {
            const itemData = ITEMS[item.id] || { label: item.id, type: 'unknown' };
            return React.createElement('div', { key: idx, className: 'retro-list-item' },
              React.createElement('span', { className: 'item-name' }, `[ ${idx + 1} ] ${itemData.label.toUpperCase()}`),
              React.createElement('span', { className: 'item-count' }, `x${item.count}`)
            );
          })
      )
    ),
    React.createElement('style', null, `
      .modal-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .retro-modal-box {
        background: #000;
        border: 2px solid var(--primary);
        padding: 20px;
        width: 600px;
        max-width: 95vw;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 0 1000px rgba(0,0,0,0.8); /* Focus attention */
      }
      .retro-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 1px dashed var(--border);
        padding-bottom: 10px;
      }
      .retro-h2 {
        color: var(--primary);
        margin: 0;
      }
      .retro-close-btn {
        background: transparent;
        border: none;
        color: var(--danger);
        font-family: monospace;
        cursor: pointer;
        font-size: 1.1rem;
      }
      .retro-close-btn:hover {
        background: var(--danger);
        color: #000;
      }
      .retro-list-container {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding-right: 10px;
      }
      .retro-list-item {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        border: 1px solid transparent;
        cursor: pointer;
      }
      .retro-list-item:hover {
        border-color: var(--primary);
        background: rgba(51, 255, 0, 0.1);
      }
      .item-name { color: var(--primary); }
      .item-count { color: var(--accent); }
      .retro-text { color: var(--text-muted); font-style: italic; }
    `)
  );
};

export default InventoryModal;
