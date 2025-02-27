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

export default { checkIfLoggedIn };
