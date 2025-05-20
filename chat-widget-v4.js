// SEO it Right Chat Widget - Version 4 (Simple)
// Simplified communication with n8n webhook
(function() {
    // Initialize when document is loaded
    document.addEventListener('DOMContentLoaded', initSimpleWidget);
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initSimpleWidget, 1);
    }
    
    function initSimpleWidget() {
        console.log("Initializing SEO it Right Chat Widget v4 (Simple)");
        
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
        
        // Add styles
        addSimpleStyles(config);
        
        // Create elements
        var elements = createSimpleElements(config);
        
        // Add event listeners
        setupSimpleEventListeners(elements, config);
    }
    
    function addSimpleStyles(config) {
        var style = document.createElement('style');
        style.textContent = `
            .simple-chat-container {
                position: fixed;
                bottom: 20px;
                ${config.style.position}: 20px;
                z-index: 99999;
                font-family: Arial, sans-serif;
            }
            
            .simple-chat-button {
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
            
            .simple-chat-icon {
                font-size: 32px;
            }
            
            .simple-chat-window {
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
            
            .simple-chat-window.open {
                display: flex;
            }
            
            .simple-chat-header {
                background-color: ${config.style.primaryColor};
                color: white;
                padding: 15px;
                display: flex;
                align-items: center;
            }
            
            .simple-chat-logo {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                margin-right: 10px;
                object-fit: cover;
            }
            
            .simple-chat-title {
                flex: 1;
                font-weight: bold;
                font-size: 18px;
                margin: 0;
            }
            
            .simple-chat-close {
                cursor: pointer;
                font-size: 20px;
            }
            
            .simple-chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }
            
            .simple-chat-message {
                margin-bottom: 15px;
                max-width: 85%;
                padding: 12px;
                border-radius: 18px;
                font-size: 15px;
                line-height: 1.5;
            }
            
            .simple-chat-message.bot {
                background-color: #f0f0f0;
                color: ${config.style.fontColor};
                border-bottom-left-radius: 5px;
                align-self: flex-start;
            }
            
            .simple-chat-message.user {
                background-color: ${config.style.primaryColor};
                color: white;
                border-bottom-right-radius: 5px;
                align-self: flex-end;
            }
            
            .simple-chat-form {
                padding: 15px;
                border-top: 1px solid #e0e0e0;
                display: flex;
                align-items: center;
            }
            
            .simple-chat-input {
                flex: 1;
                padding: 12px;
                border: 1px solid #e0e0e0;
                border-radius: 18px;
                font-size: 15px;
                outline: none;
            }
            
            .simple-chat-send {
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
    
    function createSimpleElements(config) {
        // Create container
        var container = document.createElement('div');
        container.className = 'simple-chat-container';
        
        // Create button
        var button = document.createElement('div');
        button.className = 'simple-chat-button';
        button.innerHTML = '<span class="simple-chat-icon">💬</span>';
        
        // Create window
        var window = document.createElement('div');
        window.className = 'simple-chat-window';
        
        // Create header
        var header = document.createElement('div');
        header.className = 'simple-chat-header';
        
        var logo = document.createElement('img');
        logo.className = 'simple-chat-logo';
        logo.src = config.branding.logo;
        logo.alt = config.branding.name + ' logo';
        
        var title = document.createElement('h3');
        title.className = 'simple-chat-title';
        title.textContent = config.branding.name;
        
        var closeBtn = document.createElement('div');
        closeBtn.className = 'simple-chat-close';
        closeBtn.innerHTML = '&times;';
        
        // Add to header
        header.appendChild(logo);
        header.appendChild(title);
        header.appendChild(closeBtn);
        
        // Create messages area
        var messagesArea = document.createElement('div');
        messagesArea.className = 'simple-chat-messages';
        
        // Add welcome message
        if (config.branding.welcomeText) {
            var welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'simple-chat-message bot';
            welcomeMsg.textContent = config.branding.welcomeText;
            messagesArea.appendChild(welcomeMsg);
        }
        
        // Create form
        var form = document.createElement('form');
        form.className = 'simple-chat-form';
        form.onsubmit = function(e) { e.preventDefault(); return false; };
        
        var input = document.createElement('input');
        input.className = 'simple-chat-input';
        input.type = 'text';
        input.placeholder = 'Type a message...';
        
        var sendBtn = document.createElement('button');
        sendBtn.className = 'simple-chat-send';
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

    function setupSimpleEventListeners(elements, config) {
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
            sendSimpleMessage(elements, config);
        });
        
        // Send message on Enter
        elements.input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendSimpleMessage(elements, config);
            }
        });
    }
    
    function sendSimpleMessage(elements, config) {
        var text = elements.input.value.trim();
        if (!text) return;
        
        // Clear input
        elements.input.value = '';
        
        // Add user message to chat
        addSimpleMessage(elements, text, 'user');
        
        // Check for webhook URL
        if (!config.webhook.url) {
            addSimpleMessage(elements, 'Chat widget is not properly configured. Please set a webhook URL.', 'bot');
            return;
        }
        
        // Show typing indicator
        var typingMsg = document.createElement('div');
        typingMsg.className = 'simple-chat-message bot';
        typingMsg.textContent = 'Typing...';
        elements.messages.appendChild(typingMsg);
        elements.messages.scrollTop = elements.messages.scrollHeight;
        
        // Create a plain XMLHttpRequest instead of fetch
        var xhr = new XMLHttpRequest();
        
        // Log that we're sending the request
        console.log('Sending XHR request to webhook:', config.webhook.url);
        console.log('Message:', text);
        
        // Setup the request
        xhr.open('POST', config.webhook.url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        // Define what happens on successful data submission
        xhr.onload = function() {
            // Remove typing indicator
            elements.messages.removeChild(typingMsg);
            
            console.log('XHR response received. Status:', xhr.status);
            console.log('Response text:', xhr.responseText);
            
            // Check if the request was successful
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    // Parse the JSON response
                    var response = JSON.parse(xhr.responseText);
                    
                    if (response && response.message) {
                        // Add bot message
                        addSimpleMessage(elements, response.message, 'bot');
                    } else {
                        console.error('Invalid response format:', response);
                        addSimpleMessage(elements, 'Received an invalid response from the server.', 'bot');
                    }
                } catch (error) {
                    console.error('Error parsing response:', error);
                    console.log('Raw response:', xhr.responseText);
                    addSimpleMessage(elements, 'Error processing the response from the server.', 'bot');
                }
            } else {
                console.error('Request failed. Status:', xhr.status);
                addSimpleMessage(elements, 'Failed to connect to the server. Status: ' + xhr.status, 'bot');
            }
        };
        
        // Define what happens in case of error
        xhr.onerror = function() {
            // Remove typing indicator
            elements.messages.removeChild(typingMsg);
            
            console.error('Request failed. Network error.');
            addSimpleMessage(elements, 'Network error. Please check your connection and try again.', 'bot');
        };
        
        // Send the actual data
        try {
            var data = JSON.stringify({
                message: text,
                route: config.webhook.route
            });
            
            xhr.send(data);
        } catch (error) {
            // Remove typing indicator
            elements.messages.removeChild(typingMsg);
            
            console.error('Error sending data:', error);
            addSimpleMessage(elements, 'Error sending message: ' + error.message, 'bot');
        }
    }
    
    function addSimpleMessage(elements, text, type) {
        var message = document.createElement('div');
        message.className = 'simple-chat-message ' + type;
        message.textContent = text;
        
        elements.messages.appendChild(message);
        
        // Scroll to bottom
        elements.messages.scrollTop = elements.messages.scrollHeight;
    }
})();
