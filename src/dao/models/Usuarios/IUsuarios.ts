import {ObjectId} from 'mongodb';
import {IAuditable} from '../IAuditable';

export interface IUsuarios extends IAuditable {
    codigo: string;
    correo : string;
    nombre : string;
    password : string;
    roles : string[];
    ultimoAcceso ?: Date;
};

export const DefaultUsuarios: IUsuarios = {
    codigo: '',
    correo: '',
    nombre: '',
    password: '',
    roles: [],
    createdAt: new Date(),
    updatedAt: new Date()
}