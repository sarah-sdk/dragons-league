import type { Params } from "react-router-dom";

export const loadUsers = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
  const users = await response.json();
  return { users };
};

export const loadUser = async () => {
  const profileId = localStorage.getItem("profileId");

  if (!profileId) {
    throw new Error("Utilisateur non trouvable");
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${profileId}`,
  );
  const user = await response.json();

  return { user };
};

export const loadSpecies = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/species`);
  const species = await response.json();
  return { species };
};

export const loadAllDragons = async () => {
  const profileId = localStorage.getItem("profileId");

  if (!profileId) {
    throw new Error("User not found");
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${profileId}/dragons`,
  );
  const dragons = await response.json();
  return { dragons };
};

export const loadDragonDetails = async ({ params }: { params: Params }) => {
  const { dragonId } = params;

  const profileId = localStorage.getItem("profileId");

  if (!profileId) {
    throw new Error("Utilisateur non trouvable");
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${profileId}/dragons/${dragonId}`,
  );

  const dragon = await response.json();
  return { dragon };
};
