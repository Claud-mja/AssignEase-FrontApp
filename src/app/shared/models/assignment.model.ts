import { Matiere } from "./matiere.model";
import { Auteur } from "./auteur.model";

export class Assignment {

    _id?:string;
    nom!: string;
    dateDeRendu!: Date;
    matiere! : Matiere;
    auteur !: Auteur;
    remarques !: string;
}