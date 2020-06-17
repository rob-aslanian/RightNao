import { IPhone } from "./phone.interface";
import { ComapnyType } from "../company";

export interface IComapnyRegister{
    name?: string;
    url?: string;
    industry?: string;
    type?: ComapnyType;
    address?: string;
    apartment?: string;
    zip?: string;
    city_id?: string;
    email?: string;
    phone?:IPhone;
    websites?:string[];
    vat?: string;
    invited_by?: string;
}