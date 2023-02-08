import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { LoggingInterceptor } from 'src/logging.interceptor';
import { ExampleService } from './example.service';

//@UseFilters(new HttpExceptionFilter())
@Controller('example')
@UseInterceptors(LoggingInterceptor)
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) { }

    @Get()
    //@UseFilters(new HttpExceptionFilter())
    async getHello() {
        try {
            await this.exampleService.getHello()
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
        // return this.exampleService.getHello();
    }

    @Post()
    sayHello() {
        //throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        return this.exampleService.sayHello();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    sayHii(@Param('id', ParseIntPipe) id: number) {
        console.log("In controller...")
        //throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        return this.exampleService.sayHii();
    }
}
