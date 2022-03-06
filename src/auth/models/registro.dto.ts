import { IsEmail, IsNotEmpty } from "class-validator"

export class RegistroDto{

    @IsNotEmpty()
    nombre: string
    @IsNotEmpty()
    apellido: string
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    edad: string
    @IsNotEmpty()
    password: string
}