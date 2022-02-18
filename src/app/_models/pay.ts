import { Chapter } from "./chapter";
import { Story } from "./story";
import { User } from "./user";

export class Pay {
    id: number;
    type: number;
    story!: Story;
    createDate: Date;
    status: number;
    money: number;
    vote: number;
    sendId!: User;
    receivedId!: User;
    chapter!: Chapter;
    
    constructor(){
        this.id = 0,
        this.money = 0,
        this.createDate = new Date(),
        this.vote = 0,
        this.type = 0,
        this.status = 0;
    }
}