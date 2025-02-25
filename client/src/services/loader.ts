import type { Params } from "react-router-dom";

const getUserId = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Utilisateur introuvable");
  }

  const data = await response.json();
  return data.userId;
};

export const loadProfiles = async () => {
  const userId = await getUserId();

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/profiles`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const profiles = await response.json();
  return { profiles };
};

export const loadProfile = async () => {
  const userId = await getUserId();
  const profileId = localStorage.getItem("profileId");

  if (!profileId) {
    throw new Error("Profil non trouvable");
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/profiles/${profileId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const profile = await response.json();

  return { profile };
};

export const loadSpecies = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/species`, {
    method: "GET",
    credentials: "include",
  });
  const species = await response.json();
  return { species };
};

export const loadAllDragons = async () => {
  const userId = await getUserId();
  const profileId = localStorage.getItem("profileId");

  if (!profileId) {
    throw new Error("Profile not found");
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/profiles/${profileId}/dragons`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const dragons = await response.json();
  return { dragons };
};

export const loadDragonDetails = async ({ params }: { params: Params }) => {
  const { dragonId } = params;

  const userId = await getUserId();
  const profileId = localStorage.getItem("profileId");

  if (!profileId) {
    throw new Error("Profil non trouvable");
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/profiles/${profileId}/dragons/${dragonId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const dragon = await response.json();
  return { dragon };
};
