import { useEffect, useState } from "react";
import type { Specie } from "../../../types/types";
import SpecieCell from "./SpecieCell";

export default function SpeciesTable() {
  const [species, setSpecies] = useState<Specie[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/species`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setSpecies(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Espèce</th>
          <th>Force de base</th>
          <th>Vitesse de base</th>
          <th>Endurance de base</th>
          <th>Image version bébé</th>
          <th>Image version adulte</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {species.map((specie) => (
          <SpecieCell key={specie.id} specie={specie} />
        ))}
      </tbody>
    </table>
  );
}
