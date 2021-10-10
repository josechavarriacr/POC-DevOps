import mongoose, { Schema, Document, ObjectId } from 'mongoose'
export interface ITodo extends Document {
    id: ObjectId
    name: string
    status: boolean
    createdAt: string
    updatedAt: string
}

const TodoSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        status: { type: Boolean, required: false, default: true },
    },
    { timestamps: true }
)

export default mongoose.model<ITodo>('Todos', TodoSchema)
