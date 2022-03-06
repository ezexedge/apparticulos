import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Producto } from "src/producto/models/producto.entity"

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    apellido: string

    @Column()
    edad: string

    @Column({unique:true})
    email: string

    @OneToMany(() => Producto, producto => producto.user)
    producto: Producto[];

}