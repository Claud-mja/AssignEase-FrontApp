import { Teacher } from "./teacher.model";

export class Matiere {
    _id !: string;
    id !: number;
    nom !: string;
    image !: string;
    prof !: Teacher;
}