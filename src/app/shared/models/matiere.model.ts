import { Professeur } from "./professeur.model";

export class Matiere {
    id !: number;
    nom !: string;
    image !: string;
    prof !: Professeur;
}