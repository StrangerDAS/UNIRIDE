import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiUploadCloud, FiCheckCircle, FiDollarSign, FiMapPin, FiFileText } from 'react-icons/fi'
import toast from 'react-hot-toast'
import useAuthStore from '../store/authStore'
import { db, storage } from '../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function OwnerSetup() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Bike', // Bike | Scooty | Helmet | Gloves | Accessories
    pricePerHour: '',
    pricePerDay: '',
    description: '',
    location: '',
    isAvailable: true
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return toast.error("You must be logged in")
    if (!formData.name || !formData.pricePerHour || !formData.location) {
      return toast.error("Please fill in all required fields")
    }

    setLoading(true)
    try {
      let imageUrl = ''
      
      // 1. Upload image to Firebase Storage if exists
      if (imageFile) {
        const fileExtension = imageFile.name.split('.').pop()
        const storageRef = ref(storage, `listings/${user._id}/${Date.now()}.${fileExtension}`)
        await uploadBytes(storageRef, imageFile)
        imageUrl = await getDownloadURL(storageRef)
      }

      // 2. Save data to Firestore (either vehicles or accessories collection based on type)
      const isVehicle = formData.type === 'Bike' || formData.type === 'Scooty'
      const collectionName = isVehicle ? 'vehicles' : 'accessories'
      
      await addDoc(collection(db, collectionName), {
        ownerId: user._id,
        ownerName: user.name,
        name: formData.name,
        type: formData.type,
        pricePerHour: Number(formData.pricePerHour),
        pricePerDay: Number(formData.pricePerDay),
        description: formData.description,
        location: formData.location,
        isAvailable: formData.isAvailable,
        imageUrl: imageUrl,
        createdAt: serverTimestamp()
      })

      toast.success(`${formData.type} listed successfully!`)
      // Redirect to owner dashboard
      navigate('/dashboard')
      
    } catch (error) {
      console.error(error)
      toast.error("Error creating listing")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen py-24 px-6 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[300px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Post Your Ride</h1>
          <p className="text-white/50 text-lg">Earn money by renting out your unused vehicles and accessories.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              
              <div>
                <label className="label">Item Name *</label>
                <div className="relative">
                  <FiFileText className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Royal Enfield Classic 350"
                    className="input-field pl-11"
                  />
                </div>
              </div>

              <div>
                <label className="label">Category *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="input-field appearance-none cursor-pointer"
                >
                  <option value="Bike">Bike</option>
                  <option value="Scooty">Scooty</option>
                  <option value="Helmet">Helmet</option>
                  <option value="Gloves">Gloves</option>
                  <option value="Accessories">Other Accessories</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Price / Hour (₹) *</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="number"
                      name="pricePerHour"
                      value={formData.pricePerHour}
                      onChange={handleChange}
                      required
                      placeholder="50"
                      className="input-field pl-11"
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Price / Day (₹)</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="number"
                      name="pricePerDay"
                      value={formData.pricePerDay}
                      onChange={handleChange}
                      placeholder="500"
                      className="input-field pl-11"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="label">Location *</label>
                <div className="relative">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Dibrugarh University Gate 2"
                    className="input-field pl-11"
                  />
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="space-y-6 flex flex-col">
              
              <div className="flex-grow flex flex-col">
                <label className="label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the condition, features, and any rules for renting."
                  className="input-field min-h-[120px] py-3 flex-grow resize-none"
                ></textarea>
              </div>

              <div>
                <label className="label">Image</label>
                <div className="relative group border-2 border-dashed border-white/20 rounded-2xl p-6 text-center hover:border-brand/50 transition-colors cursor-pointer bg-white/5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {imagePreview ? (
                    <div className="relative h-32 w-full">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                        <span className="text-white text-sm font-medium">Change Image</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-white/40 group-hover:text-brand transition-colors">
                      <FiUploadCloud className="w-8 h-8 mb-2" />
                      <span className="text-sm font-medium">Click or drag image to upload</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <input
                  type="checkbox"
                  id="isAvailable"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="w-5 h-5 accent-brand rounded cursor-pointer"
                />
                <label htmlFor="isAvailable" className="text-white font-medium cursor-pointer flex-grow select-none">
                  Available for rent immediately
                </label>
                <FiCheckCircle className={`w-5 h-5 ${formData.isAvailable ? 'text-brand' : 'text-white/20'}`} />
              </div>

            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/hub')}
              className="px-6 py-3 rounded-xl font-semibold text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary px-10 py-3 rounded-xl font-semibold shadow-[0_0_20px_rgba(255,107,0,0.3)] disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Listing'}
            </motion.button>
          </div>

        </form>
      </motion.div>
    </div>
  )
}
