import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

const bannerModel = mongoose.model("Banner", bannerSchema);
export default bannerModel;