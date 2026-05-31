const ejecutarSpot = async (msg, bot) => {
  const mensaje = `
💎 ¿QUÉ ES EL VALOR SPOT?

El valor Spot es el precio actual del metal puro
en el mercado internacional.

Tu bot utiliza este valor para estimar cuánto vale
el metal contenido en una pieza de oro o plata.

⚠️ Importante

El valor Spot NO incluye:

• Mano de obra
• Diseño
• Piedras preciosas
• Marca
• Impuestos
• Ganancia del vendedor

═══════════════════
📖 EJEMPLO
═══════════════════

Supongamos:

Oro 14K
Peso: 5 gramos

El bot calcula:

💎 Valor Spot
$9,000 MXN

Si te ofrecen la pieza en:

💵 $6,500 MXN

Entonces estarías pagando:

📊 72.22% del Spot

Lo que permite comparar el precio
contra el valor real del metal.

═══════════════════
ℹ️ COMANDO
═══════════════════

/oro 14 5 6500

/plata 120 3500
`;

  await bot.sendMessage(msg.chat.id, mensaje);
};

module.exports = ejecutarSpot;
