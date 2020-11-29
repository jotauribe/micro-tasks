import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Task {
    @Prop({ required: true })
    id: string

    @Prop({ required: true })
    description: string

    @Prop({ required: true, default: 'todo' })
    state: 'done' | 'todo'

    @Prop({ required: true })
    ownerId: string
}

export type TaskDocument = Task & Document
export const TaskSchema = SchemaFactory.createForClass(Task)
