const ejecutarQuilates = async (msg, bot) => {
  const mensaje = `
🟡 ¿QUÉ SON LOS QUILATES?

Los quilates indican la cantidad
de oro puro contenida en una pieza.

═══════════════════

24K = 99.9% Oro puro

22K = 91.67% Oro puro

18K = 75.00% Oro puro

14K = 58.50% Oro puro

10K = 41.70% Oro puro

═══════════════════

Mientras mayor sea el quilataje,
mayor será el contenido de oro
y mayor será su valor.

Ejemplo:

Una cadena de 14K y otra de 18K
con el mismo peso NO valen lo mismo.

La de 18K contiene más oro puro.
`;

  await bot.sendMessage(msg.chat.id, mensaje);
};

module.exports = ejecutarQuilates;
