export interface IMenu{
    title : string,
    icon : string,
    routerLink?: string; // Rendre routerLink facultatif
    children?: IMenuItem[];
}

export interface IMenuItem {
    title: string,
    icon: string,
    routerLink: string;
}