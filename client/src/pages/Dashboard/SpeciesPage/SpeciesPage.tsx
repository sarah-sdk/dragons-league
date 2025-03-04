import AddSpeciesForm from "../../../components/Dashboard/Species/AddSpeciesForm";
import SpeciesTable from "../../../components/Dashboard/Species/SpeciesTable";

export default function SpeciesPage() {
  return (
    <>
      <h2>Espèces :</h2>
      <SpeciesTable />
      <AddSpeciesForm />
    </>
  );
}
