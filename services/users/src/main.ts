import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await await NestFactory.create(AppModule)
    app.enableCors()
    await app.listen(3020)
}
bootstrap()
