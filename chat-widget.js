/**
 * n8n Chat Widget
 * A lightweight chat widget for connecting to n8n webhooks
 * Version: 1.0.0
 */

(function() {
    // Get configuration
    const config = window.ChatWidgetConfig || {};
    
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
    
    // Merge configurations
    const webhook = {
        url: config.webhook && config.webhook.url ? config.webhook.url : defaultConfig.webhook.url,
        route: config.webhook && config.webhook.route ? config.webhook.route : defaultConfig.webhook.route
    };
    
    const branding = {
        logo: config.branding && config.branding.logo ? config.branding.logo : defaultConfig.branding.logo,
        name: config.branding && config.branding.name ? config.branding.name : defaultConfig.branding.name,
        welcomeText: config.branding && config.branding.welcomeText ? config.branding.welcomeText : defaultConfig.branding.welcomeText,
        responseTimeText: config.branding && config.branding.responseTimeText ? config.branding.responseTimeText : defaultConfig.branding.responseTimeText
    };
    
    const style = {
        primaryColor: config.style && config.style.primaryColor ? config.style.primaryColor : defaultConfig.style.primaryColor,
        secondaryColor: config.style && config.style.secondaryColor ? config.style.secondaryColor : defaultConfig.style.secondaryColor,
        position: config.style && config.style.position ? config.style.position : defaultConfig.style.position,
        backgroundColor: config.style && config.style.backgroundColor ? config.style.backgroundColor : defaultConfig.style.backgroundColor,
        fontColor: config.style && config.style.fontColor ? config.style.fontColor : defaultConfig.style.fontColor
    };
    
    // Initialize session ID
    let sessionId = localStorage.getItem('chat_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('chat_session_id', sessionId);
    }
    
    // Create and add styles
    function addStyles() {
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        
        style.textContent = `
            .chat-widget-container {
                position: fixed;
                bottom: 20px;
                ${style.position === 'left' ? 'left: 20px;' : 'right: 20px;'}
                z-index: 999999;
                font-family: Arial, sans-serif;
            }
            
            .chat-widget-button {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: ${style.primaryColor};
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
            }
            
            .chat-widget-button:hover {
                background-color: ${style.secondaryColor};
            }
            
            .chat-widget-icon {
                font-size: 30px;
            }
            
            .chat-widget-window {
                position: fixed;
                bottom: 90px;
                ${style.position === 'left' ? 'left: 20px;' : 'right: 20px;'}
                width: 350px;
                height: 500px;
                background-color: ${style.backgroundColor};
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                display: none;
                flex-direction: column;
                overflow: hidden;
            }
            
            .chat-widget-window.open {
                display: flex;
            }
            
            .chat-widget-header {
                background-color: ${style.primaryColor};
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
            
            .chat-widget-title {
                flex: 1;
                font-size: 16px;
                font-weight: bold;
            }
            
            .chat-widget-close {
                cursor: pointer;
                font-size: 18px;
            }
            
            .chat-widget-body {
                flex: 1;
                padding: 10px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }
            
            .chat-widget-welcome {
                text-align: center;
                padding: 20px;
                color: ${style.fontColor};
            }
            
            .chat-widget-welcome-text {
                font-size: 14px;
                margin-bottom: 5px;
            }
            
            .chat-widget-response-time {
                font-size: 12px;
                color: #888;
            }
            
            .chat-widget-messages {
                display: flex;
                flex-direction: column;
            }
            
            .chat-widget-message {
                margin-bottom: 10px;
                padding: 10px;
                border-radius: 10px;
                max-width: 80%;
                word-wrap: break-word;
            }
            
            .chat-widget-message.bot {
                align-self: flex-start;
                background-color: #f0f0f0;
                color: ${style.fontColor};
            }
            
            .chat-widget-message.user {
                align-self: flex-end;
                background-color: ${style.primaryColor};
                color: white;
            }
            
            .chat-widget-footer {
                padding: 10px;
                border-top: 1px solid #e0e0e0;
                display: flex;
            }
            
            .chat-widget-input {
                flex: 1;
                padding: 10px;
                border: 1px solid #e0e0e0;
                border-radius: 20px;
                outline: none;
                font-size: 14px;
                color: ${style.fontColor};
            }
            
            .chat-widget-send {
                border: none;
                background-color: ${style.primaryColor};
                color: white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                margin-left: 10px;
                cursor: pointer;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .chat-widget-send:hover {
                background-color: ${style.secondaryColor};
            }
            
            .chat-widget-typing {
                align-self: flex-start;
                background-color: #f0f0f0;
                color: ${style.fontColor};
                padding: 10px;
                border-radius: 10px;
                margin-bottom: 10px;
                display: none;
            }
            
            .chat-widget-typing span {
                display: inline-block;
                width: 8px;
                height: 8px;
                background-color: #666;
                border-radius: 50%;
                animation: typing 1s infinite;
                margin-right: 3px;
            }
            
            .chat-widget-typing span:nth-child(2) {
                animation-delay: 0.2s;
            }
            
            .chat-widget-typing span:nth-child(3) {
                animation-delay: 0.4s;
                margin-right: 0;
            }
            
            @keyframes typing {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-5px);
                }
            }
        `;
        
        head.appendChild(style);
    }
    
    // Create DOM elements
    function createElements() {
        // Container
        const container = document.createElement('div');
        container.className = 'chat-widget-container';
        
        // Button
        const button = document.createElement('div');
        button.className = 'chat-widget-button';
        
        // Button Icon
        const icon = document.createElement('div');
        icon.className = 'chat-widget-icon';
        icon.innerHTML = '💬';
        
        // Window
        const window = document.createElement('div');
        window.className = 'chat-widget-window';
        
        // Header
        const header = document.createElement('div');
        header.className = 'chat-widget-header';
        
        // Logo (if provided)
        let logoElement = null;
        if (branding.logo) {
            logoElement = document.createElement('img');
            logoElement.className = 'chat-widget-logo';
            logoElement.src = branding.logo;
            logoElement.alt = branding.name + ' Logo';
        }
        
        // Title
        const title = document.createElement('div');
        title.className = 'chat-widget-title';
        title.textContent = branding.name;
        
        // Close button
        const close = document.createElement('div');
        close.className = 'chat-widget-close';
        close.innerHTML = '&times;';
        
        // Body
        const body = document.createElement('div');
        body.className = 'chat-widget-body';
        
        // Welcome message
        const welcome = document.createElement('div');
        welcome.className = 'chat-widget-welcome';
        
        const welcomeText = document.createElement('div');
        welcomeText.className = 'chat-widget-welcome-text';
        welcomeText.textContent = branding.welcomeText;
        
        const responseTime = document.createElement('div');
        responseTime.className = 'chat-widget-response-time';
        responseTime.textContent = branding.responseTimeText;
        
        // Messages container
        const messages = document.createElement('div');
        messages.className = 'chat-widget-messages';
        
        // Typing indicator
        const typing = document.createElement('div');
        typing.className = 'chat-widget-typing';
        typing.innerHTML = '<span></span><span></span><span></span>';
        
        // Footer
        const footer = document.createElement('div');
        footer.className = 'chat-widget-footer';
        
        // Input
        const input = document.createElement('input');
        input.className = 'chat-widget-input';
        input.type = 'text';
        input.placeholder = 'Type your message...';
        
        // Send button
        const send = document.createElement('button');
        send.className = 'chat-widget-send';
        send.innerHTML = '➤';
        
        // Assemble the elements
        button.appendChild(icon);
        
        if (logoElement) {
            header.appendChild(logoElement);
        }
        header.appendChild(title);
        header.appendChild(close);
        
        welcome.appendChild(welcomeText);
        welcome.appendChild(responseTime);
        
        body.appendChild(welcome);
        body.appendChild(messages);
        body.appendChild(typing);
        
        footer.appendChild(input);
        footer.appendChild(send);
        
        window.appendChild(header);
        window.appendChild(body);
        window.appendChild(footer);
        
        container.appendChild(button);
        container.appendChild(window);
        
        // Add to document
        document.body.appendChild(container);
        
        return {
            container,
            button,
            window,
            body,
            messages,
            input,
            send,
            typing
        };
    }
    
    // Add a message to the chat
    function addMessage(text, isUser) {
        const message = document.createElement('div');
        message.className = 'chat-widget-message ' + (isUser ? 'user' : 'bot');
        message.textContent = text;
        
        elements.messages.appendChild(message);
        elements.body.scrollTop = elements.body.scrollHeight;
    }
    
    // Show typing indicator
    function showTyping() {
        elements.typing.style.display = 'block';
        elements.body.scrollTop = elements.body.scrollHeight;
    }
    
    // Hide typing indicator
    function hideTyping() {
        elements.typing.style.display = 'none';
    }
    
    // Send message to webhook
    function sendMessage(text) {
        if (!webhook.url) {
            console.error('Webhook URL is not defined');
            addMessage('Error: Webhook URL is not configured.', false);
            return;
        }
        
        // Show typing indicator
        showTyping();
        
        // Prepare data
        const data = {
            message: text,
            session: sessionId,
            route: webhook.route
        };
        
        // Send request to webhook
        fetch(webhook.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            hideTyping();
            
            if (data && data.message) {
                addMessage(data.message, false);
            } else {
                addMessage('Sorry, I couldn\'t process your request.', false);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            hideTyping();
            addMessage('Sorry, I encountered an error. Please try again later.', false);
        });
    }
    
    // Add event listeners
    function addEventListeners(elements) {
        // Toggle chat window
        elements.button.addEventListener('click', () => {
            elements.window.classList.toggle('open');
        });
        
        // Close chat window
        elements.window.querySelector('.chat-widget-close').addEventListener('click', () => {
            elements.window.classList.remove('open');
        });
        
        // Send message on button click
        elements.send.addEventListener('click', () => {
            const text = elements.input.value.trim();
            if (text) {
                addMessage(text, true);
                elements.input.value = '';
                sendMessage(text);
            }
        });
        
        // Send message on Enter key
        elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const text = elements.input.value.trim();
                if (text) {
                    addMessage(text, true);
                    elements.input.value = '';
                    sendMessage(text);
                }
            }
        });
    }
    
    // Initialize the chat widget
    function init() {
        addStyles();
        const elements = createElements();
        addEventListeners(elements);
        
        // Store elements for later use
        window.chatWidgetElements = elements;
    }
    
    // Run initialization when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();