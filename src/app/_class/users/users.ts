import * as _ from 'underscore';
import * as moment from 'moment';
export class Users {
    
    public id:number
    public firstname:string
    public lastname:string
    public birthday: string;
    public email:string
    public tel:number
    public streetname:string
    public streetnumber:number
    public postalcode:number
    public city:string
    public country:string
    public pseudo:string
    public password:string
    public FavoriteOrNotationOrComment:string
    public points:string
    public text:string

    constructor(data?:any) {
        Object.assign(this, data)
        this.birthday = moment(data.birthday).format('DD-MM-YYYY');
    }
}
