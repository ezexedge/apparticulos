import { User } from "src/user/models/user.entity"
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class Producto{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    descripcion: string

    @Column()
    precio: string

    @Column()
    telefono: string
  
    @Column()
    email: string

   
   
    @ManyToOne(() => User , user => user.producto)
    @JoinColumn({name: 'user_id'})
    user: User;



}