export interface IEmpresas{
    codigo: string;
    nombre: string;
    status: string;
    created?: Date;
    updated?: Date;
    //propiedades opcionales
    observacion?: string;
}