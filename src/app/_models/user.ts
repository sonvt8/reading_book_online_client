export class User {
    id: number;
    username: string;
    displayName: string;
    createDate: Date;
    status: number;



    constructor() {
        this.id = 0;
        this.username = '';
        this.displayName = '';
        this.createDate = new Date;
        this.status = 1;
    }
}