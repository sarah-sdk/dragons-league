export type User = {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type Profile = {
  userId: number;
  id: number;
  username: string;
  urlAvatar: string;
};

export type Specie = {
  id: number;
  specie: string;
  baseStrength: number;
  baseSpeed: number;
  baseStamina: number;
  urlBaby: string;
  urlAdult: string;
};

export type Training = {
  id: number;
  type: string;
};

export type Dragon = {
  id: number;
  name: string;
  strength: number;
  speed: number;
  stamina: number;
  specieId: number;
  profileId: number;
  userId: number;
};

export type DragonTraining = {
  id: number;
  userId: number;
  profileId: number;
  dragonId: number;
  trainingId: number;
  strengthEarned: number;
  speedEarned: number;
  staminaEarned: number;
};

export type JwtPayload = {
  email: string;
  isAdmin: boolean;
};
