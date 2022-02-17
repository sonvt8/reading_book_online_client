
export class AccountOnHomePage {
  id: number;
  displayName: string;
  username: string;
  avatar: string;
  email: string;
  notification: string;
  story: number;
  gold: number;
  chapter: number;

  constructor() {
    this.id = 0;
    this.username = '';
    this.displayName = '';
    this.email = '';
    this.notification = '';
    this.gold = 0.0;
    this.avatar = '';
    this.story = 0;
    this.chapter = 0;
  }
}