import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'confirmed',
    },
    documents: {
      licenseUrl: String,
      idProofUrl: String,
    },
    notes: String,
  },
  { timestamps: true }
)

// Indexes for common queries
bookingSchema.index({ userId: 1, status: 1 })
bookingSchema.index({ vehicleId: 1, startTime: 1, endTime: 1 })

export default mongoose.model('Booking', bookingSchema)
