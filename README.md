# SEO it Right Chat Widget

A customizable chat widget for SEO it Right Ltd that integrates with n8n workflows.

## Overview

This chat widget allows you to embed a customizable chatbot on your website that connects to n8n for processing messages. The widget is designed to be lightweight, easy to configure, and match your branding.

## Features

- Customizable colors and styling
- Responsive design that works on all devices
- Easy integration with n8n webhooks
- Configurable welcome messages and branding

## Installation

1. Include the script in your website:

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
<script src="./chat-widget.js"></script>
```

2. Customize the configuration to match your branding and needs.

## Configuration Options

### Webhook

- `url`: The URL to your n8n webhook
- `route`: Optional routing parameter for the webhook

### Branding

- `logo`: URL to your company logo
- `name`: Your company or chat widget name
- `welcomeText`: Initial message displayed in the chat
- `responseTimeText`: Text displayed under the title to set expectations

### Style

- `primaryColor`: Main color for buttons and user messages
- `secondaryColor`: Secondary color for hover states and accents
- `position`: Position of the widget ('left' or 'right')
- `backgroundColor`: Background color of the chat window
- `fontColor`: Text color for the chat messages

## Development

The widget is built with vanilla JavaScript with no dependencies, making it lightweight and easy to customize.

## License

MIT
