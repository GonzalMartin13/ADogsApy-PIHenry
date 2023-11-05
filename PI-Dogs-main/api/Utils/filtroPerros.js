const perroLimpio = (perro) => {
    // Verificar si el objeto proviene de la base de datos
    if (perro?.ID) {
      return {
        id: perro.ID,
        name: perro.name,
        años: perro.añosdevida,
        img: perro.img,
        peso: perro.peso,
        altura: perro.altura,
        temperamento: perro.Temperaments.map((temp) => temp.name),
      };
    }
    // Verificar si el objeto proviene de la API
    else if (perro?.id) {
      return {
        id: perro.id,
        name: perro.name,
        años: perro.life_span,
        img: perro.image.url,
        peso: perro.weight.metric,
        altura: perro.height.metric,
        temperamento: perro.temperament,
      };
    } else {
      return {}; // Manejo de casos inesperados
    }
  };
  
  module.exports = perroLimpio;
  