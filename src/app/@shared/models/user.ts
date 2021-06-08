import { Frontal } from './Frontal';

export interface User {
  identifiant?: string;
  motDePasse?: string;
  nom?: string;
  prenom?: string;
  adresseMail?: string;
  etat?: string;
  listeRoles?: { identifiant?: string; libelle?: string }[];
  listeFrontaux?: Frontal[];
}
