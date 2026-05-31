const axios = require("axios");

const API_URL = "https://www.goldapi.io/api";

const HEADERS = {
  "x-access-token": process.env.GOLD_API_KEY,
  "Content-Type": "application/json",
};

const obtenerPrecioOro = async () => {
  const { data } = await axios.get(`${API_URL}/XAU/MXN`, {
    headers: HEADERS,
  });

  return {
    precioOnza: data.price,
    precioGramo24k: data.price_gram_24k,
    timestamp: data.timestamp,
  };
};

const obtenerPrecioPlata = async () => {
  const { data } = await axios.get(`${API_URL}/XAG/MXN`, {
    headers: HEADERS,
  });

  return {
    precioOnza: data.price,
    precioGramo: data.price / 31.1035,
    timestamp: data.timestamp,
  };
};

const obtenerPureza = (quilates) => {
  const purezas = {
    24: 1,
    22: 0.9167,
    18: 0.75,
    14: 0.585,
    10: 0.417,
  };

  return purezas[quilates] || 1;
};

const calcularPrecioPorQuilataje = (precio24k, quilates) => {
  return precio24k * obtenerPureza(quilates);
};

module.exports = {
  obtenerPrecioOro,
  obtenerPrecioPlata,
  obtenerPureza,
  calcularPrecioPorQuilataje,
};
