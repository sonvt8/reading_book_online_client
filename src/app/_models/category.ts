export class Category {
    id: number | undefined;
    createBy: string;
    createDate: Date;
    name: string;
    status: number;

    constructor(){
        this.createBy = "",
        this.createDate = new Date(),
        this.name = "",
        this.status = 0;
    }
}