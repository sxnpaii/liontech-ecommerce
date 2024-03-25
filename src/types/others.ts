import { User } from "firebase/auth";

export interface LoginReq extends User {
  email: string;
  password: string;
}
