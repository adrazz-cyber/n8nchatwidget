// SEO it Right Chat Widget - Version 5 (n8n Chat compatible)
// Specifically designed to work with n8n webhooks
(function() {
    // Initialize when document is loaded
    document.addEventListener('DOMContentLoaded', initN8nWidget);
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initN8nWidget, 1);
    }
    
    function initN8nWidget() {
        console.log("Initializing SEO it Right Chat Widget v5 (n8n compatible)");
        
        // Get configuration
        var userConfig = window.ChatWidgetConfig || {};
        var config = {
            webhook: {
                url: userConfig.webhook && userConfig.webhook.url ? userConfig.webhook.url : '',
                route: userConfig.webhook && userConfig.webhook.route ? userConfig.webhook.route : 'general'
            },
            branding: {
                logo: userConfig.branding && userConfig.branding.logo ? userConfig.branding.logo : '',
                name: userConfig.branding && userConfig.branding.name ? userConfig.branding.name : 'Chat Widget',
                welcomeText: userConfig.branding && userConfig.branding.welcomeText ? userConfig.branding.welcomeText : 'Hi 👋, how can we help?',
                responseTimeText: userConfig.branding && userConfig.branding.responseTimeText ? userConfig.branding.responseTimeText : 'We typically respond right away'
            },
            style: {
                primaryColor: userConfig.style && userConfig.style.primaryColor ? userConfig.style.primaryColor : '#3da5ae',
                secondaryColor: userConfig.style && userConfig.style.secondaryColor ? userConfig.style.secondaryColor : '#001d4c',
                position: userConfig.style && userConfig.style.position ? userConfig.style.position : 'right',
                backgroundColor: userConfig.style && userConfig.style.backgroundColor ? userConfig.style.backgroundColor : '#ffffff',
                fontColor: userConfig.style && userConfig.style.fontColor ? userConfig.style.fontColor : '#333333'
            }
        };
        
        // Generate a session ID if not already in localStorage
        if (!localStorage.getItem('n8n_chat_session_id')) {
            localStorage.setItem('n8n_chat_session_id', 'session_' + Math.random().toString(36).substring(2, 15));
        }
        
        // Add styles
        addN8nStyles(config);
        
        // Create elements
        var elements = createN8nElements(config);
        
        // Add event listeners
        setupN8nEventListeners(elements, config);
    }
    
    function addN8nStyles(config) {
        var style = document.createElement('style');
        style.textContent = `
            .n8n-chat-container {
                position: fixed;
                bottom: 20px;
                ${config.style.position}: 20px;
                z-index: 99999;
                font-family: Arial, sans-serif;
            }
            
            .n8n-chat-button {
                width: 65px;
                height: 65px;
                border-radius: 50%;
                background-color: ${config.style.primaryColor};
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
            }
            
            .n8n-chat-icon {
                font-size: 32px;
            }
            
            .n8n-chat-window {
                position: fixed;
                bottom: 90px;
                ${config.style.position}: 20px;
                width: 400px;
                height: 600px;
                background-color: ${config.style.backgroundColor};
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                display: none;
                flex-direction: column;
                overflow: hidden;
            }
            
            .n8n-chat-window.open {
                display: flex;
            }
            
            .n8n-chat-header {
                background-color: ${config.style.primaryColor};
                color: white;
                padding: 18px;
                display: flex;
                align-items: center;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .n8n-chat-logo {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                margin-right: 12px;
                object-fit: cover;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .n8n-chat-title {
                flex: 1;
                font-weight: bold;
                font-size: 18px;
                margin: 0;
            }
            
            .n8n-chat-close {
                cursor: pointer;
                font-size: 20px;
            }
            
            .n8n-chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }
            
            .n8n-chat-message {
                margin-bottom: 15px;
                max-width: 85%;
                padding: 12px;
                border-radius: 18px;
                font-size: 15px;
                line-height: 1.5;
            }
            
            .n8n-chat-message.bot {
                background-color: #f0f0f0;
                color: ${config.style.fontColor};
                border-bottom-left-radius: 5px;
                align-self: flex-start;
            }
            
            .n8n-chat-message.user {
                background-color: ${config.style.primaryColor};
                color: white;
                border-bottom-right-radius: 5px;
                align-self: flex-end;
            }
            
            .n8n-chat-form {
                padding: 15px;
                border-top: 1px solid #e0e0e0;
                display: flex;
                align-items: center;
            }
            
            .n8n-chat-input {
                flex: 1;
                padding: 12px;
                border: 1px solid #e0e0e0;
                border-radius: 18px;
                font-size: 15px;
                outline: none;
            }
            
            .n8n-chat-send {
                background-color: ${config.style.primaryColor};
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                margin-left: 10px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .n8n-chat-new-conversation {
                text-align: center;
                margin-top: 15px;
            }
            
            .n8n-chat-new-conversation-btn {
                background-color: transparent;
                color: ${config.style.primaryColor};
                border: 1px solid ${config.style.primaryColor};
                border-radius: 18px;
                padding: 8px 15px;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .n8n-chat-new-conversation-btn:hover {
                background-color: ${config.style.primaryColor};
                color: white;
            }
        `;
        document.head.appendChild(style);
    }
