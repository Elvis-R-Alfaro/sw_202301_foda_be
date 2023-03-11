import { IDataAccessObject } from "@dao/IDataAccessObject";
import { UsuariosDao } from "@server/dao/models/Usuarios/UsuariosDao";
import { IUsuarios, DefaultUsuarios } from "@server/dao/models/Usuarios/IUsuarios";

export class Usuarios {
    private usuariosDao: UsuariosDao;
    constructor(usuarios: IDataAccessObject) {
        this.usuariosDao = usuarios as UsuariosDao;
    }

    public async newUser(nuevoUsuario: IUsuarios){
        try{
            const nuevo: IUsuarios = {
                ...DefaultUsuarios,
                ...nuevoUsuario,
            }
            const result = await this.usuariosDao.create(nuevo);
            console.log('newUser result:', result);   
            const rt = await this.usuariosDao.findByFilter({ _id: result?.insertedId });
            return rt;
        } catch (ex) {
            console.error('newUser error:', ex);
            return null;
        }
    }

    public async updateUser(usuarioId: string, updateCmd: Partial<IUsuarios>) {
        await this.usuariosDao.update(usuarioId, { ...updateCmd, updatedAt: new Date() });
        const updatedUsuario = await this.usuariosDao.findByID(usuarioId);
        return updatedUsuario;
    }

    public async deleteUser(usuarioId: string) {
        const result = await this.usuariosDao.delete(usuarioId);
        return result;
    } 

    public async getAllFromUsuarios(){
        const usuarios = await this.usuariosDao.findAll();
        return usuarios;
    }

}