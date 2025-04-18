import type { ChangeEvent, Dispatch } from "react";

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
  email?: string;
  createdAt?: string;
  isAdmin?: boolean;
};

export type Profile = {
  id: string;
  username: string;
  urlAvatar: string;
};

export type Dragon = {
  name: string;
  specie: string;
  strength: number;
  stamina: number;
  speed: number;
  urlBaby: string;
  urlAdult: string;
  adoptedAt: string;
  dragonId: string;
};

export type Specie = {
  id: string;
  specie: string;
  baseStrength: number;
  baseSpeed: number;
  baseStamina: number;
  urlBaby?: string;
  urlAdult: string;
};

export type Stat = {
  value: number;
  size: string;
  highlight?: boolean;
};

export type Stats = {
  strength: number;
  speed: number;
  stamina: number;
  size: string;
  highlightedStat?: "speed" | "strength" | "stamina" | null;
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
  type: "text" | "password" | "number" | "email" | "radio";
  name: string;
  id?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  value?: string | number;
  criteria?: string | string[];
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
};

export type FileInputFieldType = {
  label: string;
  name: string;
  file: File | null;
  setFile: Dispatch<React.SetStateAction<File | null>>;
  preview: string | null;
  setPreview: Dispatch<React.SetStateAction<string | null>>;
  onFileChange: (file: File, type: "baby" | "adult") => void;
  type: "baby" | "adult";
  required?: boolean;
};

export type CriteriaMessageType = {
  criteria: string | string[];
};

export type ShowPasswordType = {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
};

export type EditSpecieModalType = {
  isOpen: boolean;
  specie: Specie;
  onClose: () => void;
  onSave: (updatedSpecie: Specie) => void;
  onFileChange: (file: File | null, type: "baby" | "adult") => void;
};

export type AddSpecieModalType = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (createdSpecie: Omit<Specie, "id">) => void;
  onFileChange: (file: File | null, type: "baby" | "adult") => void;
};

export type TrainingsType = {
  type: "strength" | "speed" | "stamina" | null;
  id: number;
};
