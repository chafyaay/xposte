import { Frontal } from '@app/@shared/models/Frontal';
export class BalDataExpoted {
  Adresse: string;
  Etat: string;
  frontal: Frontal;
  Frontal: string;
  seuil: number;
  Type: string;
  adresseMailAlerte: string;
  IPs: string[];
  Rejouable: string;
  mdpProd: string;
  mdpRejeu: string;
  relaisMessagerie: string;
  Messages_Tamponnés: number;
  volumeDossier: number;
  dateMiseEnTampon: string;
  MessagesNonLus: number;
  volumeDossierI: number;
  dateMiseEnTamponI: string;
  dateDernierReleve: string;
}
