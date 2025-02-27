import type { ChangeEvent } from "react";

export type RouteType = {
  element: React.ReactElement;
};

export type ValidationCriteria = {
  email: string;
  passwordLength: string;
  passwordLowercase: string;
  passwordUppercase: string;
  passwordNumber: string;
  passwordSpecialChar: string;
  confirmPassword?: string;
};

export type User = {
  id: string;
};

export type Profile = {
  id: string;
  username: string;
  url_avatar: string;
};

export type Dragon = {
  name: string;
  specie: string;
  strength: number;
  stamina: number;
  speed: number;
  url_baby: string;
  url_adult: string;
  adopted_at: string;
  dragon_id: string;
};

export type Specie = {
  id: string;
  specie: string;
  base_strength: number;
  base_speed: number;
  base_stamina: number;
  url_adult: string;
};

export type AdoptionType = {
  specie: Specie;
  onClick: () => void;
};

export type ModalType = {
  isOpen: boolean;
  onClose: () => void;
  specieImage: string;
  specieName: string;
  specieId: string;
  onNameChange: (name: string) => void;
  dragonName: string;
  onAdopt: (name: string, specieName: string) => void;
};

export type ProfileModalType = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (username: string, avatar: string) => void;
};

export type InputFieldType = {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  criteria: string | string[];
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
};

export type ShowPasswordType = {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
};
