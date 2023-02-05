export interface IUsuarios{
    codigo: string;
    correo : string;
    nombre : string;
    password : string;
    roles : string[];
    creado ?: Date;
    ultimoAcceso ?: Date;
};

export class Usuarios {
    private usuarios: IUsuarios[];

    constructor(){
        this.usuarios = [];
    }

    getAll(){
        return this.usuarios;
    }

    getById(codigo: string){
        const usuario = this.usuarios.find((usu)=>{
            return usu.codigo === codigo;
        });
        return usuario;
    }

    add(nuevoUsuario : IUsuarios){
        const date = new Date();
        const nuevo: IUsuarios = {
            ...nuevoUsuario, 
            codigo: (Math.random()* 1000).toString(),
            creado: date,
            ultimoAcceso: date
        }
        this.usuarios.push(nuevo);
        return true;
    }

    update(updateUsuario: IUsuarios){
        const newUsuarios: IUsuarios[] = this.usuarios.map((usu)=>{
            if(usu.codigo === updateUsuario.codigo){
                return {...usu, ...updateUsuario}
            }
            return usu;
        });
        this.usuarios = newUsuarios;
        return true;
    }

    delete(codigo: string){
        const usuarioToDelete = this.usuarios.find((usu)=>{
            return usu.codigo === codigo;
        });
        if(usuarioToDelete){
            this.usuarios = this.usuarios.filter((usu)=>{
                return usu.codigo !== codigo;
            });
            return true;
        }
        return false;
    }
}