function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function SpecieDisplay({ specie }: { specie: string }) {
  const formattedSpecie = capitalizeFirstLetter(specie);
  return formattedSpecie;
}
