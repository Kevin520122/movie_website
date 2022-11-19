import { Roles } from "./user.interface"

export class RegisterUser{
    tmdb_key: string = ''
    email: string = ''
    password: string = ""
    username: string= ""
    role!: Roles
}