export class Category {
    id: number;
    createBy: string;
    createDate: Date;
    name: string;
    status: number;
    metatitle: string;

    constructor(){
        this.id = 0,
        this.createBy = "",
        this.createDate = new Date(),
        this.name = "",
        this.status = 0,
        this.metatitle = ""
    }
}