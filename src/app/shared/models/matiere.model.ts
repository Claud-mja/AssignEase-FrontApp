import { Professeur } from "./professeur.model";

export class Matiere {
    _id?: number;
    nom !: string;
    image !: string;
    prof !: Professeur;
}