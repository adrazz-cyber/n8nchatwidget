// SEO it Right Chat Widget - Version 5 (n8n compatible)
// Following official n8n/chat request format
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
            }
        };
        
        // Generate a session ID if we don't have one
        var sessionId = localStorage.getItem('n8nChatSessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('n8nChatSessionId', sessionId);
        }
        
        // Store session ID in config
        config.sessionId = sessionId;
        
        // Add styles
        addN8nStyles(config);
        
        // Create elements
        var elements = createN8nElements(config);
        
        // Add event listeners
        setupN8nEventListeners(elements, config);
        
        // Load previous messages if any
        loadPreviousSession(elements, config);
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
                padding: 15px;
                display: flex;
                align-items: center;
            }
            
            .n8n-chat-logo {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                margin-right: 10px;
                object-fit: cover;
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
        `;
        document.head.appendChild(style);
    }

    function createN8nElements(config) {
        // Create container
        var container = document.createElement('div');
        container.className = 'n8n-chat-container';
        
        // Create button
        var button = document.createElement('div');
        button.className = 'n8n-chat-button';
        button.innerHTML = '<span class="n8n-chat-icon">💬</span>';
        
        // Create window
        var window = document.createElement('div');
        window.className = 'n8n-chat-window';
        
        // Create header
        var header = document.createElement('div');
        header.className = 'n8n-chat-header';
        
        var logo = document.createElement('img');
        logo.className = 'n8n-chat-logo';
        logo.src = config.branding.logo;
        logo.alt = config.branding.name + ' logo';
        
        var title = document.createElement('h3');
        title.className = 'n8n-chat-title';
        title.textContent = config.branding.name;
        
        var closeBtn = document.createElement('div');
        closeBtn.className = 'n8n-chat-close';
        closeBtn.innerHTML = '&times;';
        
        // Add to header
        header.appendChild(logo);
        header.appendChild(title);
        header.appendChild(closeBtn);
        
        // Create messages area
        var messagesArea = document.createElement('div');
        messagesArea.className = 'n8n-chat-messages';
        
        // Add welcome message
        if (config.branding.welcomeText) {
            var welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'n8n-chat-message bot';
            welcomeMsg.textContent = config.branding.welcomeText;
            messagesArea.appendChild(welcomeMsg);
        }
        
        // Create form
        var form = document.createElement('form');
        form.className = 'n8n-chat-form';
        form.onsubmit = function(e) { e.preventDefault(); return false; };
        
        var input = document.createElement('input');
        input.className = 'n8n-chat-input';
        input.type = 'text';
        input.placeholder = 'Type a message...';
        
        var sendBtn = document.createElement('button');
        sendBtn.className = 'n8n-chat-send';
        sendBtn.type = 'button';
        sendBtn.innerHTML = '&#10148;';
        
        // Add to form
        form.appendChild(input);
        form.appendChild(sendBtn);
        
        // Add to window
        window.appendChild(header);
        window.appendChild(messagesArea);
        window.appendChild(form);
        
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
            input: input,
            sendBtn: sendBtn,
            closeBtn: closeBtn,
            form: form
        };
    }

    function setupN8nEventListeners(elements, config) {
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
            sendN8nMessage(elements, config);
        });
        
        // Send message on Enter
        elements.input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendN8nMessage(elements, config);
            }
        });
    }
    
    function loadPreviousSession(elements, config) {
        // Only attempt to load if we have a webhook URL
        if (!config.webhook.url) {
            console.log("No webhook URL configured, skipping loadPreviousSession");
            return;
        }
        
        console.log("Loading previous session...");
        
        // Create the URL with query parameters for n8n
        var url = new URL(config.webhook.url);
        url.searchParams.append('action', 'loadPreviousSession');
        url.searchParams.append(config.webhook.sessionIdKey, config.sessionId);
        
        // Make request to load previous messages
        fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Failed to load previous session: ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            console.log("Previous session loaded:", data);
            
            // Process messages if available
            if (data && data.messages && Array.isArray(data.messages)) {
                data.messages.forEach(function(msg) {
                    addN8nMessage(elements, msg.content, msg.sender === 'bot' ? 'bot' : 'user');
                });
            }
        })
        .catch(function(error) {
            console.warn("Could not load previous session:", error);
            // This is not a critical error, so we don't show anything to the user
        });
    }

    function sendN8nMessage(elements, config) {
        var text = elements.input.value.trim();
        if (!text) return;
        
        // Clear input
        elements.input.value = '';
        
        // Add user message to chat
        addN8nMessage(elements, text, 'user');
        
        // Check for webhook URL
        if (!config.webhook.url) {
            addN8nMessage(elements, 'Chat widget is not properly configured. Please set a webhook URL.', 'bot');
            return;
        }
        
        // Show typing indicator
        var typingMsg = document.createElement('div');
        typingMsg.className = 'n8n-chat-message bot';
        typingMsg.textContent = 'Typing...';
        elements.messages.appendChild(typingMsg);
        elements.messages.scrollTop = elements.messages.scrollHeight;
        
        // Create the URL with query parameters for n8n
        var url = new URL(config.webhook.url);
        url.searchParams.append('action', 'sendMessage');
        
        // Create form data with the n8n format
        var formData = new FormData();
        formData.append(config.webhook.chatInputKey, text);
        formData.append(config.webhook.sessionIdKey, config.sessionId);
        
        console.log("Sending message to n8n webhook:", url.toString());
        console.log("With data:", {
            [config.webhook.chatInputKey]: text,
            [config.webhook.sessionIdKey]: config.sessionId
        });
        
        // Send the request
        fetch(url.toString(), {
            method: 'POST',
            body: formData
        })
        .then(function(response) {
            // Remove typing indicator
            elements.messages.removeChild(typingMsg);
            
            console.log("Response status:", response.status);
            
            if (!response.ok) {
                throw new Error('Server error: ' + response.status);
            }
            
            return response.json().catch(function(error) {
                // If it's not JSON, try to get the text
                console.warn("Failed to parse JSON:", error);
                return response.text().then(function(text) {
                    return { message: text };
                });
            });
        })
        .then(function(data) {
            console.log("Message response:", data);
            
            if (data && (data.message || data.content)) {
                var botMessage = data.message || data.content;
                addN8nMessage(elements, botMessage, 'bot');
            } else {
                console.error("Invalid response format:", data);
                addN8nMessage(elements, 'Received an invalid response from the server.', 'bot');
            }
        })
        .catch(function(error) {
            console.error("Error sending message:", error);
            
            // Add error message
            addN8nMessage(elements, 'Error: ' + error.message, 'bot');
            
            // Add troubleshooting guidance
            var troubleshootMsg = "Please check the n8n webhook configuration. Make sure CORS is enabled for your domain and the webhook is active.";
            setTimeout(function() {
                addN8nMessage(elements, troubleshootMsg, 'bot');
            }, 500);
        });
    }
    
    function addN8nMessage(elements, text, type) {
        var message = document.createElement('div');
        message.className = 'n8n-chat-message ' + type;
        message.textContent = text;
        
        elements.messages.appendChild(message);
        
        // Scroll to bottom
        elements.messages.scrollTop = elements.messages.scrollHeight;
        
        // Store messages in local storage for persistence
        saveMessages(elements, type, text);
    }
    
    function saveMessages(elements, type, text) {
        // Get existing messages
        var messages = JSON.parse(localStorage.getItem('n8nChatMessages') || '[]');
        
        // Add new message
        messages.push({
            content: text,
            sender: type,
            timestamp: new Date().toISOString()
        });
        
        // Save back to local storage
        localStorage.setItem('n8nChatMessages', JSON.stringify(messages));
    }
})();
