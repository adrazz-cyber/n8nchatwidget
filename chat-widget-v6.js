// SEO it Right Chat Widget - n8n Webhook Compatible Version
// Version 6.0
(function() {
    // Initialize when document is loaded
    document.addEventListener('DOMContentLoaded', initWidget);
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initWidget, 1);
    }
    
    function initWidget() {
        console.log("Initializing SEO it Right Chat Widget v6");
        
        // Get configuration
        var userConfig = window.ChatWidgetConfig || {};
        var config = {
            webhook: {
                url: userConfig.webhook && userConfig.webhook.url ? userConfig.webhook.url : '',
                chatInputKey: userConfig.webhook && userConfig.webhook.chatInputKey ? userConfig.webhook.chatInputKey : 'chatInput',
                sessionIdKey: userConfig.webhook && userConfig.webhook.sessionIdKey ? userConfig.webhook.sessionIdKey : 'sessionId'
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
            },
            debug: userConfig.debug === true
        };
        
        // Generate a session ID if not already in localStorage
        if (!localStorage.getItem('sir_chat_session')) {
            localStorage.setItem('sir_chat_session', 'session_' + Math.random().toString(36).substring(2, 15));
        }
        
        // Add styles
        addStyles(config);
        
        // Create elements
        var elements = createElements(config);
        
        // Add event listeners
        setupEventListeners(elements, config);
        
        // Log initialization complete
        log("Chat widget initialized", config);
    }
    
    // Logging function
    function log(message, data) {
        if (window.ChatWidgetConfig && window.ChatWidgetConfig.debug) {
            console.log("[SEO it Right Chat]", message, data || '');
        }
    }
    
    function addStyles(config) {
        var style = document.createElement('style');
        style.textContent = `
            .sir-chat-container {
                position: fixed;
                bottom: 20px;
                ${config.style.position}: 20px;
                z-index: 99999;
                font-family: Arial, sans-serif;
            }
            
            .sir-chat-button {
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
            
            .sir-chat-icon {
                font-size: 32px;
            }
            
            .sir-chat-window {
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
            
            .sir-chat-window.open {
                display: flex;
            }
            
            .sir-chat-header {
                background-color: ${config.style.primaryColor};
                color: white;
                padding: 18px;
                display: flex;
                align-items: center;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .sir-chat-logo {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                margin-right: 12px;
                object-fit: cover;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .sir-chat-title {
                flex: 1;
                font-weight: bold;
                font-size: 18px;
                margin: 0;
            }
            
            .sir-chat-close {
                cursor: pointer;
                font-size: 20px;
            }
            
            .sir-chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }
            
            .sir-chat-message {
                margin-bottom: 15px;
                max-width: 85%;
                padding: 12px;
                border-radius: 18px;
                font-size: 15px;
                line-height: 1.5;
            }
            
            .sir-chat-message.bot {
                background-color: #f0f0f0;
                color: ${config.style.fontColor};
                border-bottom-left-radius: 5px;
                align-self: flex-start;
            }
            
            .sir-chat-message.user {
                background-color: ${config.style.primaryColor};
                color: white;
                border-bottom-right-radius: 5px;
                align-self: flex-end;
            }
            
            .sir-chat-form {
                padding: 15px;
                border-top: 1px solid #e0e0e0;
                display: flex;
                align-items: center;
            }
            
            .sir-chat-input {
                flex: 1;
                padding: 12px;
                border: 1px solid #e0e0e0;
                border-radius: 18px;
                font-size: 15px;
                outline: none;
            }
            
            .sir-chat-send {
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
            
            .sir-chat-new-conversation {
                text-align: center;
                margin-top: 15px;
            }
            
            .sir-chat-new-conversation-btn {
                background-color: transparent;
                color: ${config.style.primaryColor};
                border: 1px solid ${config.style.primaryColor};
                border-radius: 18px;
                padding: 8px 15px;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .sir-chat-new-conversation-btn:hover {
                background-color: ${config.style.primaryColor};
                color: white;
            }
        `;
        document.head.appendChild(style);
    }
    
    function createElements(config) {
        // Create container
        var container = document.createElement('div');
        container.className = 'sir-chat-container';
        
        // Create button
        var button = document.createElement('div');
        button.className = 'sir-chat-button';
        button.innerHTML = '<span class="sir-chat-icon">💬</span>';
        
        // Create window
        var window = document.createElement('div');
        window.className = 'sir-chat-window';
        
        // Create header
        var header = document.createElement('div');
        header.className = 'sir-chat-header';
        
        var headerContent = '';
        
        // Add logo if provided
        if (config.branding.logo) {
            headerContent += `<img src="${config.branding.logo}" alt="${config.branding.name}" class="sir-chat-logo">`;
        }
        
        headerContent += `
            <h3 class="sir-chat-title">${config.branding.name}</h3>
            <div class="sir-chat-close">&times;</div>
        `;
        
        header.innerHTML = headerContent;
        
        // Create messages area
        var messagesArea = document.createElement('div');
        messagesArea.className = 'sir-chat-messages';
        
        // Add welcome message
        if (config.branding.welcomeText) {
            var welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'sir-chat-message bot';
            welcomeMsg.textContent = config.branding.welcomeText;
            messagesArea.appendChild(welcomeMsg);
        }
        
        // Create form
        var form = document.createElement('form');
        form.className = 'sir-chat-form';
        form.onsubmit = function(e) { 
            e.preventDefault(); 
            return false; 
        };
        
        form.innerHTML = `
            <input type="text" class="sir-chat-input" placeholder="Type a message...">
            <button type="button" class="sir-chat-send">&#10148;</button>
        `;
        
        // Create new conversation button
        var newConvBtn = document.createElement('div');
        newConvBtn.className = 'sir-chat-new-conversation';
        newConvBtn.innerHTML = '<button class="sir-chat-new-conversation-btn">New Conversation</button>';
        
        // Add elements to window
        window.appendChild(header);
        window.appendChild(messagesArea);
        window.appendChild(form);
        window.appendChild(newConvBtn);
        
        // Add to container
        container.appendChild(button);
        container.appendChild(window);
        
        // Add to document
        document.body.appendChild(container);
        
        return {
            container: container,
            button: button,
            window: window,
            messages: messagesArea,
            input: form.querySelector('.sir-chat-input'),
            sendBtn: form.querySelector('.sir-chat-send'),
            closeBtn: header.querySelector('.sir-chat-close'),
            newConvBtn: newConvBtn.querySelector('.sir-chat-new-conversation-btn'),
            form: form
        };
    }
    
    function setupEventListeners(elements, config) {
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
        
        // New conversation button
        elements.newConvBtn.addEventListener('click', function() {
            startNewConversation(elements, config);
        });
    }
    
    function sendMessage(elements, config) {
        var text = elements.input.value.trim();
        if (!text) return;
        
        // Clear input
        elements.input.value = '';
        
        // Add user message to chat
        addMessage(elements, text, 'user');
        
        // Check for webhook URL
        if (!config.webhook.url) {
            addMessage(elements, 'Chat widget is not properly configured. Please set a webhook URL.', 'bot');
            return;
        }
        
        // Show typing indicator
        var typingMsg = document.createElement('div');
        typingMsg.className = 'sir-chat-message bot typing-indicator';
        typingMsg.textContent = 'Typing...';
        elements.messages.appendChild(typingMsg);
        elements.messages.scrollTop = elements.messages.scrollHeight;
        
        // Get session ID
        var sessionId = localStorage.getItem('sir_chat_session');
        
        // Prepare webhook URL with action parameter
        var webhookUrl = config.webhook.url;
        if (webhookUrl.indexOf('?') === -1) {
            webhookUrl += '?action=sendMessage';
        } else {
            webhookUrl += '&action=sendMessage';
        }
        
        log('Sending message to webhook', {
            url: webhookUrl,
            message: text,
            sessionId: sessionId
        });
        
        // Create FormData
        var formData = new FormData();
        formData.append(config.webhook.chatInputKey, text);
        formData.append(config.webhook.sessionIdKey, sessionId);
        
        // Send the request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', webhookUrl, true);
        
        xhr.onload = function() {
            // Remove typing indicator
            try {
                elements.messages.removeChild(typingMsg);
            } catch (e) {
                // Ignore if already removed
            }
            
            log('Received webhook response', {
                status: xhr.status,
                response: xhr.responseText
            });
            
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    // Try to parse as JSON
                    var response = JSON.parse(xhr.responseText);
                    
                    if (response && response.message) {
                        // n8n should return { message: "..." }
                        addMessage(elements, response.message, 'bot');
                    } else if (response && response.content) {
                        // Some n8n versions return { content: "..." }
                        addMessage(elements, response.content, 'bot');
                    } else {
                        // Handle missing message
                        log('Response missing message field', response);
                        addMessage(elements, 'Sorry, I received an invalid response. Please try again.', 'bot');
                    }
                } catch (e) {
                    // Handle JSON parse error
                    log('Error parsing JSON response', e);
                    
                    // Check if response is plain text
                    if (xhr.responseText && typeof xhr.responseText === 'string' && xhr.responseText.trim()) {
                        // Use plain text response
                        addMessage(elements, xhr.responseText.trim(), 'bot');
                    } else {
                        addMessage(elements, 'Sorry, I received an invalid response. Please try again.', 'bot');
                    }
                }
            } else {
                // Handle HTTP error
                log('HTTP error', xhr.status);
                addMessage(elements, 'Sorry, I encountered an error. Please try again later.', 'bot');
            }
        };
        
        xhr.onerror = function() {
            // Remove typing indicator
            try {
                elements.messages.removeChild(typingMsg);
            } catch (e) {
                // Ignore if already removed
            }
            
            log('Network error', 'Failed to connect to webhook');
            addMessage(elements, 'Sorry, I could not connect to the server. Please check your connection.', 'bot');
        };
        
        // Send FormData
        xhr.send(formData);
    }
    
    function addMessage(elements, text, sender) {
        var message = document.createElement('div');
        message.className = 'sir-chat-message ' + sender;
        message.textContent = text;
        
        elements.messages.appendChild(message);
        
        // Scroll to bottom
        elements.messages.scrollTop = elements.messages.scrollHeight;
    }
    
    function startNewConversation(elements, config) {
        // Clear existing messages
        while (elements.messages.firstChild) {
            elements.messages.removeChild(elements.messages.firstChild);
        }
        
        // Generate new session ID
        var newSessionId = 'session_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('sir_chat_session', newSessionId);
        
        log('Started new conversation', { sessionId: newSessionId });
        
        // Add welcome message
        if (config.branding.welcomeText) {
            addMessage(elements, config.branding.welcomeText, 'bot');
        }
    }
})();
