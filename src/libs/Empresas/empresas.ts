//la interface es una estructura que define un tipo de dato
//definición de una interface por eso usamos ; al final
//ENDPOINT Ruta de una interface que reacciona en una identidad

import { IEmpresas } from "@dao/models/Empresas/IEmpresas";
import { IDataAccessObject } from "@dao/IDataAccessObject";

export class Empresas {
    /* 
    /la variable obliga a que lleve todos las propriedades de la interface
    private currentEmpresas: IEmpresas = {
        codigo: "",
        nombre: "",
        status: "",
        created: undefined,
        updated: undefined
    }; */

    //private empresas: IEmpresas[]; //array de empresas
    private dao: IDataAccessObject;

    constructor(dao: IDataAccessObject){
        this.dao = dao;
        //this.empresas = [];
    }

    getAll(){
        return this.dao.findAll();
    }

    getById(id: string){
        return this.dao.findById(id);
    }

    add(nuevaEmpresa : IEmpresas){
        const date = new Date();
        const nueva: IEmpresas = {
            ...nuevaEmpresa, 
            created: date,
            updated: date
        }

        return this.dao.create(nueva);
    }

    update(id:string ,updateEmpresa: IEmpresas){
        const updateObjet = {...updateEmpresa, update: new Date()};
        return this.dao.update(id, updateObjet);
    }

    delete(id: string){
        return this.dao.delete(id);
    }
}