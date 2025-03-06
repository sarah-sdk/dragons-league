import type { Specie } from "../../../types/types";
import SpecieCell from "./SpecieCell";

type SpeciesPageType = {
  onEdit: (specieId: number) => void;
  onDelete: (specieId: number) => void;
  species: Specie[];
};

export default function SpeciesTable({
  onEdit,
  onDelete,
  species,
}: SpeciesPageType) {
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
          <SpecieCell
            key={specie.id}
            specie={specie}
            onEdit={() => onEdit(+specie.id)}
            onDelete={() => onDelete(+specie.id)}
          />
        ))}
      </tbody>
    </table>
  );
}
