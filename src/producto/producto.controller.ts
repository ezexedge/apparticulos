import { BadRequestException, Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ProductoCreateDto } from './models/producto-create.entity';
import { Producto } from './models/producto.entity';
import { ProductoService } from './producto.service';
import { response, Response,Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('producto')
export class ProductoController {
    constructor(
        private productoService: ProductoService,
      private jwtService: JwtService

    ){}

    @Get()
    async getTodos(): Promise<Producto[]>{
        return await this.productoService.all()
    }


    @Post('crear')
    async crear(
        @Body() body: ProductoCreateDto,
        @Res() res: Response,
        @Req() req:Request
    ){

        const cookie = req.cookies['jwt']
        const data = await this.jwtService.verifyAsync(cookie)

        try{
            await this.productoService.create({
                nombre: body.descripcion,
                descripcion: body.descripcion,
                precio: body.precio,
                email: body.email,
                telefono: body.telefono,
                user: data.id
            })

            res.status(200).json({message: 'creado correctamente el producto'})



        }catch(err){
            throw new BadRequestException({error: err});

        }
   


    }
    

}
