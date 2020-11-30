import { v4 as uuidv4 } from 'uuid';

export class Ressource {

    public id:number
    public name:string
    public typeofquantity:string
    public toFactorize:string
    public toFactorize2:string
    public isValidated:boolean

    constructor(data?:any) {
        Object.assign(this, data)
    }
}