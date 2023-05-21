export function calcularDistancia(lat1, lon1, lat2, lon2) {
  const radioTierra = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180; // Diferencia de latitud en radianes
  const dLon = ((lon2 - lon1) * Math.PI) / 180; // Diferencia de longitud en radianes
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = radioTierra * c; // Distancia en km
  return distancia;
}

export function isInArea(lat1, lon1, lat2, lon2, km) {
  let distancia = calcularDistancia(lat1, lon1, lat2, lon2);
  return distancia <= km;
}
