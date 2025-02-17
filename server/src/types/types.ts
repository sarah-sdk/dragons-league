export type User = {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type Profile = {
  user_id: number;
  id: number;
  username: string;
  url_avatar: string;
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
  profile_id: number;
  user_id: number;
};

export type DragonTraining = {
  id: number;
  user_id: number;
  profile_id: number;
  dragon_id: number;
  training_id: number;
  strength_earned: number;
  speed_earned: number;
  stamina_earned: number;
};
