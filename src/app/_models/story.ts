import { Category } from "./category";
import { Chapter } from "./chapter";
import { User } from "./user";

export class Story{
    id: number;
    author: string;
    countAppoint: number;
    countView: number;
    cnt: number;
    createDate : Date;
    dealStatus: number;
    images: string;
    infomation:string;
    name: string;
    price: number;
    rating: number;
    status: number;
    timeDeal: number;
    updateDate: Date;
    userPosted: number;
    userId!: number;
    displayName: string;
    categoryName: string;
    chapterNumber: number;
    categoryListInput: string[];
    categoryList!: Category[];
    user!: User;
    chapterId!: number;
    timeUpdate!: string;
    username!: string;
    chapterNew!: Chapter;
    newChapter!: Chapter; //same data with chapterNew
    chapterHead! : Chapter;
    categoryId! : number;

    constructor(){
        this.id=0;
        this.author = "";
        this.countAppoint = 0;
        this.countView = 0;
        this.cnt = 0;
        this.createDate = new Date();
        this.dealStatus = 0;
        this.images = "";
        this.infomation = "";
        this.name = "";
        this.price = 0;
        this.rating = 0;
        this.status = 0;
        this.timeDeal = 0;
        this.updateDate = new Date;
        this.userPosted = 0;
        this.displayName = "";
        this.categoryName = "";
        this.chapterNumber = 0
        this.categoryListInput = [];
        this.chapterNumber = 0;
    }
        

}