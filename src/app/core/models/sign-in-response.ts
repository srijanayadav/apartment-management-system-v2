import { User } from "./user";

export interface SignInResponse {
    access_token:string,
    expiration:Date,
    user_info:User

}
