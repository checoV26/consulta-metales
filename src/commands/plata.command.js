const { obtenerPrecioPlata } = require("../services/metal.service");

const ONZA_TROY = 31.1035;

const ejecutarPlata = async (msg, bot, gramos = null, precioCompra = null) => {
  try {
    const datos = await obtenerPrecioPlata();

    const fecha = new Date(datos.timestamp * 1000).toLocaleString("es-MX");

    /*
    |--------------------------------------------------------------------------
    | /plata
    |--------------------------------------------------------------------------
    */

    if (!gramos) {
      const mensaje = `
⚪ PLATA

💰 Precio por gramo
$${datos.precioGramo.toFixed(2)} MXN

⚖️ Precio por onza
$${datos.precioOnza.toFixed(2)} MXN

📅 Actualizado
${fecha}
`;

      return await bot.sendMessage(msg.chat.id, mensaje);
    }

    /*
    |--------------------------------------------------------------------------
    | /plata 120
    | /plata 120 4500
    |--------------------------------------------------------------------------
    */

    const valorSpot = datos.precioGramo * gramos;

    let mensaje = `
⚪ PLATA

⚖️ Peso
${gramos.toFixed(2)} g

💰 Precio por gramo
$${datos.precioGramo.toFixed(2)} MXN

⚖️ Precio por onza
$${datos.precioOnza.toFixed(2)} MXN

💎 Valor Spot
$${valorSpot.toFixed(2)} MXN
`;

    if (precioCompra) {
      const diferencia = valorSpot - precioCompra;

      const porcentajeSpot = (precioCompra / valorSpot) * 100;

      const referencia80Spot = valorSpot * 0.8;

      const precioPorGramoPagado = precioCompra / gramos;

      mensaje += `

💵 Precio ofrecido
$${precioCompra.toFixed(2)} MXN

📊 Spot Pagado
${porcentajeSpot.toFixed(2)}%

🎯 Referencia 80% del Spot
$${referencia80Spot.toFixed(2)} MXN

⚖️ Precio por gramo pagado
$${precioPorGramoPagado.toFixed(2)} MXN/g
`;

      if (diferencia >= 0) {
        mensaje += `

📈 Diferencia
+$${diferencia.toFixed(2)} MXN
`;
      } else {
        mensaje += `

📉 Diferencia
-$${Math.abs(diferencia).toFixed(2)} MXN
`;
      }

      let recomendacion = "";

      if (porcentajeSpot <= 60) {
        recomendacion = "🟢 Excelente oportunidad";
      } else if (porcentajeSpot <= 75) {
        recomendacion = "🟢 Buena compra";
      } else if (porcentajeSpot <= 90) {
        recomendacion = "🟡 Precio razonable";
      } else if (porcentajeSpot <= 100) {
        recomendacion = "🟠 Muy cerca del valor spot";
      } else {
        recomendacion = "🔴 Por encima del valor spot";
      }

      mensaje += `

${recomendacion}
`;
    }

    mensaje += `

📅 Actualizado
${fecha}
`;

    await bot.sendMessage(msg.chat.id, mensaje);
  } catch (error) {
    console.error("Error consultando plata:", error);

    await bot.sendMessage(
      msg.chat.id,
      "❌ Error al consultar el precio de la plata.",
    );
  }
};

module.exports = ejecutarPlata;
