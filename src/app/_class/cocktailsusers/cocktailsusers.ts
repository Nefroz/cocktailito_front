import { v4 as uuidv4 } from 'uuid';

export class Cocktailsusers {

    public id:number
    public fnc:string
    public points:string
    public text:string
    public cocktailId:number
    public userId:number

    constructor(data?:any) {
        Object.assign(this, data)
    }
}