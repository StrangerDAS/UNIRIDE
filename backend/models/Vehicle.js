import mongoose from 'mongoose'

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vehicle name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['bike', 'scooty'],
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required'],
      min: 1,
    },
    pricePerDay: {
      type: Number,
      min: 1,
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Pickup location is required'],
      trim: true,
    },
    images: [String],
    specs: {
      year: Number,
      cc: Number,
      fuel: { type: String, default: 'Petrol' },
      transmission: { type: String, enum: ['Manual', 'Automatic'] },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

// Index for efficient querying
vehicleSchema.index({ type: 1, status: 1, pricePerHour: 1 })
vehicleSchema.index({ ownerId: 1 })

export default mongoose.model('Vehicle', vehicleSchema)
