import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
    getHello(): string {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        // return 'You are in Get request!';
    }

    sayHello(): string {
        return 'You are in Post request!';
    }

    sayHii() {
        return 'You are in Hii Get request!';
    }
}
