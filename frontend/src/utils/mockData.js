/**
 * Centralized mock data for all pages.
 * Replace with real API calls when backend is ready.
 */

export const MOCK_VEHICLES = [
  {
    _id: '1',
    name: 'Royal Enfield Classic 350',
    type: 'bike',
    pricePerHour: 120,
    pricePerDay: 800,
    status: 'approved',
    rating: 4.8,
    totalReviews: 24,
    location: 'AT Road, Dibrugarh',
    description:
      'A well-maintained Royal Enfield Classic 350. Full-service history available. Helmet included. Perfect for long rides and city commuting.',
    specs: { year: 2022, cc: 350, fuel: 'Petrol', transmission: 'Manual' },
    images: [],
    owner: { name: 'Rahul Gogoi', rating: 4.9, totalTrips: 47 },
  },
  {
    _id: '2',
    name: 'Honda Activa 6G',
    type: 'scooty',
    pricePerHour: 55,
    pricePerDay: 350,
    status: 'approved',
    rating: 4.6,
    totalReviews: 18,
    location: 'Chowkidinghee, Dibrugarh',
    description: 'Reliable Honda Activa — ideal for city errands and college commutes.',
    specs: { year: 2023, cc: 110, fuel: 'Petrol', transmission: 'Automatic' },
    images: [],
    owner: { name: 'Priya Borah', rating: 4.7, totalTrips: 31 },
  },
  {
    _id: '3',
    name: 'Bajaj Pulsar NS200',
    type: 'bike',
    pricePerHour: 100,
    pricePerDay: 650,
    status: 'approved',
    rating: 4.5,
    totalReviews: 9,
    location: 'Graham Bazar, Dibrugarh',
    description: 'Sporty Pulsar NS200 in great condition. Good for highway and city rides.',
    specs: { year: 2021, cc: 200, fuel: 'Petrol', transmission: 'Manual' },
    images: [],
    owner: { name: 'Bikash Saikia', rating: 4.5, totalTrips: 12 },
  },
  {
    _id: '4',
    name: 'TVS Jupiter',
    type: 'scooty',
    pricePerHour: 49,
    pricePerDay: 300,
    status: 'approved',
    rating: 4.7,
    totalReviews: 31,
    location: 'Lahoal, Dibrugarh',
    description: 'Comfortable TVS Jupiter with storage basket. Great for daily use.',
    specs: { year: 2022, cc: 110, fuel: 'Petrol', transmission: 'Automatic' },
    images: [],
    owner: { name: 'Anjali Das', rating: 4.8, totalTrips: 22 },
  },
  {
    _id: '5',
    name: 'Yamaha FZ-S V3',
    type: 'bike',
    pricePerHour: 90,
    pricePerDay: 580,
    status: 'approved',
    rating: 4.4,
    totalReviews: 7,
    location: 'Barbari, Dibrugarh',
    description: 'Yamaha FZ-S V3 with fuel injection. Smooth and fuel-efficient.',
    specs: { year: 2022, cc: 149, fuel: 'Petrol', transmission: 'Manual' },
    images: [],
    owner: { name: 'Dipak Hazarika', rating: 4.3, totalTrips: 9 },
  },
  {
    _id: '6',
    name: 'Suzuki Access 125',
    type: 'scooty',
    pricePerHour: 60,
    pricePerDay: 380,
    status: 'approved',
    rating: 4.9,
    totalReviews: 42,
    location: 'AT Road, Dibrugarh',
    description: 'Premium Suzuki Access 125. Smooth, powerful, and comfortable for any ride.',
    specs: { year: 2023, cc: 124, fuel: 'Petrol', transmission: 'Automatic' },
    images: [],
    owner: { name: 'Mrinali Gogoi', rating: 4.9, totalTrips: 55 },
  },
  {
    _id: '7',
    name: 'KTM Duke 200',
    type: 'bike',
    pricePerHour: 150,
    pricePerDay: 950,
    status: 'approved',
    rating: 4.3,
    totalReviews: 5,
    location: 'Chowkidinghee, Dibrugarh',
    description: 'Aggressive KTM Duke 200 for thrill seekers. Excellent road performance.',
    specs: { year: 2021, cc: 200, fuel: 'Petrol', transmission: 'Manual' },
    images: [],
    owner: { name: 'Kabir Ahmed', rating: 4.2, totalTrips: 6 },
  },
  {
    _id: '8',
    name: 'Honda Dio',
    type: 'scooty',
    pricePerHour: 50,
    pricePerDay: 320,
    status: 'approved',
    rating: 4.6,
    totalReviews: 16,
    location: 'Graham Bazar, Dibrugarh',
    description: 'Stylish Honda Dio. Lightweight and easy to manoeuvre.',
    specs: { year: 2023, cc: 110, fuel: 'Petrol', transmission: 'Automatic' },
    images: [],
    owner: { name: 'Rupali Saikia', rating: 4.7, totalTrips: 18 },
  },
]

export const MOCK_BOOKINGS = [
  {
    _id: 'b1',
    vehicleId: { _id: '2', name: 'Honda Activa 6G', type: 'scooty' },
    startTime: '2024-05-10T09:00:00Z',
    endTime: '2024-05-10T18:00:00Z',
    status: 'completed',
    totalAmount: 495,
  },
  {
    _id: 'b2',
    vehicleId: { _id: '1', name: 'Royal Enfield Classic 350', type: 'bike' },
    startTime: '2024-06-01T10:00:00Z',
    endTime: '2024-06-02T10:00:00Z',
    status: 'confirmed',
    totalAmount: 800,
  },
]

export const MOCK_ADMIN_STATS = {
  users: 124,
  vehicles: 48,
  bookings: 310,
  pendingListings: 6,
}

export const MOCK_ADMIN_VEHICLES = [
  { _id: 'v1', name: 'Royal Enfield Classic 350', type: 'bike', status: 'pending', ownerId: { name: 'Rahul Gogoi' }, pricePerHour: 120 },
  { _id: 'v2', name: 'Honda Activa 6G', type: 'scooty', status: 'pending', ownerId: { name: 'Priya Borah' }, pricePerHour: 55 },
  { _id: 'v3', name: 'Bajaj Pulsar NS200', type: 'bike', status: 'approved', ownerId: { name: 'Anjali Das' }, pricePerHour: 100 },
]

export const MOCK_USERS = [
  { _id: 'u1', name: 'Priya Borah', email: 'priya@email.com', role: 'user', createdAt: '2024-03-01' },
  { _id: 'u2', name: 'Rahul Gogoi', email: 'rahul@email.com', role: 'owner', createdAt: '2024-02-15' },
  { _id: 'u3', name: 'Anjali Das', email: 'anjali@email.com', role: 'user', createdAt: '2024-04-10' },
]

export const MOCK_OWNER_VEHICLES = [
  { _id: 'v1', name: 'Royal Enfield Classic 350', type: 'bike', pricePerHour: 120, pricePerDay: 800, status: 'approved' },
  { _id: 'v2', name: 'Honda Activa 6G', type: 'scooty', pricePerHour: 55, pricePerDay: 350, status: 'pending' },
]

export const MOCK_OWNER_BOOKINGS = [
  { _id: 'ob1', vehicleId: { name: 'Royal Enfield Classic 350' }, userId: { name: 'Priya Borah' }, startTime: '2024-06-10T09:00', endTime: '2024-06-10T18:00', status: 'confirmed' },
  { _id: 'ob2', vehicleId: { name: 'Royal Enfield Classic 350' }, userId: { name: 'Anjali Das' }, startTime: '2024-06-12T10:00', endTime: '2024-06-13T10:00', status: 'completed' },
]

export const MOCK_TESTIMONIALS = [
  { name: 'Priya Borah', role: 'College Student', text: 'Rented a scooty for a week during my internship. Super affordable and the owner was very helpful. Will use UNIRIDE again!', rating: 5 },
  { name: 'Rahul Gogoi', role: 'Delivery Partner', text: 'Listed my bike on UNIRIDE and I make extra ₹8,000 every month. The process was smooth and the platform is very easy to use.', rating: 5 },
  { name: 'Anjali Das', role: 'Tourist from Guwahati', text: 'Explored Dibrugarh on a rented bike. The prices are unbeatable and the process was completely online. Loved it!', rating: 5 },
]

export const MOCK_ACCESSORIES = [
  { _id: 'a1', name: 'Full-Face Helmet', category: 'accessory', pricePerDay: 50, description: 'ISI-certified full-face helmet.', availability: true, rating: 4.8, totalReviews: 15, location: 'AT Road, Dibrugarh', images: [] },
  { _id: 'a2', name: 'Riding Gloves', category: 'accessory', pricePerDay: 30, description: 'Touch-screen compatible riding gloves.', availability: true, rating: 4.5, totalReviews: 8, location: 'AT Road, Dibrugarh', images: [] },
  { _id: 'a3', name: 'Rain Jacket (Waterproof)', category: 'accessory', pricePerDay: 60, description: 'Lightweight waterproof rain jacket.', availability: true, rating: 4.6, totalReviews: 12, location: 'Chowkidinghee, Dibrugarh', images: [] },
  { _id: 'a4', name: 'Phone Mount (Handlebar)', category: 'accessory', pricePerDay: 20, description: 'Universal handlebar phone mount.', availability: true, rating: 4.7, totalReviews: 20, location: 'Graham Bazar, Dibrugarh', images: [] },
  { _id: 'a5', name: 'Knee Guards (Pair)', category: 'accessory', pricePerDay: 40, description: 'Hard-shell knee guards.', availability: true, rating: 4.4, totalReviews: 6, location: 'Lahoal, Dibrugarh', images: [] },
  { _id: 'a6', name: 'Bungee Cord Net', category: 'accessory', pricePerDay: 15, description: 'Elastic cargo net for luggage.', availability: true, rating: 4.3, totalReviews: 9, location: 'AT Road, Dibrugarh', images: [] },
]

