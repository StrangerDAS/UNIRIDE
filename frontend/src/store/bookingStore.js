import { create } from 'zustand'

/**
 * Booking store — tracks multi-step booking state.
 * Cleared on confirm or cancel.
 */
const useBookingStore = create((set) => ({
  // The vehicle being booked
  selectedVehicle: null,

  // Step 1: dates
  bookingDetails: {
    startTime: '',
    endTime: '',
    estimatedTotal: 0,
  },

  // Step 2: uploaded document metadata (not actual files — those stay local)
  documents: {
    licenseUploaded: false,
    idProofUploaded: false,
  },

  // Current step (0 = dates, 1 = docs, 2 = confirm)
  currentStep: 0,

  // Actions
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),

  setBookingDetails: (details) =>
    set((state) => ({
      bookingDetails: { ...state.bookingDetails, ...details },
    })),

  setDocumentUploaded: (docKey, value = true) =>
    set((state) => ({
      documents: { ...state.documents, [docKey]: value },
    })),

  nextStep: () =>
    set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),

  prevStep: () =>
    set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),

  reset: () =>
    set({
      selectedVehicle: null,
      bookingDetails: { startTime: '', endTime: '', estimatedTotal: 0 },
      documents: { licenseUploaded: false, idProofUploaded: false },
      currentStep: 0,
    }),
}))

export default useBookingStore
