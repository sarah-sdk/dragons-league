import trash from "/delete.svg";
import edit from "/edit.svg";
import SpecieDisplay from "../../../services/SpecieDisplay";
import type { Specie } from "../../../types/types";

export default function SpecieCell({
  specie,
  onEdit,
  onDelete,
}: { specie: Specie; onEdit: () => void; onDelete: () => void }) {
  return (
    <tr>
      <td>
        <SpecieDisplay specie={specie.specie} />
      </td>
      <td>{specie.baseStrength}</td>
      <td>{specie.baseSpeed}</td>
      <td>{specie.baseStamina}</td>
      <td>
        <img
          src={`${import.meta.env.VITE_API_URL}/${specie.urlBaby}`}
          alt={`${specie.specie} bébé`}
        />
      </td>
      <td>
        <img
          src={`${import.meta.env.VITE_API_URL}/${specie.urlAdult}`}
          alt={`${specie.specie} adulte`}
        />
      </td>
      <td>
        <button type="button" className="btnEdit" onClick={onEdit}>
          <img src={edit} alt="Modifier une espèce" className="actions" />
        </button>
        <button type="button" className="btnDelete" onClick={onDelete}>
          <img src={trash} alt="Supprimer une espèce" className="actions" />
        </button>
      </td>
    </tr>
  );
}
