import { Role } from "./role";

export class User {
    id: number;
    username: string;
    displayName: string;
    createDate: Date;
    status: number;
    gold: number;
    email: string;
    roles: Role[];



    constructor() {
        this.id = 0;
        this.username = '';
        this.displayName = '';
        this.createDate = new Date;
        this.status = 1;
        this.gold = 0;
        this.email="";
        this.roles = [];
    }
}