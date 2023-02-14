import { Db, Collection, Document, ObjectId } from "mongodb";


import { IDataAccessObject } from "./IDataAccessObject";

export abstract class MongoDAOBase<T> implements IDataAccessObject{
    public persistnaceName: string;
    private connection: Db;
    private collection: Collection<T>;
    
    public constructor(entityName: string, connection: Db){
        this.persistnaceName = entityName;
        this.connection = connection;
        this.collection = this.connection.collection(this.persistnaceName);
    }
    
    findAll(){
        return this.collection.find({}).toArray();
    }
    
    findById(id: ObjectId){
        const query = { _id: new ObjectId(id) };
        return this.collection.findOne(query);
    }

    create: Function;
    update: Function;
    delete: Function;
    findByFilter: Function;
    findOneByFilter: Function;
    aggregate: Function;
    getConnection(){
        return this.connection;
    };
    rawUpdate: Function;

}