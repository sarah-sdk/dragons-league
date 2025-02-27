const checkIfLoggedIn = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/check`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    return response.ok;
  } catch (error) {
    console.error("Erreur de vérification de l'authentification:", error);
    return false;
  }
};

const fetchProfile = async () => {
  try {
    const authResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/me`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!authResponse.ok) throw new Error("Utilisateur non authentifié");

    const authData = await authResponse.json();

    return { userId: authData.userId, isAdmin: authData.isAdmin };
  } catch (error) {
    console.error("Erreur d'authentification", error);
  }
};

export default { checkIfLoggedIn, fetchProfile };
