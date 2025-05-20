# n8n Chat Widget for SEO it Right

A customizable chat widget for SEO it Right Ltd that integrates with n8n workflows.

## Updates

This repository now includes:

- **seo-it-right-chat.js** - A new implementation based on the official n8n/chat package
- **improved-webhook-test.html** - Enhanced testing tool for webhook communication
- **improved-config-checker.html** - Diagnostic tool for n8n configuration
- **official-n8n-chat-test.html** - Implementation using the official n8n/chat package
- **demo.html** - Demo page with links to all tools

## Quick Integration

```html
<!-- SEO it Right Chat Widget Configuration -->
<script>
    window.SEOitRightChatConfig = {
        webhookUrl: 'YOUR_WEBHOOK_URL_HERE',
        colors: {
            primary: '#3da5ae',
            secondary: '#001d4c',
        }
    };
</script>

<!-- SEO it Right Chat Widget -->
<script src="https://cdn.jsdelivr.net/gh/adrazz-cyber/n8nchatwidget@main/seo-it-right-chat.js"></script>
```

## Configuration Options

See [demo.html](demo.html) for complete configuration options and implementation examples.

## Troubleshooting

- Use [improved-config-checker.html](improved-config-checker.html) to diagnose n8n webhook issues
- Use [improved-webhook-test.html](improved-webhook-test.html) to test webhook communication

## Requirements

- Your n8n instance must have a workflow with a Chat Trigger node
- Your domain must be added to the "Allowed Origins (CORS)" field in the Chat Trigger node
- The workflow must return a response in the format: `{ "message": "Response text" }`
