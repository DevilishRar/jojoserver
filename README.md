# 🌹 JoJo's Bizarre Adventure Discord Server

A complete Discord server system for a JoJo-themed friend group.

## What's Included

### 1. Server Builder (`api/builder.js`)
- Creates the entire server structure from scratch
- 55+ character roles with unique colors
- 10 categories with 30+ channels
- Full permission system
- Voice channels
- Decorative headers and dividers

### 2. Message Sender (`api/send-messages.js`)
- Sends beautiful embeds with GIFs to all channels
- Rules, FAQ, announcements, links, role-select, VRChat, content ideas
- Uses Tenor GIFs for visual flair

### 3. 24/7 Bot (`bot.js`)
- Auto-assigns role dividers when members pick characters
- Slash commands (/help, /roles, /server, /poll, /8ball)
- Prefix commands (!help, !roles, !server, !8ball, !poll, !dividers)
- Welcome messages for new members
- Keep-alive server for free hosting

### 4. Role Interaction Handler (`api/interactions.js`)
- Button-based role selection
- Slash command handler
- Character role assignment with automatic old-role removal

## How to Use

### Step 1: Build the Server
1. Deploy `api/builder.js` to Vercel
2. Open browser console on any website
3. Paste `console-builder.js`
4. Enter your Server ID
5. Wait for build to complete
6. Copy the `.env` output

### Step 2: Send Messages
1. Deploy `api/send-messages.js` to Vercel
2. Open browser console
3. Paste `console-send.js`
4. Paste your channel IDs from Step 1
5. Wait for messages to send

### Step 3: Run the Bot (24/7)
1. `npm install` in the jojo-server directory
2. Set environment variables from the .env output
3. `node bot.js`

## Environment Variables

```
BOT_TOKEN=your_bot_token
BUILDER_BOT_TOKEN=builder_bot_token
BUILDER_PUBLIC_KEY=builder_public_key
GUILD_ID=your_server_id
KEEP_ALIVE=true
```

## Character Roles (55+)

### Phantom Blood
- Jonathan Joestar (Dark Blue)
- Dio Brando (Red)
- Will A. Zeppeli (Gold)
- Speedwagon (Dark Red)

### Battle Tendency
- Joseph Joestar (Green)
- Caesar Zeppeli (Crimson)
- Lisa Lisa (Purple)
- Wamuu (Dark Teal)
- Kars (Dark Golden)

### Stardust Crusaders
- Jotaro Kujo (Navy)
- Star Platinum (Slate Blue)
- Polnareff (Silver)
- Silver Chariot (Dark Grey)
- Kakyoin (Crimson)
- Hierophant Green (Green)
- Avdol (Orange Red)
- Magician Red (Tomato)
- Iggy (Saddle Brown)
- The Fool (Tan)
- DIO (Gold)
- The World (Moccasin)

### Diamond Is Unbreakable
- Josuke (Dark Blue)
- Crazy Diamond (Royal Blue)
- Okuyasu (Red)
- The Hand (Fire Brick)
- Rohan (Hot Pink)
- Heaven's Door (Light Pink)
- Koichi (Gold)
- Echoes (Orange)
- Kira (Hot Pink)
- Killer Queen (Deep Pink)

### Golden Wind
- Giorno (Gold)
- Gold Experience (Amber)
- Bucciarati (Purple)
- Sticky Fingers (Dark Purple)
- Mista (Green)
- Sex Pistols (Emerald)
- Narancia (Light Blue)
- Aerosmith (Blue)
- Abbacchio (Grey)
- Moody Blues (Dark Grey)
- Fugo (Purple)
- Purple Haze (Dark Purple)
- Diavolo (Crimson)
- King Crimson (Red)

### Stone Ocean
- Jolyne (Green)
- Ermes (Hot Pink)
- Foo Fighters (Teal)
- Weather Report (Sky Blue)
- Emporio (Dark Orange)
- Pucci (White)

### Steel Ball Run
- Johnny Joestar (Royal Blue)
- Gyro Zeppeli (Grey)
- Funny Valentine (Fire Brick)

### Jojolion
- Josuke Gappy (Purple)
- Yasuho (Hot Pink)
- Tooru (Steel Blue)

## Server Structure

```
🌹／JOJO'S BIZARRE ADVENTURE
  ꧀⎝ 𓆩༺✧༻𓆪 ⎠꧂
  📜│rules
  ❓│faq
  📢│announcements
  🔗│links
  🎭│role-select
  📋│member-list
  ⫘⫘⫘⫘⫘⫘

⚔️／PHANTOM BLOOD
  ...channels...

🌅／BATTLE TENDENCY
  ...channels...

⭐／STARDUST CRUSADERS
  ...channels + ora/muda decor...

💎／DIAMOND IS UNBREAKABLE
  ...channels...

🍃／GOLDEN WIND
  ...channels...

🪨／STONE OCEAN
  ...channels...

🐎／STEEL BALL RUN
  ...channels...

🍋／JOJOLION
  ...channels...

🎮／VRCHAT & GAMING
  🥽│vrchat-chat
  🎬│content-ideas
  🎲│dnd-corner
  📸│screenshots

💬／HANGOUT
  ☕│general
  🤖│bot-commands
  🎵│music-share
  🖼️│media-share

🎙️／VOICE
  ▷│general voice
  ▷│gaming session
  ▷│vrchat lobby
  ▷│content recording
  ▷│chill zone
  Angola│afk
```
