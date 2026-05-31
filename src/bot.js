const bot = require("./config/telegram");
const ejecutarHelp = require("./commands/help.command");
const ejecutarOro = require("./commands/oro.command");
const ejecutarPlata = require("./commands/plata.command");
const ejecutarSpot = require("./commands/spot.command");
const ejecutarQuilates = require("./commands/quilates.command");

console.log("🤖 Bot iniciado correctamente");

bot.onText(/^\/start$/, async (msg) => {
  await ejecutarHelp(msg, bot);
});

bot.onText(/^\/help$/, async (msg) => {
  await ejecutarHelp(msg, bot);
});

bot.onText(/^\/ping$/, async (msg) => {
  await bot.sendMessage(msg.chat.id, "🏓 Pong");
});

/*
|--------------------------------------------------------------------------
| ORO
|--------------------------------------------------------------------------
*/

// /oro 14 4.9 7000

bot.onText(
  /^\/oro (10|14|18|22|24) ([0-9]+(?:\.[0-9]+)?) ([0-9]+(?:\.[0-9]+)?)$/,
  async (msg, match) => {
    await ejecutarOro(
      msg,
      bot,
      parseInt(match[1]),
      parseFloat(match[2]),
      parseFloat(match[3]),
    );
  },
);

// /oro 14 4.9

bot.onText(
  /^\/oro (10|14|18|22|24) ([0-9]+(?:\.[0-9]+)?)$/,
  async (msg, match) => {
    await ejecutarOro(msg, bot, parseInt(match[1]), parseFloat(match[2]));
  },
);

// /oro 14

bot.onText(/^\/oro (10|14|18|22|24)$/, async (msg, match) => {
  await ejecutarOro(msg, bot, parseInt(match[1]));
});

// /oro

bot.onText(/^\/oro$/, async (msg) => {
  await ejecutarOro(msg, bot);
});

/*
|--------------------------------------------------------------------------
| PLATA
|--------------------------------------------------------------------------
*/

// /plata 125 3800

bot.onText(
  /^\/plata ([0-9]+(?:\.[0-9]+)?) ([0-9]+(?:\.[0-9]+)?)$/,
  async (msg, match) => {
    await ejecutarPlata(msg, bot, parseFloat(match[1]), parseFloat(match[2]));
  },
);

// /plata 125

bot.onText(/^\/plata ([0-9]+(?:\.[0-9]+)?)$/, async (msg, match) => {
  await ejecutarPlata(msg, bot, parseFloat(match[1]));
});

// /plata

bot.onText(/^\/plata$/, async (msg) => {
  await ejecutarPlata(msg, bot);
});

bot.onText(/^\/spot$/, async (msg) => {
  await ejecutarSpot(msg, bot);
});

bot.onText(/^\/quilates$/, async (msg) => {
  await ejecutarQuilates(msg, bot);
});
/*
|--------------------------------------------------------------------------
| COMANDOS INVÁLIDOS
|--------------------------------------------------------------------------
*/

bot.on("message", async (msg) => {
  const texto = msg.text;

  if (!texto) {
    return;
  }

  // Ignorar mensajes que no sean comandos
  if (!texto.startsWith("/")) {
    return;
  }

  const comandosValidos = [
    /^\/start$/,
    /^\/help$/,
    /^\/ping$/,

    /^\/oro$/,
    /^\/oro (10|14|18|22|24)$/,
    /^\/oro (10|14|18|22|24) ([0-9]+(?:\.[0-9]+)?)$/,
    /^\/oro (10|14|18|22|24) ([0-9]+(?:\.[0-9]+)?) ([0-9]+(?:\.[0-9]+)?)$/,

    /^\/plata$/,
    /^\/plata ([0-9]+(?:\.[0-9]+)?)$/,
    /^\/plata ([0-9]+(?:\.[0-9]+)?) ([0-9]+(?:\.[0-9]+)?)$/,
    /^\/spot$/,
    /^\/quilates$/,
  ];

  const esValido = comandosValidos.some((regex) => regex.test(texto));

  if (esValido) {
    return;
  }

  await bot.sendMessage(
    msg.chat.id,
    `
<b>❌ Comando no válido</b>

Utiliza <code>/help</code> para consultar los comandos disponibles.
`,
    {
      parse_mode: "HTML",
    },
  );
});
