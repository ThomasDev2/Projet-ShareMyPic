
import { Buffer } from "buffer";
export interface ImageModel{
    id:number,
    title: string,
    content:{
        data:Buffer,
        contentType:string
        },
    desc:string,
    author:string
}