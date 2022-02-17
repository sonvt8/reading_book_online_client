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