import { database } from "./firebase";
const db = database.ref('/survey');

export class DataSurvey{
    static getAll(){
        return db;
    }
    static create(survey){
        return db.push(survey);
    }

    static update(id: string, value: any){
        return db.child(id).update(value);
    }

    static delete(id: string){
        return db.child(id).remove();
    }

    static deleteAll(){
        return db.remove();
    }

}
export default DataSurvey;