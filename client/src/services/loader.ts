import type { Params } from "react-router-dom";

export const loadAllDragons = async () => {
  const userId = 1;
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/dragons`,
  );
  const dragons = await response.json();
  console.info(dragons);
  return { dragons };
};

export const loadDragonDetails = async ({ params }: { params: Params }) => {
  const { id } = params;

  const userId = 1;
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/dragons/${id}`,
  );

  const dragon = response.json();

  return { dragon };
};

export const loadSpecies = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/species`);
  const species = await response.json();
  console.info(species);
  return { species };
};
