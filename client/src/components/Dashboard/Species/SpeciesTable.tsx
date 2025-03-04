import { useLoaderData } from "react-router-dom";
import type { Specie } from "../../../types/types";
import SpecieCell from "./SpecieCell";

export default function SpeciesTable() {
  const { species } = useLoaderData() as { species: Specie[] };

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
