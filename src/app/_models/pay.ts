export class Pay {
    id: number;
    userSendId: number;
    userReceivedId: number;
    money: number;
    createDate: Date;
    chapterId: number;
    storyId: number;
    vote: number;
    type: number;
    status: number;
    
    constructor(){
        this.id = 0,
        this.userSendId = 0,
        this.userReceivedId = 0,
        this.money = 0,
        this.createDate = new Date(),
        this.chapterId = 0,
        this.storyId = 0,
        this.vote = 0,
        this.type = 0,
        this.status = 0;
    }
}