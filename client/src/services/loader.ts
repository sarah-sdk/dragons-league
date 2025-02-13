import type { Params } from "react-router-dom";

export const loadAllDragons = async () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    throw new Error("Utilisateur non trouvable");
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/dragons`,
  );
  const dragons = await response.json();
  return { dragons };
};

export const loadDragonDetails = async ({ params }: { params: Params }) => {
  const { dragonId } = params;

  const userId = localStorage.getItem("userId");

  if (!userId) {
    throw new Error("Utilisateur non trouvable");
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/dragons/${dragonId}`,
  );

  const dragon = await response.json();
  return { dragon };
};

export const loadSpecies = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/species`);
  const species = await response.json();
  return { species };
};

export const loadUsers = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
  const users = await response.json();
  console.info(users);
  return { users };
};
