export interface User {
    id?: string;
    username?: string;
    email?: string;
    password?: any;
    role?: string;
    isLogin?: boolean;
    jwtToken?: string;
  }
  

export enum Roles {
    USER,
    ADMIN,
    SUPER,
}
  