import { Category } from "./category";
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
    displayName: string;
    categoryName: string;
    chapterNumber: number;
    categoryList: string[];
    user!: User;

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
        this.categoryList = [];

    }
        

}