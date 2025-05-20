/**
 * SEO it Right Chat Widget v7
 * Enhanced styling and user experience
 * Compatible with n8n webhooks
 */

(function() {
  // Configuration object - you can customize these settings
  const config = {
    webhook: {
      url: "https://YOUR_N8N_WEBHOOK_URL_HERE", // Replace with your actual n8n webhook URL before using
      responseField: "reply" // Field that contains the bot response in the webhook response
    },
    branding: {
      title: "Chat with SEO it Right",
      subtitle: "We're here to help with your SEO questions",
      logo: "https://seoitright.co.uk/wp-content/uploads/2024/12/SEO-it-Right-02-scaled.jpg",
      agentName: "SEO Assistant",
      userLabel: "You"
    },
    style: {
      primaryColor: "#3da5ae",
      secondaryColor: "#001d4c",
      textColor: "#333333",
      fontSize: "14px",
      borderRadius: "8px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      chatHeight: "400px",
      chatWidth: "350px",
      chatRight: "20px",
      chatBottom: "20px",
      buttonText: "Chat with us",
      buttonIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
      closeIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
      sendIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`
    },
    initialMessages: [
      {
        sender: "bot",
        text: "Hello! How can I help you with your SEO questions today?"
      }
    ],
    debug: false // Set to true to enable console logging for debugging
  };

  // Create and inject CSS
  function injectStyles() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      #seo-chatbot-widget {
        position: fixed;
        bottom: ${config.style.chatBottom};
        right: ${config.style.chatRight};
        z-index: 9999;
        font-family: ${config.style.fontFamily};
        font-size: ${config.style.fontSize};
        color: ${config.style.textColor};
        transition: all 0.3s ease;
      }
      
      #seo-chatbot-button {
        background-color: ${config.style.primaryColor};
        color: white;
        border-radius: ${config.style.borderRadius};
        padding: 12px 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease;
      }
      
      #seo-chatbot-button:hover {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
        background-color: ${adjustColor(config.style.primaryColor, -15)};
      }
      
      #seo-chatbot-container {
        display: none;
        flex-direction: column;
        width: ${config.style.chatWidth};
        max-width: 95vw;
        background-color: white;
        border-radius: ${config.style.borderRadius};
        overflow: hidden;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
      }
      
      #seo-chatbot-header {
        background: linear-gradient(135deg, ${config.style.primaryColor}, ${config.style.secondaryColor});
        color: white;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      #seo-chatbot-title-container {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      #seo-chatbot-logo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }
      
      #seo-chatbot-title-text {
        display: flex;
        flex-direction: column;
      }
      
      #seo-chatbot-title {
        font-weight: bold;
        font-size: 16px;
      }
      
      #seo-chatbot-subtitle {
        font-size: 12px;
        opacity: 0.9;
      }
      
      #seo-chatbot-close {
        cursor: pointer;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease;
      }
      
      #seo-chatbot-close:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      #seo-chatbot-messages {
        height: ${config.style.chatHeight};
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background-color: #f6f8fa;
      }
      
      .seo-chatbot-message {
        max-width: 85%;
        padding: 10px 14px;
        border-radius: 18px;
        line-height: 1.4;
        position: relative;
        animation: messageAppear 0.3s ease;
      }
      
      @keyframes messageAppear {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .seo-chatbot-message.bot {
        background-color: white;
        border-bottom-left-radius: 4px;
        align-self: flex-start;
        border: 1px solid #e1e5eb;
      }
      
      .seo-chatbot-message.user {
        background-color: ${config.style.primaryColor};
        color: white;
        border-bottom-right-radius: 4px;
        align-self: flex-end;
      }
      
      .seo-chatbot-sender {
        font-size: 12px;
        margin-bottom: 4px;
        font-weight: 600;
      }
      
      .seo-chatbot-sender.bot {
        color: ${config.style.secondaryColor};
      }
      
      .seo-chatbot-sender.user {
        color: rgba(255, 255, 255, 0.9);
      }
      
      .seo-chatbot-typing {
        display: flex;
        padding: 10px 14px;
        background-color: white;
        border-radius: 18px;
        border-bottom-left-radius: 4px;
        align-self: flex-start;
        border: 1px solid #e1e5eb;
        width: fit-content;
      }
      
      .seo-chatbot-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #ccc;
        margin: 0 2px;
        animation: pulseAnimation 1.2s infinite;
      }
      
      .seo-chatbot-dot:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .seo-chatbot-dot:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes pulseAnimation {
        0% { opacity: 0.4; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1); }
        100% { opacity: 0.4; transform: scale(0.8); }
      }
      
      #seo-chatbot-input-container {
        display: flex;
        padding: 12px;
        background-color: white;
        border-top: 1px solid #e1e5eb;
      }
      
      #seo-chatbot-input {
        flex: 1;
        padding: 10px 14px;
        border: 1px solid #e1e5eb;
        border-radius: ${config.style.borderRadius};
        outline: none;
        font-family: inherit;
        font-size: inherit;
        resize: none;
        max-height: 120px;
        min-height: 42px;
        line-height: 1.4;
      }
      
      #seo-chatbot-input:focus {
        border-color: ${config.style.primaryColor};
        box-shadow: 0 0 0 2px rgba(61, 165, 174, 0.2);
      }
      
      #seo-chatbot-send {
        background-color: ${config.style.primaryColor};
        color: white;
        border: none;
        border-radius: ${config.style.borderRadius};
        width: 42px;
        height: 42px;
        margin-left: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s ease;
      }
      
      #seo-chatbot-send:hover {
        background-color: ${adjustColor(config.style.primaryColor, -15)};
      }
      
      #seo-chatbot-send:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
      
      @media (max-width: 480px) {
        #seo-chatbot-container {
          width: 100%;
          height: 100%;
          max-width: 100%;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border-radius: 0;
        }
        
        #seo-chatbot-messages {
          flex: 1;
          height: calc(100vh - 64px - 66px);
        }
      }
      
      /* Animation for the chat container */
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .seo-chatbot-show {
        display: flex !important;
        animation: slideUp 0.3s ease;
      }
    `;
    document.head.appendChild(styleEl);
  }

  // Helper function to adjust color brightness
  function adjustColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const r = (num >> 16) + percent;
    const g = ((num >> 8) & 0x00FF) + percent;
    const b = (num & 0x0000FF) + percent;
    
    const newR = Math.min(255, Math.max(0, r)).toString(16).padStart(2, '0');
    const newG = Math.min(255, Math.max(0, g)).toString(16).padStart(2, '0');
    const newB = Math.min(255, Math.max(0, b)).toString(16).padStart(2, '0');
    
    return `#${newR}${newG}${newB}`;
  }

  // Create and inject HTML
  function createChatWidget() {
    const widget = document.createElement('div');
    widget.id = 'seo-chatbot-widget';
    
    // Button to open the chat
    const button = document.createElement('div');
    button.id = 'seo-chatbot-button';
    button.innerHTML = `${config.style.buttonIcon} <span>${config.style.buttonText}</span>`;
    button.onclick = toggleChat;
    
    // Main chat container
    const container = document.createElement('div');
    container.id = 'seo-chatbot-container';
    
    // Chat header
    const header = document.createElement('div');
    header.id = 'seo-chatbot-header';
    
    const titleContainer = document.createElement('div');
    titleContainer.id = 'seo-chatbot-title-container';
    
    const logo = document.createElement('img');
    logo.id = 'seo-chatbot-logo';
    logo.src = config.branding.logo;
    logo.alt = config.branding.title;
    
    const titleText = document.createElement('div');
    titleText.id = 'seo-chatbot-title-text';
    
    const title = document.createElement('div');
    title.id = 'seo-chatbot-title';
    title.textContent = config.branding.title;
    
    const subtitle = document.createElement('div');
    subtitle.id = 'seo-chatbot-subtitle';
    subtitle.textContent = config.branding.subtitle;
    
    titleText.appendChild(title);
    titleText.appendChild(subtitle);
    
    titleContainer.appendChild(logo);
    titleContainer.appendChild(titleText);
    
    const close = document.createElement('div');
    close.id = 'seo-chatbot-close';
    close.innerHTML = config.style.closeIcon;
    close.onclick = toggleChat;
    
    header.appendChild(titleContainer);
    header.appendChild(close);
    
    // Chat messages area
    const messages = document.createElement('div');
    messages.id = 'seo-chatbot-messages';
    
    // Chat input area
    const inputContainer = document.createElement('div');
    inputContainer.id = 'seo-chatbot-input-container';
    
    const input = document.createElement('textarea');
    input.id = 'seo-chatbot-input';
    input.placeholder = 'Type a message...';
    input.rows = 1;
    input.addEventListener('keydown', handleInputKeydown);
    input.addEventListener('input', autoResizeTextarea);
    
    const sendButton = document.createElement('button');
    sendButton.id = 'seo-chatbot-send';
    sendButton.innerHTML = config.style.sendIcon;
    sendButton.onclick = sendMessage;
    
    inputContainer.appendChild(input);
    inputContainer.appendChild(sendButton);
    
    // Assemble the chat widget
    container.appendChild(header);
    container.appendChild(messages);
    container.appendChild(inputContainer);
    
    widget.appendChild(button);
    widget.appendChild(container);
    
    document.body.appendChild(widget);
    
    // Add initial messages
    if (config.initialMessages && config.initialMessages.length) {
      setTimeout(() => {
        config.initialMessages.forEach(msg => {
          addMessage(msg.sender, msg.text);
        });
      }, 500);
    }
  }

  // Toggle chat open/closed
  function toggleChat() {
    const container = document.getElementById('seo-chatbot-container');
    const button = document.getElementById('seo-chatbot-button');
    
    if (container.classList.contains('seo-chatbot-show')) {
      container.classList.remove('seo-chatbot-show');
      button.style.display = 'flex';
    } else {
      container.classList.add('seo-chatbot-show');
      button.style.display = 'none';
      document.getElementById('seo-chatbot-input').focus();
    }
  }

  // Handle keydown in the input field
  function handleInputKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // Auto-resize textarea as user types
  function autoResizeTextarea() {
    const textarea = document.getElementById('seo-chatbot-input');
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }

  // Add a message to the chat
  function addMessage(sender, text) {
    const messages = document.getElementById('seo-chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `seo-chatbot-message ${sender}`;
    
    const senderLabel = document.createElement('div');
    senderLabel.className = `seo-chatbot-sender ${sender}`;
    senderLabel.textContent = sender === 'bot' ? config.branding.agentName : config.branding.userLabel;
    
    const messageText = document.createElement('div');
    messageText.textContent = text;
    
    messageDiv.appendChild(senderLabel);
    messageDiv.appendChild(messageText);
    messages.appendChild(messageDiv);
    
    // Scroll to the bottom
    messages.scrollTop = messages.scrollHeight;
  }

  // Show typing indicator
  function showTypingIndicator() {
    const messages = document.getElementById('seo-chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'seo-chatbot-typing';
    typingDiv.id = 'seo-chatbot-typing';
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'seo-chatbot-dot';
      typingDiv.appendChild(dot);
    }
    
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  // Hide typing indicator
  function hideTypingIndicator() {
    const typingDiv = document.getElementById('seo-chatbot-typing');
    if (typingDiv) {
      typingDiv.remove();
    }
  }

  // Send a message to the webhook
  function sendMessage() {
    const input = document.getElementById('seo-chatbot-input');
    const sendButton = document.getElementById('seo-chatbot-send');
    const userText = input.value.trim();
    
    if (!userText) return;
    
    // Disable input and button while sending
    input.disabled = true;
    sendButton.disabled = true;
    
    // Add user message to chat
    addMessage('user', userText);
    
    // Clear input
    input.value = '';
    input.style.height = 'auto';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Send to webhook
    const xhr = new XMLHttpRequest();
    xhr.open('POST', config.webhook.url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function() {
      // Re-enable input and button
      input.disabled = false;
      sendButton.disabled = false;
      input.focus();
      
      // Hide typing indicator
      hideTypingIndicator();
      
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          const botReply = response[config.webhook.responseField] || 'Sorry, I didn\'t understand that.';
          addMessage('bot', botReply);
        } catch (error) {
          if (config.debug) console.error('Error parsing response:', error);
          addMessage('bot', 'Sorry, I encountered an error. Please try again later.');
        }
      } else {
        if (config.debug) console.error('Request failed with status:', xhr.status);
        addMessage('bot', 'Sorry, I\'m having trouble connecting to the server. Please try again later.');
      }
    };
    
    xhr.onerror = function() {
      // Re-enable input and button
      input.disabled = false;
      sendButton.disabled = false;
      input.focus();
      
      // Hide typing indicator
      hideTypingIndicator();
      
      if (config.debug) console.error('Request failed');
      addMessage('bot', 'Sorry, I couldn\'t connect to the server. Please check your internet connection and try again.');
    };
    
    xhr.send(JSON.stringify({ message: userText }));
  }

  // Initialize the chat widget
  function init() {
    injectStyles();
    createChatWidget();
    if (config.debug) console.log('SEO it Right Chat Widget initialized');
  }

  // Initialize when the DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
