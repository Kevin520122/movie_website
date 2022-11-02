export interface User {
    username?: string;
    email?: string;
    password?: any;
    role?: string;
    isLogin?: boolean;
  }
  

export enum Roles {
    User,
    Admin,
    Super,
}
  