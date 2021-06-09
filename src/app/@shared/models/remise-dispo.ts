export interface RemiseDispoI {
  etatBal?: string;
  adresseBal?: string;
  identifiantFrontal?: string;
  listeIdentifiantsBALs?: string[];
  dateHeureDebut?: Date;
  dateHeureFin?: Date;
  emetteur?: string;
  destinataire?: string;
  contentDescription?: string;
  fichiersCompresses?: boolean | null;
  fichiersChiffres?: boolean | null;
  type?: string;
  version?: string;
  codeEmetteur?: string;
  codeCompostage?: string;
  dateHeureSujet?: Date;
  nbFSE?: string;
  sujetOuReplyInTo?: string;
}

export interface SUBFIELDSI {
  EMMETTEUR:string;
    DESITINATAIRE:string;
    CONTENT_DESC:string;
    FICHIER_COMPRESSEE:string;
    FICHIER_CHIFFREE:string;
    TYPE:string;
    VERSION:string;
    CODE_EMETTEUR:string;
    CODE_COMPOSTAGE:string;
    DATE_HEURE_SUJET:string;
    NBFSE:string;
    SUJET_OUT_REPLY_INFO:string;
    INDIFFERENT:string;
    OUI:string;
    NON:string;
    AJOUTER_CRITERE:string;
}
