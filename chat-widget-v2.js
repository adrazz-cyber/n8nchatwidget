// SEO it Right Chat Widget - Version 2
// Completely rewritten for better compatibility
(function() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initChatWidget();
    });
    
    // If DOM is already loaded, init immediately
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initChatWidget, 1);
    }
    
    function initChatWidget() {
        // Default configuration
        const defaultConfig = {
            webhook: {
                url: '',
                route: 'general'
            },
            branding: {
                logo: '',
                name: 'Chat Widget',
                welcomeText: 'Hi 👋, how can we help?',
                responseTimeText: 'We typically respond right away'
            },
            style: {
                primaryColor: '#3da5ae',
                secondaryColor: '#001d4c',
                position: 'right',
                backgroundColor: '#ffffff',
                fontColor: '#333333'
            }
        };
        
        // Get user config or use empty object if not defined
        const userConfig = window.ChatWidgetConfig || {};
        
        // Merge configurations
        const config = {
            webhook: { 
                url: userConfig.webhook?.url || defaultConfig.webhook.url,
                route: userConfig.webhook?.route || defaultConfig.webhook.route
            },
            branding: {
                logo: userConfig.branding?.logo || defaultConfig.branding.logo,
                name: userConfig.branding?.name || defaultConfig.branding.name,
                welcomeText: userConfig.branding?.welcomeText || defaultConfig.branding.welcomeText,
                responseTimeText: userConfig.branding?.responseTimeText || defaultConfig.branding.responseTimeText
            },
            style: {
                primaryColor: userConfig.style?.primaryColor || defaultConfig.style.primaryColor,
                secondaryColor: userConfig.style?.secondaryColor || defaultConfig.style.secondaryColor,
                position: userConfig.style?.position || defaultConfig.style.position,
                backgroundColor: userConfig.style?.backgroundColor || defaultConfig.style.backgroundColor,
                fontColor: userConfig.style?.fontColor || defaultConfig.style.fontColor
            }
        };
        
        // Create styles
        addStyles(config);
        
        // Create widget elements
        const elements = createWidgetElements(config);
        
        // Add event listeners
        addEventListeners(elements, config);
    }
    
    function addStyles(config) {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --chat-primary-color: ${config.style.primaryColor};
                --chat-secondary-color: ${config.style.secondaryColor};
                --chat-background-color: ${config.style.backgroundColor};
                --chat-font-color: ${config.style.fontColor};
            }
            
            .seo-chat-container {
                position: fixed;
                bottom: 20px;
                ${config.style.position}: 20px;
                z-index: 99999;
                font-family: Arial, sans-serif;
            }
            
            .seo-chat-button {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: var(--chat-primary-color);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
            }
            
            .seo-chat-button:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
            }
            
            .seo-chat-icon {
                font-size: 28px;
            }
            
            .seo-chat-window {
                position: fixed;
                bottom: 90px;
                ${config.style.position}: 20px;
                width: 350px;
                height: 500px;
                background-color: var(--chat-background-color);
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                transition: all 0.3s ease;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
            }
            
            .seo-chat-window.open {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .seo-chat-header {
                background-color: var(--chat-primary-color);
                color: white;
                padding: 15px;
                display: flex;
                align-items: center;
            }
            
            .seo-chat-logo {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 10px;
                object-fit: cover;
            }
            
            .seo-chat-title-container {
                flex: 1;
            }
            
            .seo-chat-title {
                font-weight: bold;
                margin: 0;
                padding: 0;
                font-size: 16px;
            }
            
            .seo-chat-subtitle {
                font-size: 12px;
                margin: 0;
                padding: 0;
                opacity: 0.8;
            }
            
            .seo-chat-close {
                cursor: pointer;
                font-size: 20px;
            }
            
            .seo-chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }
            
            .seo-chat-message {
                margin-bottom: 15px;
                max-width: 80%;
                padding: 10px 15px;
                border-radius: 18px;
                position: relative;
                clear: both;
                font-size: 14px;
                line-height: 1.4;
                word-break: break-word;
            }
            
            .seo-chat-message.bot {
                background-color: #f0f0f0;
                color: var(--chat-font-color);
                border-bottom-left-radius: 5px;
                align-self: flex-start;
            }
            
            .seo-chat-message.user {
                background-color: var(--chat-primary-color);
                color: white;
                border-bottom-right-radius: 5px;
                align-self: flex-end;
            }
            
            .seo-chat-input-container {
                padding: 15px;
                border-top: 1px solid #e0e0e0;
                display: flex;
                align-items: center;
            }
            
            .seo-chat-input {
                flex: 1;
                border: 1px solid #e0e0e0;
                border-radius: 18px;
                padding: 10px 15px;
                font-size: 14px;
                outline: none;
            }
            
            .seo-chat-send {
                background-color: var(--chat-primary-color);
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
            
            .seo-chat-send:hover {
                background-color: var(--chat-secondary-color);
            }
        `;
        document.head.appendChild(style);
    }

    function createWidgetElements(config) {
        // Create container
        const container = document.createElement('div');
        container.className = 'seo-chat-container';
        
        // Create chat button
        const button = document.createElement('div');
        button.className = 'seo-chat-button';
        button.innerHTML = '<span class="seo-chat-icon">💬</span>';
        
        // Create chat window
        const window = document.createElement('div');
        window.className = 'seo-chat-window';
        
        // Create header
        const header = document.createElement('div');
        header.className = 'seo-chat-header';
        
        const logo = document.createElement('img');
        logo.className = 'seo-chat-logo';
        logo.src = config.branding.logo;
        logo.alt = config.branding.name + ' logo';
        
        const titleContainer = document.createElement('div');
        titleContainer.className = 'seo-chat-title-container';
        
        const title = document.createElement('h3');
        title.className = 'seo-chat-title';
        title.textContent = config.branding.name;
        
        const subtitle = document.createElement('p');
        subtitle.className = 'seo-chat-subtitle';
        subtitle.textContent = config.branding.responseTimeText;
        
        const closeBtn = document.createElement('div');
        closeBtn.className = 'seo-chat-close';
        closeBtn.innerHTML = '&times;';
        
        titleContainer.appendChild(title);
        titleContainer.appendChild(subtitle);
        
        header.appendChild(logo);
        header.appendChild(titleContainer);
        header.appendChild(closeBtn);
        
        // Create messages container
        const messages = document.createElement('div');
        messages.className = 'seo-chat-messages';
        
        // Add welcome message
        if (config.branding.welcomeText) {
            const welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'seo-chat-message bot';
            welcomeMsg.textContent = config.branding.welcomeText;
            messages.appendChild(welcomeMsg);
        }
        
        // Create input container
        const inputContainer = document.createElement('div');
        inputContainer.className = 'seo-chat-input-container';
        
        const input = document.createElement('input');
        input.className = 'seo-chat-input';
        input.type = 'text';
        input.placeholder = 'Type a message...';
        
        const sendBtn = document.createElement('button');
        sendBtn.className = 'seo-chat-send';
        sendBtn.innerHTML = '&#10148;';
        
        inputContainer.appendChild(input);
        inputContainer.appendChild(sendBtn);
        
        // Assemble the window
        window.appendChild(header);
        window.appendChild(messages);
        window.appendChild(inputContainer);
        
        // Append everything to container
        container.appendChild(button);
        container.appendChild(window);
        
        // Add to document
        document.body.appendChild(container);
        
        return {
            container,
            button,
            window,
            messages,
            input,
            sendBtn,
            closeBtn
        };
    }
    
    function addEventListeners(elements, config) {
        // Toggle chat window
        elements.button.addEventListener('click', function() {
            elements.window.classList.toggle('open');
            if (elements.window.classList.contains('open')) {
                elements.input.focus();
            }
        });
        
        // Close chat window
        elements.closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            elements.window.classList.remove('open');
        });
        
        // Send message on button click
        elements.sendBtn.addEventListener('click', function() {
            sendMessage(elements, config);
        });
        
        // Send message on Enter
        elements.input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage(elements, config);
            }
        });
    }

    // Send message
    function sendMessage(elements, config) {
        const text = elements.input.value.trim();
        if (!text) return;
        
        // Clear input
        elements.input.value = '';
        
        // Add user message to chat
        addMessage(elements, text, 'user');
        
        // Send to webhook
        if (config.webhook.url) {
            fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: text,
                    route: config.webhook.route
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.message) {
                    addMessage(elements, data.message, 'bot');
                } else {
                    addMessage(elements, 'Sorry, I encountered an error processing your request.', 'bot');
                }
            })
            .catch(error => {
                console.error('Error sending message:', error);
                addMessage(elements, 'Sorry, I encountered an error. Please try again later.', 'bot');
            });
        } else {
            // No webhook URL configured
            addMessage(elements, 'Chat widget is not properly configured. Please set a webhook URL.', 'bot');
        }
    }
    
    // Add message to chat
    function addMessage(elements, text, type) {
        const message = document.createElement('div');
        message.className = `seo-chat-message ${type}`;
        message.textContent = text;
        
        elements.messages.appendChild(message);
        
        // Scroll to bottom
        elements.messages.scrollTop = elements.messages.scrollHeight;
    }
})();
