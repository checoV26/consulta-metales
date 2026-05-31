const ejecutarHelp = async (msg, bot) => {
  const mensaje = `
🤖 CONSULTA DE METALES

═══════════════════
🟡 ORO
═══════════════════

/oro
Consulta los precios actuales de:

• Oro 24K
• Oro 22K
• Oro 18K
• Oro 14K
• Oro 10K

Incluye:

💰 Precio por gramo
⚖️ Precio por onza
📏 Porcentaje de pureza

═══════════════════
🟡 PRECIO DE ORO EN QUILATES INDIVIDUALES
═══════════════════

/oro 24
Consulta únicamente el precio
actual del oro de 24K.

/oro 22
Consulta únicamente el precio
actual del oro de 22K.

/oro 18
Consulta únicamente el precio
actual del oro de 18K.

/oro 14
Consulta únicamente el precio
actual del oro de 14K.

/oro 10
Consulta únicamente el precio
actual del oro de 10K.

═══════════════════
⚪ PLATA
═══════════════════

/plata
Consulta el precio actual de
la plata.


═══════════════════
🧮 CALCULADORA
═══════════════════

Formato Oro:

/oro [quilates] [gramos]
Ejemplo:
/oro 18 7.5

Formato Comparación:

/oro [quilates] [gramos] [precio]
Ejemplo:
/oro 14 4.9 7000

Formato Plata:
/plata [gramos]
Ejemplo:
/plata 150

Comparación Plata:

/plata [gramos] [precio]
Ejemplo:
/plata 150 4200

═══════════════════
🔧 SISTEMA
═══════════════════

/help
Muestra esta ayuda.

/ping
Verifica que el bot está activo.

═══════════════════
📚 CONCEPTOS
═══════════════════

/spot

Explica qué es el valor Spot y
cómo utilizarlo al comprar oro
o plata en México.

/quilates

Explica qué significan los quilates
y cómo afectan el valor del oro.
`;

  await bot.sendMessage(msg.chat.id, mensaje);
};

module.exports = ejecutarHelp;
