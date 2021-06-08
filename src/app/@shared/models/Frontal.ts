export class Frontal {
  identifiant?: string;
  nom?: string;
  seuil?: string;
  adresseMailAlerte?: string;
  listeAdressesIPs: string[] = [];
  listeIdentifiantsUtilisateurs?: string[];
  isChecked?: boolean;

  constructor() {}
}
