export class User {
    public id: string;
    public userId: string;
    public username: string;
    public displayName: string;
    public email: string;
    public notification: string;
    public gold: number;
    public avatar: string;
    public status: number;
    public notLocked: boolean;
    public lastLoginDate: Date;
    public lastLoginDateDisplay: Date;
    public createDate: Date;
    public roleList: [];
  
    constructor() {
      this.id = '';
      this.userId = '';
      this.username = '';
      this.displayName = '';
      this.email = '';
      this.notification = '';
      this.gold = 0.0;
      this.avatar = '';
      this.status = 1;
      this.notLocked = false;
      this.lastLoginDate = null as any;
      this.lastLoginDateDisplay = null as any;
      this.createDate = null as any;
      this.roleList = [];
    }
}