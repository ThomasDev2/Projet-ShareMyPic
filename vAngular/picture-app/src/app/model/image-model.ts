
import { Buffer } from "buffer";
export interface ImageModel{
    _id:string,
    title: string,
    content:{
        data:Buffer,
        contentType:string
        },
    desc:string,
    author:string
}