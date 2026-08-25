const { Client, GatewayIntentBits, Events, SlashCommandBuilder, REST, Routes } = require('discord.js');

const TOKEN = process.env.BOT_TOKEN || '';
const GUILD_ID = process.env.GUILD_ID || '';

if (!TOKEN || !GUILD_ID) {
  console.error('BOT_TOKEN and GUILD_ID required');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

// ═══════════════════════════════════════════════════════
// CHARACTER → PART MAP (for role dividers)
// ═══════════════════════════════════════════════════════
const CHAR_TO_PART = {
  // Phantom Blood
  'Jonathan Joestar': 'PHANTOM BLOOD', 'Dio Brando': 'PHANTOM BLOOD',
  'Will A. Zeppeli': 'PHANTOM BLOOD', 'Speedwagon': 'PHANTOM BLOOD',
  'Erina Pendleton': 'PHANTOM BLOOD', 'George Joestar I': 'PHANTOM BLOOD',
  'Bruford': 'PHANTOM BLOOD', 'Tarkus': 'PHANTOM BLOOD',
  'Dire': 'PHANTOM BLOOD', 'Straizo': 'PHANTOM BLOOD',
  'Poco': 'PHANTOM BLOOD', 'Wang Chan': 'PHANTOM BLOOD',
  // Battle Tendency
  'Joseph Joestar': 'BATTLE TENDENCY', 'Caesar Zeppeli': 'BATTLE TENDENCY',
  'Lisa Lisa': 'BATTLE TENDENCY', 'Wamuu': 'BATTLE TENDENCY',
  'Kars': 'BATTLE TENDENCY', 'Esidisi': 'BATTLE TENDENCY',
  'Stroheim': 'BATTLE TENDENCY', 'Suzi Q': 'BATTLE TENDENCY',
  'Messina': 'BATTLE TENDENCY', 'Loggins': 'BATTLE TENDENCY',
  // Stardust Crusaders
  'Jotaro Kujo': 'STARDUST CRUSADERS', 'Star Platinum': 'STARDUST CRUSADERS',
  'Jean Pierre Polnareff': 'STARDUST CRUSADERS', 'Silver Chariot': 'STARDUST CRUSADERS',
  'Noriaki Kakyoin': 'STARDUST CRUSADERS', 'Hierophant Green': 'STARDUST CRUSADERS',
  'Muhammad Avdol': 'STARDUST CRUSADERS', 'Magician Red': 'STARDUST CRUSADERS',
  'Iggy': 'STARDUST CRUSADERS', 'The Fool': 'STARDUST CRUSADERS',
  'DIO': 'STARDUST CRUSADERS', 'The World': 'STARDUST CRUSADERS',
  'Old Joseph': 'STARDUST CRUSADERS', 'Hermit Purple': 'STARDUST CRUSADERS',
  'Hol Horse': 'STARDUST CRUSADERS', 'Emperor': 'STARDUST CRUSADERS',
  'Boingo': 'STARDUST CRUSADERS', 'Tohth': 'STARDUST CRUSADERS',
  "Daniel D'Arby": 'STARDUST CRUSADERS', "Telence D'Arby": 'STARDUST CRUSADERS',
  'Vanilla Ice': 'STARDUST CRUSADERS', 'Cream': 'STARDUST CRUSADERS',
  'Nukesaku': 'STARDUST CRUSADERS', 'Alessi': 'STARDUST CRUSADERS',
  'Mariah': 'STARDUST CRUSADERS', 'Bastet': 'STARDUST CRUSADERS',
  'Midler': 'STARDUST CRUSADERS', 'High Priestess': 'STARDUST CRUSADERS',
  "N'Doul": 'STARDUST CRUSADERS', 'Geb': 'STARDUST CRUSADERS',
  'Oingo': 'STARDUST CRUSADERS', 'Khnum': 'STARDUST CRUSADERS',
  'Anubis': 'STARDUST CRUSADERS', 'Nena': 'STARDUST CRUSADERS',
  'The Lovers': 'STARDUST CRUSADERS', 'Steely Dan': 'STARDUST CRUSADERS',
  'J. Geil': 'STARDUST CRUSADERS', 'Hanged Man': 'STARDUST CRUSADERS',
  // Diamond Is Unbreakable
  'Josuke Higashikata': 'DIAMOND IS UNBREAKABLE', 'Crazy Diamond': 'DIAMOND IS UNBREAKABLE',
  'Okuyasu Nijimura': 'DIAMOND IS UNBREAKABLE', 'The Hand': 'DIAMOND IS UNBREAKABLE',
  'Rohan Kishibe': 'DIAMOND IS UNBREAKABLE', "Heaven's Door": 'DIAMOND IS UNBREAKABLE',
  'Koichi Hirose': 'DIAMOND IS UNBREAKABLE', 'Echoes': 'DIAMOND IS UNBREAKABLE',
  'Yoshikage Kira': 'DIAMOND IS UNBREAKABLE', 'Killer Queen': 'DIAMOND IS UNBREAKABLE',
  'Hayato Kawajiri': 'DIAMOND IS UNBREAKABLE', 'Yukako Yamagishi': 'DIAMOND IS UNBREAKABLE',
  'Tonio Trussardi': 'DIAMOND IS UNBREAKABLE', 'Cure Kisses': 'DIAMOND IS UNBREAKABLE',
  'Keicho Nijimura': 'DIAMOND IS UNBREAKABLE', 'Bad Company': 'DIAMOND IS UNBREAKABLE',
  'Akira Otoishi': 'DIAMOND IS UNBREAKABLE', 'Red Hot Chili Pepper': 'DIAMOND IS UNBREAKABLE',
  'Toyohiro Kanedaichi': 'DIAMOND IS UNBREAKABLE', 'Super Fly': 'DIAMOND IS UNBREAKABLE',
  'Yoshihiro Kira': 'DIAMOND IS UNBREAKABLE', 'Stray Cat': 'DIAMOND IS UNBREAKABLE',
  // Golden Wind
  'Giorno Giovanna': 'GOLDEN WIND', 'Gold Experience': 'GOLDEN WIND',
  'Bruno Bucciarati': 'GOLDEN WIND', 'Sticky Fingers': 'GOLDEN WIND',
  'Guido Mista': 'GOLDEN WIND', 'Sex Pistols': 'GOLDEN WIND',
  'Narancia Ghirga': 'GOLDEN WIND', 'Aerosmith': 'GOLDEN WIND',
  'Leone Abbacchio': 'GOLDEN WIND', 'Moody Blues': 'GOLDEN WIND',
  'Pannacotta Fugo': 'GOLDEN WIND', 'Purple Haze': 'GOLDEN WIND',
  'Diavolo': 'GOLDEN WIND', 'King Crimson': 'GOLDEN WIND',
  'Trish Una': 'GOLDEN WIND', 'Spice Girl': 'GOLDEN WIND',
  'Risotto Nero': 'GOLDEN WIND', 'Metallica': 'GOLDEN WIND',
  'Ghiaccio': 'GOLDEN WIND', 'White Album': 'GOLDEN WIND',
  'Melone': 'GOLDEN WIND', 'Baby Face': 'GOLDEN WIND',
  'Formaggio': 'GOLDEN WIND', 'Little Feet': 'GOLDEN WIND',
  'Illuso': 'GOLDEN WIND', 'Man in the Mirror': 'GOLDEN WIND',
  'Prosciutto': 'GOLDEN WIND', 'The Grateful Dead': 'GOLDEN WIND',
  'Pesci': 'GOLDEN WIND', 'Beach Boy': 'GOLDEN WIND',
  'Squalo': 'GOLDEN WIND', 'Clash': 'GOLDEN WIND',
  'Tiziano': 'GOLDEN WIND', 'Talking Head': 'GOLDEN WIND',
  'Cioccolata': 'GOLDEN WIND', 'Green Day': 'GOLDEN WIND',
  'Secco': 'GOLDEN WIND', 'Oasis': 'GOLDEN WIND',
  // Stone Ocean
  'Jolyne Cujoh': 'STONE OCEAN', 'Ermes Costello': 'STONE OCEAN',
  'Foo Fighters': 'STONE OCEAN', 'Weather Report': 'STONE OCEAN',
  'Emporio Alnino': 'STONE OCEAN', 'Enrico Pucci': 'STONE OCEAN',
  'Green Green Grass of Home': 'STONE OCEAN', 'Whitesnake': 'STONE OCEAN',
  'C-Moon': 'STONE OCEAN', 'Made in Heaven': 'STONE OCEAN',
  'Stone Free': 'STONE OCEAN', 'Kiss': 'STONE OCEAN',
  'Burning Down the House': 'STONE OCEAN', 'Diver Down': 'STONE OCEAN',
  'Miraschon': 'STONE OCEAN', 'Gwess': 'STONE OCEAN',
  'Goo Goo Dolls': 'STONE OCEAN', 'Narciso Anasui': 'STONE OCEAN',
  "Jolyne's Father": 'STONE OCEAN',
  // Steel Ball Run
  'Johnny Joestar': 'STEEL BALL RUN', 'Gyro Zeppeli': 'STEEL BALL RUN',
  'Funny Valentine': 'STEEL BALL RUN', 'Diego Brando': 'STEEL BALL RUN',
  'Scary Monsters': 'STEEL BALL RUN', 'Hot Pants': 'STEEL BALL RUN',
  'Cream Starter': 'STEEL BALL RUN', 'Mountain Tim': 'STEEL BALL RUN',
  'Oh! Lonesome Me': 'STEEL BALL RUN', 'Sandman': 'STEEL BALL RUN',
  'In a Silent Way': 'STEEL BALL RUN', 'Wekapipo': 'STEEL BALL RUN',
  'Magent Magent': 'STEEL BALL RUN', 'Axl RO': 'STEEL BALL RUN',
  'Civil War': 'STEEL BALL RUN', 'Scarlet Valentine': 'STEEL BALL RUN',
  'Lucy Steel': 'STEEL BALL RUN', 'Tusk': 'STEEL BALL RUN',
  'Ball Breaker': 'STEEL BALL RUN', 'D4C': 'STEEL BALL RUN',
  // Jojolion
  'Josuke Higashikata (Jojolion)': 'JOJOLION', 'Yasuho Hirose': 'JOJOLION',
  'Tooru': 'JOJOLION', 'Soft & Wet': 'JOJOLION',
  'Paisley Park': 'JOJOLION', 'Wonder of U': 'JOJOLION',
  'Jobin Higashikata': 'JOJOLION', 'Speed King': 'JOJOLION',
  'Norisuke Higashikata': 'JOJOLION', 'Tsurugi Higashikata': 'JOJOLION',
  'Paper Moon King': 'JOJOLION', 'Daiya Higashikata': 'JOJOLION',
  'California King Bed': 'JOJOLION', 'Joshu Higashikata': 'JOJOLION',
  'Nut King Call': 'JOJOLION', 'Akefu Satoru': 'JOJOLION',
  'Ojiro Kazo': 'JOJOLION', 'Fun Fun Fun': 'JOJOLION',
  'Doremifasolati Do': 'JOJOLION',
};

const DIVIDER_NAMES = {
  'PHANTOM BLOOD': '─── PHANTOM BLOOD ───',
  'BATTLE TENDENCY': '─── BATTLE TENDENCY ───',
  'STARDUST CRUSADERS': '─── STARDUST CRUSADERS ───',
  'DIAMOND IS UNBREAKABLE': '─── DIAMOND IS UNBREAKABLE ───',
  'GOLDEN WIND': '─── GOLDEN WIND ───',
  'STONE OCEAN': '─── STONE OCEAN ───',
  'STEEL BALL RUN': '─── STEEL BALL RUN ───',
  'JOJOLION': '─── JOJOLION ───',
};

let cachedRoles = {};

async function fetchAllRoles(guild) {
  const roles = await guild.roles.fetch();
  cachedRoles = {};
  roles.forEach(r => { cachedRoles[r.name] = r.id; });
  return cachedRoles;
}

async function updateDivider(member) {
  const guild = member.guild;
  if (!guild) return;

  await fetchAllRoles(guild);
  const memberRoleNames = member.roles.cache.map(r => r.name);

  // Find which part the user belongs to
  let part = null;
  for (const roleName of memberRoleNames) {
    if (CHAR_TO_PART[roleName]) {
      part = CHAR_TO_PART[roleName];
      break;
    }
  }

  // Remove all divider roles first
  for (const [partName, dividerName] of Object.entries(DIVIDER_NAMES)) {
    const divRoleId = cachedRoles[dividerName];
    if (divRoleId && member.roles.cache.has(divRoleId)) {
      await member.roles.remove(divRoleId).catch(() => null);
    }
  }

  // Apply the correct divider
  if (part && DIVIDER_NAMES[part]) {
    const divRoleId = cachedRoles[DIVIDER_NAMES[part]];
    if (divRoleId) {
      await member.roles.add(divRoleId).catch(() => null);
      console.log(`[Divider] Applied "${DIVIDER_NAMES[part]}" to ${member.user.tag}`);
    }
  }
}

// ═══════════════════════════════════════════════════════
// SLASH COMMANDS
// ═══════════════════════════════════════════════════════
const commands = [
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all bot commands'),
  new SlashCommandBuilder()
    .setName('roles')
    .setDescription('List all available character roles'),
  new SlashCommandBuilder()
    .setName('server')
    .setDescription('Show server info'),
  new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll')
    .addStringOption(opt => opt.setName('question').setDescription('Poll question').setRequired(true)),
  new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the Stand Arrow')
    .addStringOption(opt => opt.setName('question').setDescription('Your question').setRequired(true)),
];

const CHAR_ROLES_LIST = [
  // Phantom Blood
  'Jonathan Joestar', 'Dio Brando', 'Will A. Zeppeli', 'Speedwagon',
  'Erina Pendleton', 'George Joestar I', 'Bruford', 'Tarkus',
  'Dire', 'Straizo', 'Poco', 'Wang Chan',
  // Battle Tendency
  'Joseph Joestar', 'Caesar Zeppeli', 'Lisa Lisa', 'Wamuu', 'Kars',
  'Esidisi', 'Stroheim', 'Suzi Q', 'Messina', 'Loggins',
  // Stardust Crusaders
  'Jotaro Kujo', 'Star Platinum', 'Jean Pierre Polnareff', 'Silver Chariot',
  'Noriaki Kakyoin', 'Hierophant Green', 'Muhammad Avdol', 'Magician Red',
  'Iggy', 'The Fool', 'DIO', 'The World',
  'Old Joseph', 'Hermit Purple', 'Hol Horse', 'Emperor',
  'Boingo', 'Tohth', "Daniel D'Arby", "Telence D'Arby",
  'Vanilla Ice', 'Cream', 'Nukesaku', 'Alessi',
  'Mariah', 'Bastet', 'Midler', 'High Priestess',
  "N'Doul", 'Geb', 'Oingo', 'Khnum',
  'Anubis', 'Nena', 'The Lovers', 'Steely Dan',
  'J. Geil', 'Hanged Man',
  // Diamond Is Unbreakable
  'Josuke Higashikata', 'Crazy Diamond', 'Okuyasu Nijimura', 'The Hand',
  'Rohan Kishibe', "Heaven's Door", 'Koichi Hirose', 'Echoes',
  'Yoshikage Kira', 'Killer Queen', 'Hayato Kawajiri', 'Yukako Yamagishi',
  'Tonio Trussardi', 'Cure Kisses', 'Keicho Nijimura', 'Bad Company',
  'Akira Otoishi', 'Red Hot Chili Pepper', 'Toyohiro Kanedaichi', 'Super Fly',
  'Yoshihiro Kira', 'Stray Cat',
  // Golden Wind
  'Giorno Giovanna', 'Gold Experience', 'Bruno Bucciarati', 'Sticky Fingers',
  'Guido Mista', 'Sex Pistols', 'Narancia Ghirga', 'Aerosmith',
  'Leone Abbacchio', 'Moody Blues', 'Pannacotta Fugo', 'Purple Haze',
  'Diavolo', 'King Crimson', 'Trish Una', 'Spice Girl',
  'Risotto Nero', 'Metallica', 'Ghiaccio', 'White Album',
  'Melone', 'Baby Face', 'Formaggio', 'Little Feet',
  'Illuso', 'Man in the Mirror', 'Prosciutto', 'The Grateful Dead',
  'Pesci', 'Beach Boy', 'Squalo', 'Clash',
  'Tiziano', 'Talking Head', 'Cioccolata', 'Green Day',
  'Secco', 'Oasis',
  // Stone Ocean
  'Jolyne Cujoh', 'Ermes Costello', 'Foo Fighters', 'Weather Report',
  'Emporio Alnino', 'Enrico Pucci', 'Green Green Grass of Home', 'Whitesnake',
  'C-Moon', 'Made in Heaven', 'Stone Free', 'Kiss',
  'Burning Down the House', 'Diver Down', 'Miraschon', 'Gwess',
  'Goo Goo Dolls', 'Narciso Anasui', "Jolyne's Father",
  // Steel Ball Run
  'Johnny Joestar', 'Gyro Zeppeli', 'Funny Valentine', 'Diego Brando',
  'Scary Monsters', 'Hot Pants', 'Cream Starter', 'Mountain Tim',
  'Oh! Lonesome Me', 'Sandman', 'In a Silent Way', 'Wekapipo',
  'Magent Magent', 'Axl RO', 'Civil War', 'Scarlet Valentine',
  'Lucy Steel', 'Tusk', 'Ball Breaker', 'D4C',
  // Jojolion
  'Josuke Higashikata (Jojolion)', 'Yasuho Hirose', 'Tooru', 'Soft & Wet',
  'Paisley Park', 'Wonder of U', 'Jobin Higashikata', 'Speed King',
  'Norisuke Higashikata', 'Tsurugi Higashikata', 'Paper Moon King',
  'Daiya Higashikata', 'California King Bed', 'Joshu Higashikata',
  'Nut King Call', 'Akefu Satoru', 'Ojiro Kazo', 'Fun Fun Fun',
  'Doremifasolati Do',
];

// ═══════════════════════════════════════════════════════
// BOT EVENTS
// ═══════════════════════════════════════════════════════

client.once(Events.ClientReady, async () => {
  console.log(`🌹 ${client.user.tag} is online!`);
  client.user.setActivity('Yare yare daze... | /help', { type: 3 });

  // Register slash commands
  const rest = new REST({ version: '10' }).setToken(TOKEN);
  try {
    await rest.put(Routes.applicationGuildCommands(client.user.id, GUILD_ID), {
      body: commands.map(c => c.toJSON())
    });
    console.log('✓ Slash commands registered');
  } catch (e) {
    console.error('Failed to register commands:', e);
  }

  // Apply dividers to all existing members
  const guild = client.guilds.cache.get(GUILD_ID);
  if (guild) {
    const members = await guild.members.fetch();
    for (const [, member] of members) {
      if (!member.user.bot) {
        await updateDivider(member);
      }
    }
    console.log('✓ Dividers applied to all members');
  }
});

// Role changes → update divider
client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {
  if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
    await updateDivider(newMember);
  }
});

// New member joins
client.on(Events.GuildMemberAdd, async (member) => {
  if (!member.user.bot) {
    // Send welcome embed
    const channel = member.guild.channels.cache.find(c => c.name.includes('general'));
    if (channel) {
      await channel.send({
        embeds: [{
           title: 'Welcome to the Bizarre Adventure!',
          description: `Welcome **${member}**! You've entered a world of bizarre adventures.\n\nPick your character role in 🎭│role-select!`,
          color: 0xFFD700,
          image: { url: 'https://media.tenor.com/0LLm3nc6808AAAAM/jojo-bizarre-adventure.gif' },
           footer: { text: 'Yare yare daze...' }
        }]
      }).catch(() => null);
    }
  }
});

// Message commands
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!')) return;

  const args = message.content.slice(1).split(/\s+/);
  const cmd = args.shift().toLowerCase();

  if (cmd === 'help') {
    const embed = {
      title: 'JoJo Bot Commands',
      color: 0x9B59B6,
      fields: [
        { name: '!help', value: 'Show this help message', inline: true },
        { name: '!roles', value: 'List all character roles', inline: true },
        { name: '!server', value: 'Server info', inline: true },
        { name: '!8ball <q>', value: 'Ask the Stand Arrow', inline: true },
        { name: '!poll <q>', value: 'Create a poll', inline: true },
        { name: '!dividers', value: 'Refresh all role dividers', inline: true },
      ],
      footer: { text: 'Yare yare daze...' }
    };
    await message.reply({ embeds: [embed] });
  }

  if (cmd === 'roles') {
    const embed = {
      title: 'Character Roles',
      description: CHAR_ROLES_LIST.join('\n'),
      color: 0xFFD700,
      footer: { text: 'Pick yours in 🎭│role-select!' }
    };
    await message.reply({ embeds: [embed] });
  }

  if (cmd === 'server') {
    const guild = message.guild;
    const embed = {
      title: '🌹 ' + guild.name,
      color: 0xFFD700,
      fields: [
        { name: '👥 Members', value: String(guild.memberCount), inline: true },
        { name: '💬 Channels', value: String(guild.channels.cache.size), inline: true },
        { name: '📅 Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
      ],
      footer: { text: 'Yare yare daze...' }
    };
    await message.reply({ embeds: [embed] });
  }

  if (cmd === '8ball') {
    const answers = [
      'Yes, yes, yes! 🌹', 'No, no, no! 💀', 'Yare yare daze...',
      'The Stand Arrow has spoken!', 'Za Warudo says maybe...',
      'Muda muda muda! (No.)', 'Ora ora ora! (Yes!)',
      'Your Stand agrees.', 'Ask Speedwagon.',
      'Even Speedwagon would say yes!', 'This is the greatest high!',
    ];
    const embed = {
      title: 'The Stand Arrow Speaks...',
      description: answers[Math.floor(Math.random() * answers.length)],
      color: 0x9B59B6,
    };
    await message.reply({ embeds: [embed] });
  }

  if (cmd === 'poll') {
    const question = args.join(' ') || 'No question';
    const msg = await message.reply({
      embeds: [{
        title: 'Poll',
        description: question,
        color: 0x9B59B6,
        footer: { text: 'React with ✅ or ❌' }
      }]
    });
    await msg.react('✅');
    await msg.react('❌');
  }

  if (cmd === 'dividers') {
    if (!message.member.roles.cache.has(cachedRoles['Owner'])) {
      return message.reply('❌ Only the Owner can refresh dividers.');
    }
    const members = await message.guild.members.fetch();
    let count = 0;
    for (const [, member] of members) {
      if (!member.user.bot) {
        await updateDivider(member);
        count++;
      }
    }
    await message.reply(`✅ Refreshed dividers for ${count} members.`);
  }
});

// ═══════════════════════════════════════════════════════
// KEEP ALIVE (for Replit / free hosting)
// ═══════════════════════════════════════════════════════
if (process.env.KEEP_ALIVE === 'true') {
  const http = require('http');
  http.createServer((_, res) => { res.writeHead(200); res.end('🌹 Bot is alive!'); }).listen(3000);
  console.log('Keep-alive server on port 3000');
}

client.login(TOKEN);
