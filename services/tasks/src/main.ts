import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

const options = { urls: ['amqp://rabbitmq:5672'], queue: 'microtasks-events' }

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    await app.connectMicroservice({ transport: Transport.RMQ, options })
    await app.startAllMicroservicesAsync()
    await app.listen(3030)
}
bootstrap()
