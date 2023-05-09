import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        text: {
            type: String,
            required: true,
            unique: true

        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        viewCount: {
            type: Number,
            default: 0
        },
        tags: {
            type: Array,
            default: [],
        },
        imageUrl: String,
    },
    {
        timestamps: true,
    })

export default mongoose.model('Post', PostSchema)