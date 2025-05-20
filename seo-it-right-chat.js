/**
 * SEO it Right Chat Widget
 * Based on the official n8n chat widget
 * Version: 1.0.0
 */

(function() {
    // Configuration
    const config = window.SEOitRightChatConfig || {
        // Required settings
        webhookUrl: 'YOUR_WEBHOOK_URL_HERE',
        
        // Branding
        title: 'SEO it Right Chat',
        subtitle: "We're here to help with your digital marketing needs.",
        footer: 'Powered by SEO it Right',
        getStarted: 'New Conversation',
        inputPlaceholder: 'Type your question..',
        
        // Initial messages
        initialMessages: [
            'Welcome to SEO it Right! 👋',
            'How can I help you today?'
        ],
        
        // Styling
        colors: {
            primary: '#3da5ae',
            secondary: '#001d4c',
            white: '#ffffff',
            light: '#f2f4f8',
            dark: '#101330',
        },
        
        // Widget settings
        showWelcomeScreen: true,
        windowWidth: '400px',
        windowHeight: '600px',
        position: 'right', // 'right' or 'left'
        
        // Advanced settings
        debug: false
    };

    // Load the n8n chat CSS
    function loadStyles() {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
        document.head.appendChild(linkElement);

        // Add custom styles based on configuration
        const customStyles = document.createElement('style');
        customStyles.textContent = `
            :root {
                --chat--color-primary: ${config.colors.primary};
                --chat--color-primary-shade-50: ${lightenDarkenColor(config.colors.primary, -10)};
                --chat--color-primary-shade-100: ${lightenDarkenColor(config.colors.primary, -20)};
                --chat--color-secondary: ${config.colors.secondary};
                --chat--color-secondary-shade-50: ${lightenDarkenColor(config.colors.secondary, -10)};
                --chat--color-secondary-shade-100: ${lightenDarkenColor(config.colors.secondary, -20)};
                --chat--color-white: ${config.colors.white || '#ffffff'};
                --chat--color-light: ${config.colors.light || '#f2f4f8'};
                --chat--color-dark: ${config.colors.dark || '#101330'};
                --chat--window--width: ${config.windowWidth};
                --chat--window--height: ${config.windowHeight};
                --chat--message--user--background: ${config.colors.primary};
                --chat--toggle--background: ${config.colors.primary};
                --chat--toggle--hover--background: ${lightenDarkenColor(config.colors.primary, -10)};
                --chat--toggle--active--background: ${lightenDarkenColor(config.colors.primary, -20)};
            }
            
            /* Positioning */
            .chat--toggle {
                ${config.position === 'left' ? 'left: 1rem; right: auto;' : 'right: 1rem; left: auto;'}
            }
            
            .chat--window {
                ${config.position === 'left' ? 'left: 1rem; right: auto;' : 'right: 1rem; left: auto;'}
            }
        `;
        document.head.appendChild(customStyles);
    }

    // Create and load the chat widget
    function initializeChat() {
        // Create target container if it doesn't exist
        let targetElement = document.getElementById('n8n-chat');
        if (!targetElement) {
            targetElement = document.createElement('div');
            targetElement.id = 'n8n-chat';
            document.body.appendChild(targetElement);
        }

        // Load the ES module script
        const script = document.createElement('script');
        script.type = 'module';
        script.textContent = `
            import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
            
            createChat({
                webhookUrl: '${config.webhookUrl}',
                initialMessages: ${JSON.stringify(config.initialMessages || [])},
                i18n: {
                    en: {
                        title: '${config.title || 'Chat'}',
                        subtitle: "${config.subtitle || ''}",
                        footer: '${config.footer || ''}',
                        getStarted: '${config.getStarted || 'New Conversation'}',
                        inputPlaceholder: '${config.inputPlaceholder || 'Type your question..'}',
                    }
                },
                showWelcomeScreen: ${config.showWelcomeScreen},
                metadata: {
                    source: 'SEO it Right Widget'
                }
            });
        `;
        
        document.body.appendChild(script);
    }

    // Helper function to lighten or darken a color
    function lightenDarkenColor(color, percent) {
        let R = parseInt(color.substring(1, 3), 16);
        let G = parseInt(color.substring(3, 5), 16);
        let B = parseInt(color.substring(5, 7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        R = Math.max(0, R).toString(16).padStart(2, '0');
        G = Math.max(0, G).toString(16).padStart(2, '0');
        B = Math.max(0, B).toString(16).padStart(2, '0');

        return `#${R}${G}${B}`;
    }

    // Debug logging
    function debugLog(...args) {
        if (config.debug) {
            console.log('[SEO it Right Chat]', ...args);
        }
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            debugLog('Initializing chat widget');
            loadStyles();
            initializeChat();
        });
    } else {
        debugLog('Initializing chat widget (DOM already loaded)');
        loadStyles();
        initializeChat();
    }
})();
