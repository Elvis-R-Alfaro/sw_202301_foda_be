//la interface es una estructura que define un tipo de dato
//definición de una interface por eso usamos ; al final
//ENDPOINT Ruta de una interface que reacciona en una identidad
export interface IEmpresas{
    codigo: string;
    nombre: string;
    status: string;
    created?: Date;
    updated?: Date;
    //propiedades opcionales
    observacion?: string;
}

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

    private empresas: IEmpresas[]; //array de empresas

    constructor(){
        this.empresas = [];
    }

    getAll(){
        return this.empresas;
    }

    getById(codigo: string){
        const empresa = this.empresas.find((emp)=>{
            return emp.codigo === codigo;
        });
        return empresa;
    }

    add(nuevaEmpresa : IEmpresas){
        const date = new Date();
        const nueva: IEmpresas = {
            ...nuevaEmpresa, 
            codigo: (Math.random()* 1000).toString() + new Date().getTime.toString(),
            created: date,
            updated: date
        }
        this.empresas.push(nueva);
        return true;
    }

    update(updateEmpresa: IEmpresas){
        const newEmpresas: IEmpresas[] = this.empresas.map((emp)=>{
            if(emp.codigo === updateEmpresa.codigo){
                return {...emp, ...updateEmpresa, update: new Date()}
            }
            return emp;
        });
        this.empresas = newEmpresas;
        return true;
    }

    delete(codigo: string){
        const empresaToDelete = this.empresas.find((emp)=>{
            return emp.codigo === codigo;
        });

        if(empresaToDelete){
            const newEmpresas : IEmpresas[] = this.empresas.filter((emp)=>{
                return emp.codigo !== codigo;
            });
            this.empresas = newEmpresas;
            return true;
        }
        return false;
    }
}