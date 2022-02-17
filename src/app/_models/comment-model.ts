import { User } from "./user";

export class CommentModel {
    id: number;
    content: string;
    timeUpdate: Date;
    user: User

    constructor(){
        this.id = 0,
        this.content = "",
        this.timeUpdate = new Date();
        this.user = new User();
    }
}