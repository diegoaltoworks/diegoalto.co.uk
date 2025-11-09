# DiegoBot Integration - Quick Start

## What Was Done

Integrated the diegobot chat client from https://bot.diegoalto.app/ into your personal website.

## New Features

### 1. Floating Chat Button (All Pages)
- A 💬 chat button appears in the bottom-right corner of every page
- Click it to open a chat popup
- Works across all pages of your website

### 2. Full Chat Page (/chat)
- Visit `/chat` for a full-page chat interface
- Same bot, different presentation

## Files Changed

### Modified
- `src/app/layout.tsx` - Added CDN scripts and chat button component
- `src/app/(interactive)/chat/page.tsx` - Now uses diegobot chat

### New
- `src/components/DiegoBotButton.tsx` - Floating chat button wrapper
- `src/components/DiegoBotChat.tsx` - Full-page chat interface
- `src/components/Chat.legacy.tsx` - Backup of original chat component

### Documentation
- `.claude-work/diegobot-integration.md` - Full integration plan
- `.claude-work/implementation-log.md` - Detailed implementation notes
- `.claude-work/QUICK_START.md` - This file

## How to Test

```bash
cd /home/diego/work/diegoa/diegoalto.co.uk
npm run dev  # or: bun dev
```

Then:
1. Open http://localhost:3000
2. Look for the 💬 button in bottom-right corner
3. Click it and try chatting
4. Navigate to http://localhost:3000/chat for full interface

## Configuration

### Current Setup
- **Mode**: Public (no authentication required)
- **Host**: bot.diegoalto.app
- **API**: Using demo endpoint with IP-based rate limiting

### Future Options
You can enhance this with:
- **Private mode** using Clerk JWT for authenticated users
- **Custom styling** to match your website theme
- **API key** for dedicated rate limits

## Bot Configuration

The bot is configured in the diegobot project at:
- `/home/diego/work/diegoa/diegobot/config/bot.json` - Bot identity
- `/home/diego/work/diegoa/diegobot/config/prompts/` - Bot personality
- `/home/diego/work/diegoa/diegobot/config/knowledge/` - Bot knowledge base

Any changes to those files will update the bot's responses.

## Documentation

For more details, see:
- `diegobot-integration.md` - Full planning document
- `implementation-log.md` - Technical implementation details
- `/home/diego/work/diegoa/diegobot/README.md` - DiegoBot documentation
- `/home/diego/work/diegoa/diegobot/src/client/README.md` - Client library docs

## Next Steps

1. **Test the integration**
   - Try both the floating button and /chat page
   - Test on mobile and desktop
   - Verify messages send/receive properly

2. **Customize (Optional)**
   - Update bot knowledge in diegobot project
   - Adjust styling in component files
   - Configure private mode with Clerk

3. **Deploy**
   - Build and deploy your website
   - Ensure bot.diegoalto.app is accessible
   - Test in production

## Support

If you need to:
- **Modify the bot**: Edit files in `/home/diego/work/diegoa/diegobot/config/`
- **Change chat styling**: Edit `DiegoBotButton.tsx` or `DiegoBotChat.tsx`
- **Rollback changes**: See rollback instructions in `implementation-log.md`
- **Add features**: See future enhancements in `implementation-log.md`
