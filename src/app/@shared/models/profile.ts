export interface ProfileI {
  adresseMail: string;
  identifiant: string;
  listeFrontaux: FrontalI[];
  nom: string;
  prenom: string;
  role: {
    dentifiant: string;
    libelle: string;
  };
}

export interface FrontalI {
  adresseMailAlerte: string;
  identifiant: string;
  listeAdressesIPs: string[];
  listeIdentifiantsUtilisateurs: string[];
  nbBals: number;
  nom: string;
  seuil: number;
}
