// SEO it Right Chat Widget - Version 3
// Most compatible version
(function() {
    // Wait for document to be loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        // Document already loaded
        setTimeout(initWidget, 1);
    }
    
    function initWidget() {
        console.log("Initializing SEO it Right Chat Widget v3");
        
        // Default configuration
        var defaultConfig = {
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
        
        // Get user config
        var userConfig = window.ChatWidgetConfig || {};
        
        // Merge configurations safely without optional chaining
        var config = {
            webhook: {
                url: userConfig.webhook && userConfig.webhook.url ? userConfig.webhook.url : defaultConfig.webhook.url,
                route: userConfig.webhook && userConfig.webhook.route ? userConfig.webhook.route : defaultConfig.webhook.route
            },
            branding: {
                logo: userConfig.branding && userConfig.branding.logo ? userConfig.branding.logo : defaultConfig.branding.logo,
                name: userConfig.branding && userConfig.branding.name ? userConfig.branding.name : defaultConfig.branding.name,
                welcomeText: userConfig.branding && userConfig.branding.welcomeText ? userConfig.branding.welcomeText : defaultConfig.branding.welcomeText,
                responseTimeText: userConfig.branding && userConfig.branding.responseTimeText ? userConfig.branding.responseTimeText : defaultConfig.branding.responseTimeText
            },
            style: {
                primaryColor: userConfig.style && userConfig.style.primaryColor ? userConfig.style.primaryColor : defaultConfig.style.primaryColor,
                secondaryColor: userConfig.style && userConfig.style.secondaryColor ? userConfig.style.secondaryColor : defaultConfig.style.secondaryColor,
                position: userConfig.style && userConfig.style.position ? userConfig.style.position : defaultConfig.style.position,
                backgroundColor: userConfig.style && userConfig.style.backgroundColor ? userConfig.style.backgroundColor : defaultConfig.style.backgroundColor,
                fontColor: userConfig.style && userConfig.style.fontColor ? userConfig.style.fontColor : defaultConfig.style.fontColor
            }
        };
        
        try {
            // Add styles
            addChatStyles(config);
            
            // Create widget elements
            var elements = createChatElements(config);
            
            // Add event listeners
            addChatEventListeners(elements, config);
            
            console.log("SEO it Right Chat Widget initialized successfully");
        } catch (error) {
            console.error("Error initializing chat widget:", error);
        }
    }
    
    function addChatStyles(config) {
        var styleText = 
            ':root {' +
            '    --chat-primary-color: ' + config.style.primaryColor + ';' +
            '    --chat-secondary-color: ' + config.style.secondaryColor + ';' +
            '    --chat-background-color: ' + config.style.backgroundColor + ';' +
            '    --chat-font-color: ' + config.style.fontColor + ';' +
            '}' +
            
            '.seo-chat-container {' +
            '    position: fixed;' +
            '    bottom: 20px;' +
            '    ' + config.style.position + ': 20px;' +
            '    z-index: 99999;' +
            '    font-family: Arial, sans-serif;' +
            '}' +
            
            '.seo-chat-button {' +
            '    width: 65px;' +
            '    height: 65px;' +
            '    border-radius: 50%;' +
            '    background-color: var(--chat-primary-color);' +
            '    color: white;' +
            '    display: flex;' +
            '    align-items: center;' +
            '    justify-content: center;' +
            '    cursor: pointer;' +
            '    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);' +
            '    transition: all 0.3s ease;' +
            '}' +
            
            '.seo-chat-button:hover {' +
            '    transform: scale(1.05);' +
            '    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);' +
            '}' +
            
            '.seo-chat-icon {' +
            '    font-size: 32px;' +
            '}' +
            
            '.seo-chat-window {' +
            '    position: fixed;' +
            '    bottom: 90px;' +
            '    ' + config.style.position + ': 20px;' +
            '    width: 400px;' +
            '    height: 600px;' +
            '    background-color: var(--chat-background-color);' +
            '    border-radius: 10px;' +
            '    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);' +
            '    display: flex;' +
            '    flex-direction: column;' +
            '    overflow: hidden;' +
            '    transition: all 0.3s ease;' +
            '    opacity: 0;' +
            '    visibility: hidden;' +
            '    transform: translateY(20px);' +
            '}' +
            
            '.seo-chat-window.open {' +
            '    opacity: 1;' +
            '    visibility: visible;' +
            '    transform: translateY(0);' +
            '}';
            
        var style = document.createElement('style');
        style.type = 'text/css';
        
        if (style.styleSheet) {
            // IE
            style.styleSheet.cssText = styleText;
        } else {
            // Other browsers
            style.appendChild(document.createTextNode(styleText));
        }
        
        document.head.appendChild(style);
        
        // Add more styles
        var moreStyleText = 
            '.seo-chat-header {' +
            '    background-color: var(--chat-primary-color);' +
            '    color: white;' +
            '    padding: 18px;' +
            '    display: flex;' +
            '    align-items: center;' +
            '    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);' +
            '}' +
            
            '.seo-chat-logo {' +
            '    width: 35px;' +
            '    height: 35px;' +
            '    border-radius: 50%;' +
            '    margin-right: 12px;' +
            '    object-fit: cover;' +
            '    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);' +
            '}' +
            
            '.seo-chat-title-container {' +
            '    flex: 1;' +
            '}' +
            
            '.seo-chat-title {' +
            '    font-weight: bold;' +
            '    margin: 0;' +
            '    padding: 0;' +
            '    font-size: 18px;' +
            '}' +
            
            '.seo-chat-subtitle {' +
            '    font-size: 13px;' +
            '    margin: 3px 0 0;' +
            '    padding: 0;' +
            '    opacity: 0.9;' +
            '}' +
            
            '.seo-chat-close {' +
            '    cursor: pointer;' +
            '    font-size: 20px;' +
            '}';
        
        var moreStyle = document.createElement('style');
        moreStyle.type = 'text/css';
        
        if (moreStyle.styleSheet) {
            // IE
            moreStyle.styleSheet.cssText = moreStyleText;
        } else {
            // Other browsers
            moreStyle.appendChild(document.createTextNode(moreStyleText));
        }
        
        document.head.appendChild(moreStyle);
        
        // Add final styles
        var finalStyleText = 
            '.seo-chat-messages {' +
            '    flex: 1;' +
            '    padding: 15px;' +
            '    overflow-y: auto;' +
            '    display: flex;' +
            '    flex-direction: column;' +
            '}' +
            
            '.seo-chat-message {' +
            '    margin-bottom: 15px;' +
            '    max-width: 85%;' +
            '    padding: 12px 16px;' +
            '    border-radius: 18px;' +
            '    position: relative;' +
            '    clear: both;' +
            '    font-size: 15px;' +
            '    line-height: 1.5;' +
            '    word-break: break-word;' +
            '    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);' +
            '}' +
            
            '.seo-chat-message.bot {' +
            '    background-color: #f0f0f0;' +
            '    color: var(--chat-font-color);' +
            '    border-bottom-left-radius: 5px;' +
            '    align-self: flex-start;' +
            '}' +
            
            '.seo-chat-message.user {' +
            '    background-color: var(--chat-primary-color);' +
            '    color: white;' +
            '    border-bottom-right-radius: 5px;' +
            '    align-self: flex-end;' +
            '}' +
            
            '.seo-chat-input-container {' +
            '    padding: 15px;' +
            '    border-top: 1px solid #e0e0e0;' +
            '    display: flex;' +
            '    align-items: center;' +
            '}' +
            
            '.seo-chat-input {' +
            '    flex: 1;' +
            '    border: 1px solid #e0e0e0;' +
            '    border-radius: 18px;' +
            '    padding: 12px 16px;' +
            '    font-size: 15px;' +
            '    outline: none;' +
            '    transition: border-color 0.3s ease;' +
            '}' +
            
            '.seo-chat-input:focus {' +
            '    border-color: var(--chat-primary-color);' +
            '}' +
            
            '.seo-chat-send {' +
            '    background-color: var(--chat-primary-color);' +
            '    color: white;' +
            '    border: none;' +
            '    border-radius: 50%;' +
            '    width: 40px;' +
            '    height: 40px;' +
            '    margin-left: 10px;' +
            '    cursor: pointer;' +
            '    display: flex;' +
            '    align-items: center;' +
            '    justify-content: center;' +
            '}' +
            
            '.seo-chat-send:hover {' +
            '    background-color: var(--chat-secondary-color);' +
            '}';
        
        var finalStyle = document.createElement('style');
        finalStyle.type = 'text/css';
        
        if (finalStyle.styleSheet) {
            // IE
            finalStyle.styleSheet.cssText = finalStyleText;
        } else {
            // Other browsers
            finalStyle.appendChild(document.createTextNode(finalStyleText));
        }
        
        document.head.appendChild(finalStyle);
    }

    function createChatElements(config) {
        // Create container
        var container = document.createElement('div');
        container.className = 'seo-chat-container';
        
        // Create chat button
        var button = document.createElement('div');
        button.className = 'seo-chat-button';
        button.innerHTML = '<span class="seo-chat-icon">💬</span>';
        
        // Create chat window
        var window = document.createElement('div');
        window.className = 'seo-chat-window';
        
        // Create header
        var header = document.createElement('div');
        header.className = 'seo-chat-header';
        
        var logo = document.createElement('img');
        logo.className = 'seo-chat-logo';
        logo.src = config.branding.logo;
        logo.alt = config.branding.name + ' logo';
        
        var titleContainer = document.createElement('div');
        titleContainer.className = 'seo-chat-title-container';
        
        var title = document.createElement('h3');
        title.className = 'seo-chat-title';
        title.textContent = config.branding.name;
        
        var subtitle = document.createElement('p');
        subtitle.className = 'seo-chat-subtitle';
        subtitle.textContent = config.branding.responseTimeText;
        
        var closeBtn = document.createElement('div');
        closeBtn.className = 'seo-chat-close';
        closeBtn.innerHTML = '&times;';
        
        titleContainer.appendChild(title);
        titleContainer.appendChild(subtitle);
        
        header.appendChild(logo);
        header.appendChild(titleContainer);
        header.appendChild(closeBtn);
        
        // Create messages container
        var messages = document.createElement('div');
        messages.className = 'seo-chat-messages';
        
        // Add welcome message
        if (config.branding.welcomeText) {
            var welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'seo-chat-message bot';
            welcomeMsg.textContent = config.branding.welcomeText;
            messages.appendChild(welcomeMsg);
        }
        
        // Create input container
        var inputContainer = document.createElement('div');
        inputContainer.className = 'seo-chat-input-container';
        
        var input = document.createElement('input');
        input.className = 'seo-chat-input';
        input.type = 'text';
        input.placeholder = 'Type a message...';
        
        var sendBtn = document.createElement('button');
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
            container: container,
            button: button,
            window: window,
            messages: messages,
            input: input,
            sendBtn: sendBtn,
            closeBtn: closeBtn
        };
    }

    function addChatEventListeners(elements, config) {
        // Toggle chat window
        elements.button.addEventListener('click', function() {
            if (elements.window.classList.contains('open')) {
                elements.window.classList.remove('open');
            } else {
                elements.window.classList.add('open');
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
            sendChatMessage(elements, config);
        });
        
        // Send message on Enter
        elements.input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage(elements, config);
            }
        });
    }

    function sendChatMessage(elements, config) {
        var text = elements.input.value.trim();
        if (!text) return;
        
        // Clear input
        elements.input.value = '';
        
        // Add user message to chat
        addChatMessage(elements, text, 'user');
        
        // Send to webhook
        if (config.webhook.url) {
            // Create message payload
            var payload = {
                message: text,
                route: config.webhook.route
            };
            
            // Send to webhook
            fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                if (data && data.message) {
                    addChatMessage(elements, data.message, 'bot');
                } else {
                    addChatMessage(elements, 'Sorry, I encountered an error processing your request.', 'bot');
                }
            })
            .catch(function(error) {
                console.error('Error sending message:', error);
                addChatMessage(elements, 'Sorry, I encountered an error. Please try again later.', 'bot');
            });
        } else {
            // No webhook URL configured
            addChatMessage(elements, 'Chat widget is not properly configured. Please set a webhook URL.', 'bot');
        }
    }
    
    function addChatMessage(elements, text, type) {
        var message = document.createElement('div');
        message.className = 'seo-chat-message ' + type;
        message.textContent = text;
        
        elements.messages.appendChild(message);
        
        // Scroll to bottom
        elements.messages.scrollTop = elements.messages.scrollHeight;
    }
})();
