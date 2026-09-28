import axios from "axios";

export const buscarOfertasService = async (filtros) => {
  const { busqueda, ubicacion, page } = filtros;

  const apiUrl = process.env.JOOBLE_API_URL;
  const apiKey = process.env.JOOBLE_API_KEY;

  if (!apiUrl || !apiKey) {
    const error = new Error(
      "El servicio de ofertas no está configurado"
    );
    error.status = 503;
    throw error;
  }

  let respuesta;

  try {
    respuesta = await axios.post(
      `${apiUrl}/${apiKey}`,
      {
        keywords: busqueda,
        location: ubicacion,
        page
      },
      {
        timeout: 10000
      }
    );
  } catch (error) {
    const errorServicio = new Error(
      "No se pudo consultar Jooble. Intentá nuevamente más tarde"
    );
    errorServicio.status = 503;
    throw errorServicio;
  }

  const ofertas = respuesta.data.jobs.map((oferta) => ({
    idExterno: oferta.id,
    puesto: oferta.title,
    empresa: oferta.company,
    descripcion: oferta.snippet,
    enlace: oferta.link,
    ubicacion: oferta.location
  }));

  return {
    ofertas,
    page,
    total: respuesta.data.totalCount
  };
};