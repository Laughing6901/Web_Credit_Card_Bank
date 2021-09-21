import { IsInt, IsString } from "class-validator";

export class CreateUserDto  {
    @IsString()
    name: string;

    @IsInt()
    age: number;

    @IsString()
    address: string;

    @IsString()
    job:string;

}