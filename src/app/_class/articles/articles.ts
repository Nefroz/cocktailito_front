import * as _ from 'underscore';

export class Articles {

    public id:number
    public urlvideo:string
    public urlimage:string
    public title:string
    public resume:string
    public text:string

    constructor(data?:any) {
        Object.assign(this, data)
    }
    
}
