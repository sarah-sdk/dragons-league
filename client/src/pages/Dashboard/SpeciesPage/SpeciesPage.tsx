import { useEffect, useState } from "react";
import AddSpeciesForm from "../../../components/Dashboard/Species/AddSpeciesForm";
import SpecieDisplay from "../../../services/SpecieDisplay";
import type { Specie } from "../../../types/types";

export default function SpeciesPage() {
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
    <>
      <h2>Espèces :</h2>
      <table>
        <thead>
          <tr>
            <th>Espèce</th>
            <th>Force de base</th>
            <th>Vitesse de base</th>
            <th>Endurance de base</th>
            <th>Image version bébé</th>
            <th>Image version adulte</th>
          </tr>
        </thead>
        <tbody>
          {species.map((specie) => (
            <tr key={specie.id}>
              <td>
                <SpecieDisplay specie={specie.specie} />
              </td>
              <td>{specie.base_strength}</td>
              <td>{specie.base_speed}</td>
              <td>{specie.base_stamina}</td>
              <td>
                <img
                  src={`${import.meta.env.VITE_API_URL}/${specie.url_baby}`}
                  alt={`${specie.specie} bébé`}
                />
              </td>
              <td>
                <img
                  src={`${import.meta.env.VITE_API_URL}/${specie.url_adult}`}
                  alt={`${specie.specie} adulte`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddSpeciesForm />
    </>
  );
}
