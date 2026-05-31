const {
  obtenerPrecioOro,
  obtenerPureza,
  calcularPrecioPorQuilataje,
} = require("../services/metal.service");

const ONZA_TROY = 31.1035;

const ejecutarOro = async (
  msg,
  bot,
  quilates = null,
  gramos = null,
  precioCompra = null,
) => {
  try {
    const datos = await obtenerPrecioOro();

    const fecha = new Date(datos.timestamp * 1000).toLocaleString("es-MX");

    /*
    |--------------------------------------------------------------------------
    | /oro
    |--------------------------------------------------------------------------
    */

    if (!quilates) {
      const listaQuilates = [24, 22, 18, 14, 10];

      let mensaje = "🟡 ORO - PRECIOS ACTUALES\n\n";

      listaQuilates.forEach((k) => {
        const precioGramo = calcularPrecioPorQuilataje(datos.precioGramo24k, k);

        const precioOnza = precioGramo * ONZA_TROY;

        const pureza = obtenerPureza(k) * 100;

        mensaje +=
          `${k}K (${pureza.toFixed(2)}%)\n` +
          `💰 $${precioGramo.toFixed(2)} MXN/g\n` +
          `⚖️ $${precioOnza.toFixed(2)} MXN/oz\n\n`;
      });

      mensaje += `📅 Actualizado\n${fecha}`;

      return await bot.sendMessage(msg.chat.id, mensaje);
    }

    const precioGramo = calcularPrecioPorQuilataje(
      datos.precioGramo24k,
      quilates,
    );

    const precioOnza = precioGramo * ONZA_TROY;

    const pureza = obtenerPureza(quilates) * 100;

    /*
    |--------------------------------------------------------------------------
    | /oro 14
    |--------------------------------------------------------------------------
    */

    if (!gramos) {
      const mensaje = `
🟡 ORO ${quilates}K

📏 Pureza
${pureza.toFixed(2)}%

💰 Precio por gramo
$${precioGramo.toFixed(2)} MXN

⚖️ Precio por onza
$${precioOnza.toFixed(2)} MXN

📅 Actualizado
${fecha}
`;

      return await bot.sendMessage(msg.chat.id, mensaje);
    }

    /*
    |--------------------------------------------------------------------------
    | /oro 14 4.9
    | /oro 14 4.9 7000
    |--------------------------------------------------------------------------
    */

    const valorSpot = precioGramo * gramos;

    let mensaje = `
🟡 ORO ${quilates}K

📏 Pureza
${pureza.toFixed(2)}%

⚖️ Peso
${gramos.toFixed(2)} g

💰 Precio por gramo
$${precioGramo.toFixed(2)} MXN

⚖️ Precio por onza
$${precioOnza.toFixed(2)} MXN

💎 Valor Spot
$${valorSpot.toFixed(2)} MXN
`;

    if (precioCompra) {
      const diferencia = valorSpot - precioCompra;

      const porcentajeSpot = (precioCompra / valorSpot) * 100;

      const precioMaximoRecomendado = valorSpot * 0.8;

      const precioEquilibrio = precioCompra / gramos;

      mensaje += `

💵 Precio ofrecido
$${precioCompra.toFixed(2)} MXN

📊 Spot Pagado
${porcentajeSpot.toFixed(2)}%

🎯 Precio máximo recomendado (80%)
$${precioMaximoRecomendado.toFixed(2)} MXN

⚖️ Precio por gramo pagado
$${precioEquilibrio.toFixed(2)} MXN/g
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
    console.error("Error consultando oro:", error);

    await bot.sendMessage(
      msg.chat.id,
      "❌ Error al consultar el precio del oro.",
    );
  }
};

module.exports = ejecutarOro;
