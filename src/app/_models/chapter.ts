import { Story } from "./story";
import { User } from "./user";

export class Chapter {
    id: number;
    status: number;
    createDate: Date;
    serial: number;
    chapterNumber: string;
    storyId : number;
    timeUpdate: Date;
    name: string;
    displayName: string;
    story: Story = new Story;
    user: User = new User;
    countView!: number;
    wordCount!: number;
    content!: string;
    price!: number

    constructor(){
        this.id = 0,
        this.status = 0,
        this.createDate = new Date(),
        this.serial = 0,
        this.chapterNumber = '',
        this.storyId = 0,
        this.timeUpdate = new Date(),
        this.name = "",
        this.displayName = "0";
    }
}