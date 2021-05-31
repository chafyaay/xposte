import { Frontal } from '__src/app/@shared/models/Frontal';
import { TampoFolder } from '__src/app/@shared/models/TampoFolder';
import { InboxFolder } from '__src/app/@shared/models/InboxFolder';

export class BALData {
  adresseBal: string;
  etatBal: string;
  frontal: Frontal;
  typeBal: string;
  seuil: number;
  adresseMailAlerte: string;
  listeAdressesIPAutorises: string[];
  balRejeu: boolean;
  mdpProd: string;
  mdpRejeu: string;
  relaisMessagerie: string;
  isChecked?: boolean;
  dossierTampon: TampoFolder;
  dossierInbox: InboxFolder;
}
