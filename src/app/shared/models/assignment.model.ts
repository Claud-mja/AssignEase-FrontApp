import { Matiere } from "./matiere.model";
import { Auteur } from "./auteur.model";

export class Assignment {
    id !: number;
    nom!: string;
    dateDeRendu!: Date;
    note ! : number;
    rendu ! : boolean;
    matiere ! : Matiere;
    auteur !: Auteur;
    remarques !: string;
}