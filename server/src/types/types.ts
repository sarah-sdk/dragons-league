export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type Specie = {
  id: number;
  specie: string;
  base_strength: number;
  base_speed: number;
  base_stamina: number;
  url_baby: string;
  url_adult: string;
};

export type Training = {
  id: number;
  training_type: string;
};

export type Dragon = {
  id: number;
  name: string;
  strength: number;
  speed: number;
  stamina: number;
  specie_id: number;
  user_id: number;
};
