import * as _ from 'underscore';
import { Views } from "src/app/_class/views/views";
import { Ressource } from "src/app/_class/ressource/ressource";

export class Cocktails {

    public id:number
    public name:string
    public isAlcohol:boolean
    public isAlcohol2:string
    public price:string
    public difficulty:string
    public degree:string
    public degree2:string
    public volume:string
    public isVariation:boolean
    public isFacultative:boolean
    public quantity:string
    public isValidated:boolean
    public instructions:string
    public viewsalltime:number
    public viewsmonthly:number
    public ingredients:Array<any>

    constructor(data?:any) {
        Object.assign(this, data)
    }
    
}
