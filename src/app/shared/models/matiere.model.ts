import { Professeur } from "./professeur.model";

export class Matiere {
    _id?:string;
    nom !: string;
    image !: string;
    prof !: Professeur;
}