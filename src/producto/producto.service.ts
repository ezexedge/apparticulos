import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './models/producto.entity';

@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(Producto) private readonly productoRepository:Repository<Producto>
    ){}


    async all():Promise <Producto[]> {
        return await this.productoRepository.find()
    }

    async create(data) : Promise<Producto>{

      
        return await this.productoRepository.save(data)
    }

}
