# SEO it Right Chat Widget

A customizable chat widget for SEO it Right Ltd that integrates with n8n workflows.

## Overview

This chat widget allows you to embed a customizable chatbot on your website that connects to n8n for processing messages. The widget is designed to be lightweight, easy to configure, and match your branding.

## Latest Version: v7

**Version 7 (Latest)** features:
- Modern, professional UI with smooth animations
- Enhanced mobile responsiveness
- Typing indicators for better UX
- Auto-expanding textarea for longer messages
- Improved error handling and debug options
- Uses XMLHttpRequest for better compatibility
- Streamlined configuration options

## Installation (v7)

Simply include the latest version of the script in your website before the closing `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/gh/adrazz-cyber/n8nchatwidget@main/chat-widget-v7.js"></script>
```

No additional configuration is needed! The default settings are configured for SEO it Right, but you can customize by editing the config variables in the script.

## Features

- Customizable colors and styling
- Responsive design that works on all devices
- Easy integration with n8n webhooks
- Configurable welcome messages and branding
- CDN delivery through GitHub and jsDelivr
- Typing indicators and animations
- Detailed error handling and debugging options

## Configuration Options (v7)

### Webhook

- `webhook.url`: The URL to your n8n webhook
- `webhook.responseField`: Field that contains the bot response (default: "reply")

### Branding

- `branding.title`: Main title shown in the header
- `branding.subtitle`: Subtitle shown under the title
- `branding.logo`: URL to your company logo
- `branding.agentName`: Name shown for bot messages
- `branding.userLabel`: Label shown for user messages

### Style

- `style.primaryColor`: Main color for buttons and headers
- `style.secondaryColor`: Secondary color for gradients and accents
- `style.textColor`: Text color for chat messages
- `style.fontSize`: Base font size
- `style.borderRadius`: Border radius for UI elements
- `style.fontFamily`: Font family for the widget
- `style.chatHeight`: Height of the chat messages area
- `style.chatWidth`: Width of the chat container
- `style.chatRight`: Distance from right edge
- `style.chatBottom`: Distance from bottom edge
- `style.buttonText`: Text shown on the chat button
- Various icon settings for customization

### Other Options

- `initialMessages`: Array of messages shown when the chat opens
- `debug`: Enable/disable console logging for debugging

## Legacy Versions

### Previous Installation Method (v1-v6)

```html
<!-- Widget Configuration --> 
<script>
    window.ChatWidgetConfig = {
        webhook: {
            url: 'YOUR_PRODUCTION_WEBHOOK_URL',
            route: 'general'
        },
        branding: {
            logo: 'https://seoitright.co.uk/wp-content/uploads/2024/12/SEO-it-Right-02-scaled.jpg',
            name: 'SEO it Right Ltd',
            welcomeText: 'Hi 👋, how can we help with your SEO needs today?',
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
</script>
<script src="https://cdn.jsdelivr.net/gh/adrazz-cyber/n8nchatwidget@main/chat-widget.js"></script>
```

## Development

The widget is built with vanilla JavaScript with no dependencies, making it lightweight and easy to customize.

## License

MIT
