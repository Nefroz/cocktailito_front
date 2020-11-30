import * as _ from 'underscore';
import * as moment from 'moment';

export class Views {

    public id:number
    public date:string
    public cocktailId:string

    constructor(data?:any) {
        Object.assign(this, data)
        this.date = moment(data.date).format('DD-MM-YYYY');
    }
    
}
