import type { Params } from "react-router-dom";

export const loadProfiles = async () => {
  const userId = 1;

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/profiles`,
    {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    },
  );
  const profiles = await response.json();
  return { profiles };
};

export const loadProfile = async () => {
  const profileId = localStorage.getItem("profileId");
  const userId = 1;

  if (!profileId) {
    throw new Error("Profil non trouvable");
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/profiles/${profileId}`,
  );
  const profile = await response.json();

  return { profile };
};

export const loadSpecies = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/species`);
  const species = await response.json();
  return { species };
};

export const loadAllDragons = async () => {
  const profileId = localStorage.getItem("profileId");
  const userId = 1;

  if (!profileId) {
    throw new Error("Profile not found");
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/profiles/${profileId}/dragons`,
  );
  const dragons = await response.json();
  return { dragons };
};

export const loadDragonDetails = async ({ params }: { params: Params }) => {
  const { dragonId } = params;

  const profileId = localStorage.getItem("profileId");
  const userId = 1;

  if (!profileId) {
    throw new Error("Profil non trouvable");
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/profiles/${profileId}/dragons/${dragonId}`,
  );

  const dragon = await response.json();
  return { dragon };
};
