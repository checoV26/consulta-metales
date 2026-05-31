require("dotenv").config();

process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled Rejection:", error);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
});

const variablesRequeridas = ["TELEGRAM_TOKEN", "GOLD_API_KEY"];

const faltantes = variablesRequeridas.filter(
  (variable) => !process.env[variable],
);

if (faltantes.length > 0) {
  console.error(`❌ Faltan variables de entorno: ${faltantes.join(", ")}`);

  process.exit(1);
}

console.log("🤖 Iniciando bot de consulta de metales...");

require("./src/bot");

console.log("✅ Bot iniciado correctamente");
