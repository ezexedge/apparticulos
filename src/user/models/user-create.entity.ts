import { IsEmail, IsNotEmpty } from "class-validator"

export class UserCreateDto{
    @IsNotEmpty()
    nombre: string

    @IsNotEmpty()
    apellido:  string

    @IsNotEmpty()
    edad:  string

    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    password:  string

}