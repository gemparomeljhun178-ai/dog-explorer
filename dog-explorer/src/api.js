const BASE = import.meta.env.VITE_DOG_API_URL || "https://dog.ceo/api";

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message || "API error");
  return data.message;
}

export async function getAllBreeds() {
  const map = await get("/breeds/list/all");
  return Object.entries(map).map(([name, subs]) => ({ name, subs }));
}
export const getRandomImage = (breed) => get(`/breed/${breed}/images/random`);
export const getBreedImages = (breed, sub) =>
  get(sub ? `/breed/${breed}/${sub}/images` : `/breed/${breed}/images`);
