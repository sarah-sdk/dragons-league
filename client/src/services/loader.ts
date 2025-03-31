import type { Params } from "react-router-dom";
import authServices from "./authServices";

const handleResponseError = (response: Response) => {
  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = "/connexion";
    }
    throw new Error("Erreur de récupération des données");
  }
};

const getUserInfo = async () => {
  const userData = await authServices.fetchUserData();
  return userData?.userId;
};

export const loadProfiles = async () => {
  const userId = await getUserInfo();

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}/profiles`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  handleResponseError(response);

  const profiles = await response.json();
  return { profiles };
};

export const loadProfile = async () => {
  const userId = await getUserInfo();
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
  handleResponseError(response);

  const profile = await response.json();

  return { profile };
};

export const loadSpecies = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/species`, {
    method: "GET",
    credentials: "include",
  });
  handleResponseError(response);

  const species = await response.json();
  return { species };
};

export const loadAllDragons = async () => {
  const userId = await getUserInfo();
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
  handleResponseError(response);

  const dragons = await response.json();
  return { dragons };
};

export const loadDragonDetails = async ({ params }: { params: Params }) => {
  const { dragonId } = params;

  const userId = await getUserInfo();
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
  handleResponseError(response);

  const dragon = await response.json();
  return { dragon, userId, profileId };
};

const loadTrainings = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/trainings`,
    { method: "GET", credentials: "include" },
  );

  handleResponseError(response);

  const trainings = await response.json();
  return { trainings };
};

export const loadDragonAndTrainings = async ({
  params,
}: { params: Params }) => {
  const [dragonData, trainingsData] = await Promise.all([
    loadDragonDetails({ params }),
    loadTrainings(),
  ]);

  return { ...dragonData, ...trainingsData };
};
