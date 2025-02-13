import type { Dragon } from "../types/types";

export default function getDragonImage({ dragon }: { dragon: Dragon }) {
  const { strength, speed, stamina } = dragon;
  const isAdult = strength >= 9 && speed >= 9 && stamina >= 9;
  return isAdult ? dragon.url_adult : dragon.url_baby;
}
