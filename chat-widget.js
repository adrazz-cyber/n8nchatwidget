// SEO it Right Chat Widget
// Created for Adam's n8nchatwidget project
(function() {
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

    // Merge default config with user config
    const config = window.ChatWidgetConfig || {};
    const mergedConfig = {
        webhook: { ...defaultConfig.webhook, ...config.webhook },
        branding: { ...defaultConfig.branding, ...config.branding },
        style: { ...defaultConfig.style, ...config.style }
    };
    // Create CSS styles
    const createStyles = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            :root {
                --primary-color: ${mergedConfig.style.primaryColor};
                --secondary-color: ${mergedConfig.style.secondaryColor};
                --background-color: ${mergedConfig.style.backgroundColor};
                --font-color: ${mergedConfig.style.fontColor};
            }
            
            .chat-widget-container {
                position: fixed;
                bottom: 20px;
                ${mergedConfig.style.position}: 20px;
                z-index: 9999;
                font-family: Arial, sans-serif;
            }
            
            .chat-widget-button {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: var(--primary-color);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
            }
            
            .chat-widget-button:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
            }
            
            .chat-widget-icon {
                font-size: 28px;
            }
            
            .chat-widget-window {
                position: fixed;
                bottom: 90px;
                ${mergedConfig.style.position}: 20px;
                width: 350px;
                height: 500px;
                background-color: var(--background-color);
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                transition: all 0.3s ease;
                opacity: 0;
                transform: translateY(20px);
                pointer-events: none;
            }
            
            .chat-widget-window.open {
                opacity: 1;
                transform: translateY(0);
                pointer-events: all;
            }
            
            .chat-widget-header {
                background-color: var(--primary-color);
                color: white;
                padding: 15px;
                display: flex;
                align-items: center;
            }
            
            .chat-widget-logo {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 10px;
                object-fit: cover;
            }
            
            .chat-widget-title-container {
                flex: 1;
            }
            
            .chat-widget-title {
                font-weight: bold;
                margin: 0;
                padding: 0;
                font-size: 16px;
            }
            
            .chat-widget-subtitle {
                font-size: 12px;
                margin: 0;
                padding: 0;
                opacity: 0.8;
            }
            
            .chat-widget-close {
                cursor: pointer;
                font-size: 20px;
            }
            
            .chat-widget-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }
            
            .chat-widget-message {
                margin-bottom: 15px;
                max-width: 80%;
                padding: 10px 15px;
                border-radius: 18px;
                position: relative;
                clear: both;
                font-size: 14px;
                line-height: 1.4;
            }
            
            .chat-widget-message.bot {
                background-color: #f0f0f0;
                color: var(--font-color);
                border-bottom-left-radius: 5px;
                align-self: flex-start;
            }
            
            .chat-widget-message.user {
                background-color: var(--primary-color);
                color: white;
                border-bottom-right-radius: 5px;
                align-self: flex-end;
            }
        `;
        document.head.appendChild(style);
    };
    
            .chat-widget-input-container {
                padding: 15px;
                border-top: 1px solid #e0e0e0;
                display: flex;
                align-items: center;
            }
            
            .chat-widget-input {
                flex: 1;
                border: 1px solid #e0e0e0;
                border-radius: 18px;
                padding: 10px 15px;
                font-size: 14px;
                outline: none;
            }
            
            .chat-widget-send {
                background-color: var(--primary-color);
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
            
            .chat-widget-send:hover {
                background-color: var(--secondary-color);
            }
        `;
        document.head.appendChild(style);
    };

    // Create the chat widget HTML
    const createWidget = () => {
        // Create container
        const container = document.createElement('div');
        container.className = 'chat-widget-container';
        
        // Create chat button
        const button = document.createElement('div');
        button.className = 'chat-widget-button';
        button.innerHTML = '<span class="chat-widget-icon">💬</span>';
        button.addEventListener('click', toggleChat);
        
        // Create chat window
        const window = document.createElement('div');
        window.className = 'chat-widget-window';
        
        // Create header
        const header = document.createElement('div');
        header.className = 'chat-widget-header';
        
        const logo = document.createElement('img');
        logo.className = 'chat-widget-logo';
        logo.src = mergedConfig.branding.logo;
        logo.alt = mergedConfig.branding.name + ' logo';
        
        const titleContainer = document.createElement('div');
        titleContainer.className = 'chat-widget-title-container';
        
        const title = document.createElement('h3');
        title.className = 'chat-widget-title';
        title.textContent = mergedConfig.branding.name;
        
        const subtitle = document.createElement('p');
        subtitle.className = 'chat-widget-subtitle';
        subtitle.textContent = mergedConfig.branding.responseTimeText;
        
        const closeBtn = document.createElement('div');
        closeBtn.className = 'chat-widget-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', toggleChat);
        
        titleContainer.appendChild(title);
        titleContainer.appendChild(subtitle);
        
        header.appendChild(logo);
        header.appendChild(titleContainer);
        header.appendChild(closeBtn);
        
        // Create messages container
        const messages = document.createElement('div');
        messages.className = 'chat-widget-messages';
        
        // Add welcome message
        if (mergedConfig.branding.welcomeText) {
            const welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'chat-widget-message bot';
            welcomeMsg.textContent = mergedConfig.branding.welcomeText;
            messages.appendChild(welcomeMsg);
        }
        
        // Create input container
        const inputContainer = document.createElement('div');
        inputContainer.className = 'chat-widget-input-container';
        
        const input = document.createElement('input');
        input.className = 'chat-widget-input';
        input.type = 'text';
        input.placeholder = 'Type a message...';
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        const sendBtn = document.createElement('button');
        sendBtn.className = 'chat-widget-send';
        sendBtn.innerHTML = '&#10148;';
        sendBtn.addEventListener('click', sendMessage);
        
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
            sendBtn
        };
    };

    // Toggle chat window
    const toggleChat = () => {
        elements.window.classList.toggle('open');
        if (elements.window.classList.contains('open')) {
            elements.input.focus();
        }
    };

    // Send message
    const sendMessage = async () => {
        const text = elements.input.value.trim();
        if (!text) return;
        
        // Clear input
        elements.input.value = '';
        
        // Add user message to chat
        addMessage(text, 'user');
        
        try {
            // Send to webhook
            const response = await fetch(mergedConfig.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: text,
                    route: mergedConfig.webhook.route
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            
            const data = await response.json();
            
            // Add bot response to chat
            if (data && data.message) {
                addMessage(data.message, 'bot');
            } else {
                addMessage('Sorry, I encountered an error processing your request.', 'bot');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
        }
    };
    
    // Add message to chat
    const addMessage = (text, type) => {
        const message = document.createElement('div');
        message.className = `chat-widget-message ${type}`;
        message.textContent = text;
        
        elements.messages.appendChild(message);
        
        // Scroll to bottom
        elements.messages.scrollTop = elements.messages.scrollHeight;
    };
    
    // Initialize the widget
    const init = () => {
        createStyles();
        elements = createWidget();
    };
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Store elements
    let elements = {};
})();
