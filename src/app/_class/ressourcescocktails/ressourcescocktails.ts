import { v4 as uuidv4 } from 'uuid';

export class Ressourcescocktails {

    public id:number
    public isVariation:boolean
    public isFacultative:boolean
    public quantity:string
    public cocktailId:number
    public ressourceId:number

    constructor(data?:any) {
        Object.assign(this, data)
    }
}