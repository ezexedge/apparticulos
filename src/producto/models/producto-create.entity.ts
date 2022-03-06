import { IsEmail, IsNotEmpty } from "class-validator"

export class ProductoCreateDto{
    @IsNotEmpty()
    nombre: string

    @IsNotEmpty()
    descripcion:  string

    @IsNotEmpty()
    precio:  string

    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    telefono:  string

}