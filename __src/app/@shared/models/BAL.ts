import { Frontal } from '__src/app/@shared/models/Frontal';

export class BAL {
  adresseBal?: string;
  adresseMailAlerte?: string;
  balRejeu?: boolean;
  etatBal?: string;
  frontal?: Frontal;
  listeAdressesIPAutorises?: string[];
  mdpProd?: string;
  mdpRejeu?: string;
  relaisMessagerie?: string;
  seuil?: number;
  typeBal?: string;
}
