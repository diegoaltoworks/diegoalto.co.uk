# DiegoBot Integration Plan

## Date: 2025-11-02

## Goal
Integrate the diegobot chat client from https://bot.diegoalto.app/ into the diegoalto.co.uk website with:
1. A floating chat button accessible from all pages
2. A dedicated /chat route with full chat interface

## Current State

### Website Structure
- **Framework**: Next.js 14 (App Router)
- **Styling**: MUI (Material-UI) + SCSS modules
- **Auth**: Clerk
- **State Management**: tRPC + React Query
- **Current Chat**: Custom implementation in `src/components/Chat.tsx` using custom hooks

### DiegoBot API
- **Host**: bot.diegoalto.app
- **CDN**:
  - Script: `https://bot.diegoalto.app/chatter.js`
  - Styles: `https://bot.diegoalto.app/chatter.css`
- **Library**: `@fyne/chatbot` (available via CDN as `Fyne` global)
- **Components**:
  - `ChatBot` - API client only
  - `Chat` - Full inline chat window
  - `ChatButton` - Floating button with popup chat

### Integration Options
- **Public Mode**: Uses API key, rate limited by IP
- **Private Mode**: Uses JWT token (Clerk compatible), rate limited by JWT subject

## Implementation Plan

### Phase 1: Add CDN Resources
1. Add diegobot CDN script and stylesheet to root layout (`src/app/layout.tsx`)
2. Load scripts in document head for global availability

### Phase 2: Floating Chat Button
1. Create `src/components/DiegoBotButton.tsx` component
2. Initialize `Fyne.ChatButton` with configuration:
   - Host: 'bot.diegoalto.app'
   - Mode: Start with 'public' (can add private mode later with Clerk JWT)
   - Position: 'bottom-right'
   - Custom styling to match website theme
3. Add component to root layout for global availability

### Phase 3: /chat Page Integration
1. Create `src/components/DiegoBotChat.tsx` component
2. Initialize `Fyne.Chat` for full-page chat interface
3. Update `src/app/(interactive)/chat/page.tsx` to use new component
4. Keep existing Chat.tsx as backup (rename to Chat.legacy.tsx)

### Phase 4: Configuration & Testing
1. Test public mode functionality
2. Document configuration options
3. Add environment variables for API key (optional for public demo)
4. Test on both desktop and mobile
5. Verify integration with bot.diegoalto.app

## Files to Create/Modify

### New Files
- `src/components/DiegoBotButton.tsx` - Floating chat button wrapper
- `src/components/DiegoBotChat.tsx` - Full chat page component
- `src/components/Chat.legacy.tsx` - Backup of original Chat component

### Modified Files
- `src/app/layout.tsx` - Add CDN scripts
- `src/app/(interactive)/chat/page.tsx` - Use DiegoBotChat instead of Chat

## Configuration

### Public Mode (Initial)
```typescript
{
  host: 'bot.diegoalto.app',
  mode: 'public',
  position: 'bottom-right',
  label: '💬',
  chatConfig: {
    title: 'Chat with Diego',
    subtitle: 'Ask me anything!'
  }
}
```

### Private Mode (Future Enhancement)
```typescript
{
  host: 'bot.diegoalto.app',
  mode: 'private',
  apiKey: process.env.NEXT_PUBLIC_DIEGOBOT_API_KEY,
  token: await getToken(), // From Clerk
  position: 'bottom-right'
}
```

## Testing Checklist
- [ ] CDN resources load successfully
- [ ] Floating button appears on all pages
- [ ] Floating button opens chat popup
- [ ] Chat interface is responsive
- [ ] Messages send and receive properly
- [ ] /chat page displays full chat interface
- [ ] Chat persists across page navigation
- [ ] Mobile view works correctly

## Notes
- Using public mode initially (no API key required for demo endpoint)
- Can enhance with Clerk JWT for private mode later
- Keep legacy Chat component as backup
- All changes documented in this file
