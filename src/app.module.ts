import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { logger } from './common/middleware/logger.middleware';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [ExampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger)
      .forRoutes({ path: 'example', method: RequestMethod.POST });
  }
}
