import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegistroDto } from './models/registro.dto';
import admin from 'firebase-admin'
import firebase from '../../firebase.js'
import {getConnection} from "typeorm";
import { response, Response,Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';


@Controller()
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    @Post('registro')
    async registro(@Body() body:RegistroDto,@Res() res: Response ){

        const connection = getConnection();
const queryRunner = connection.createQueryRunner();


await queryRunner.startTransaction();


try{


        const resultFirebase =  await admin.auth().createUser({
            email: body.email,
            password: body.password                 
          })

          if(!resultFirebase) throw new Error('Error en firebase')


          console.log('acccaa',resultFirebase)

         await this.userService.create({
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            edad: body.edad,
         
        })


        
    
      await queryRunner.commitTransaction()
      res.status(200).json({message: 'creado correctamente'})

        }catch(err){
            await queryRunner.rollbackTransaction();
            throw new BadRequestException({error: err});

        }finally{

            console.log('agregado')
            await queryRunner.release();

        }
    }


    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough:true}) res: Response
    ){

        try{
            let result = await firebase.auth().signInWithEmailAndPassword(email,password)
            console.log('kdkdkdk',result)
            if(!result) throw new Error('error en login')


            let user = await this.userService.findOne({email})


            const jwt = await this.jwtService.signAsync({id:user.id,email:user.email})

            res.cookie('jwt',jwt,{httpOnly:true})

        }catch(err){
            throw new BadRequestException({error: err});

        }
     


    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() req: Request,@Res() res:Response){

        try{
        const cookie = req.cookies['jwt']
        const data = await this.jwtService.verifyAsync(cookie)

        if(!data) throw new Error('no tiene una sesion')

        let user = await this.userService.findOne({id: data['id']})

        res.status(200).json({message: user})

        }catch(err){

            throw new BadRequestException({error: err});


        }

    }   

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({passthrough:true}) res: Response){

        res.clearCookie('jwt')
        return {
            message: 'has cerrado sesion'
        }
    }



}
