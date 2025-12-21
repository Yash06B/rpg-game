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
    React.createElement('div', { className: 'modal-content' },
      React.createElement('div', { className: 'modal-header' },
        React.createElement('h2', null, "Inventory"),
        React.createElement('button', { className: 'close-btn', onClick: onClose }, "X")
      ),

      React.createElement('div', { className: 'inv-grid' },
        inventory.length === 0
          ? React.createElement('p', { style: { gridColumn: '1/-1', textAlign: 'center', color: '#666' } }, "Inventory Empty")
          : inventory.map((item, idx) => {
            const itemData = ITEMS[item.id] || { label: item.id, type: 'unknown' };
            return React.createElement('div', { key: idx, className: 'inv-slot' },
              React.createElement('div', { className: 'inv-icon' }, itemData.label[0]),
              React.createElement('div', { className: 'inv-info' },
                React.createElement('span', { className: 'inv-name' }, itemData.label),
                React.createElement('span', { className: 'inv-count' }, `x${item.count}`)
              )
            );
          })
      )
    ),
    React.createElement('style', null, `
      .modal-content {
        background: var(--bg-card);
        padding: 20px;
        width: 500px;
        border-radius: var(--radius-lg);
        border: 1px solid var(--border);
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      }
      .modal-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        border-bottom: 1px solid var(--border);
        padding-bottom: 10px;
      }
      .inv-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: 10px;
        overflow-y: auto;
        flex: 1;
        padding-bottom: 60px; /* Extra spacing */
      }
      .inv-slot {
        background: var(--bg-dark);
        padding: 10px;
        border-radius: var(--radius-md);
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid var(--border);
      }
      .inv-icon {
        font-size: 1.5rem;
        margin-bottom: 5px;
      }
      .inv-name { font-size: 0.8rem; text-align: center; }
      .inv-count { color: var(--accent); font-size: 0.9rem; font-weight: bold; }
    `)
  );
};

export default InventoryModal;
