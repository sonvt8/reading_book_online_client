import { Story } from "./story";
import { User } from "./user";

export class Chapter {
    id: number;
    status: number;
    createDate: Date;
    serial: number;
    chapterNumber: number;
    storyId : number;
    timeUpdate: Date;
    name: string;
    displayName: string;
    story: Story = new Story;
    user: User = new User;
    countView!: number;
    wordCount!: number;
    content!: string;

    constructor(){
        this.id = 0,
        this.status = 0,
        this.createDate = new Date(),
        this.serial = 0,
        this.chapterNumber = 0,
        this.storyId = 0,
        this.timeUpdate = new Date(),
        this.name = "",
        this.displayName = "0";
    }
}