import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'devshelf:recursos';

// Obtiene todos los recursos almacenados o un arreglo vacío si no existen o hay error
export function getAll() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : []; //condicion operador ternario (if-else)
  } catch {
    return [];
  }
}

// Crea y persiste un nuevo recurso con id y fechaCreacion generados
export function create(data) {
  const items = getAll();
  const newItem = {
    ...data,
    id: uuidv4(),
    fechaCreacion: new Date().toISOString(),
  };
  items.push(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return newItem;
}

// Obtiene métricas del total de recursos, favoritos y cantidad de temas únicos
export function getStats() {
  const items = getAll();
  const total = items.length;
  const favoritos = items.filter((item) => Boolean(item.favorito)).length;
  const temas = new Set(items.map((item) => item.tema).filter(Boolean)).size;

  return { total, favoritos, temas };
}
