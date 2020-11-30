import * as _ from 'underscore';

export class Contacts {

    public id:number
    public subject:string
    public usersId:string
    public text:string
    public emailcontact:string
    public telcontact:string

    constructor(data?:any) {
        Object.assign(this, data)
    }
    
}
