import { Matiere } from "./matiere.model";
import { Auteur } from "./auteur.model";

export class Assignment {
    _id !: number;
    nom!: string;
    dateDeRendu!: Date;
    matiere! : Matiere;
    auteur !: Auteur;
    note ! : number;
    remarques !: string;
}