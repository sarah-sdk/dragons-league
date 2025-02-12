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
  const { name } = params;

  const userId = 1;
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/dragons?name=${name}`,
  );
  const dragons = await response.json();

  if (dragons.length === 0) {
    throw new Error("Dragon not found");
  }

  const dragon = dragons[0];
  const dragonId = dragon.id;

  const dragonDetailsResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/dragons/${dragonId}`,
  );
  const dragonDetails = await dragonDetailsResponse.json();

  return { dragon: dragonDetails };
};

export const loadSpecies = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/species`);
  const species = await response.json();
  console.info(species);
  return { species };
};
