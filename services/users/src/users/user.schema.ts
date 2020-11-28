import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class User {
    @Prop({ required: true })
    id: string

    @Prop({ required: true })
    name: string
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)
