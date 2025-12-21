import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';

// Clean entry point
const container = document.getElementById('root');
if (!container) {
    throw new Error("Fatal: Root element not found in DOM");
}

const root = createRoot(container);

// Render the application
// Using React.StrictMode for better development warnings
root.render(
    React.createElement(React.StrictMode, null,
        React.createElement(App)
    )
);
