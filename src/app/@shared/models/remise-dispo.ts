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
