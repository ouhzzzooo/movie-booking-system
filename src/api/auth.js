import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your backend URL if different

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const handleApiError = (error) => {
  console.error(
    'API Error:',
    error.response ? error.response.data : error.message
  );
  throw error.response ? error.response.data : error;
};

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/users/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const register = async (name, surname, email, password, phoneNumber) => {
  try {
    const response = await axiosInstance.post('/users/register', {
      name,
      surname,
      email,
      password,
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};


export const updateUserProfile = async (updates) => {
  try {
    const response = await axiosInstance.put('/users/profile', updates);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getUserBookings = async () => {
  try {
    const response = await axiosInstance.get('/users/bookings');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getMovies = async () => {
  try {
    const response = await axiosInstance.get('/movies');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCinemas = async () => {
  try {
    const response = await axiosInstance.get('/cinemas');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getShowtimes = async () => {
  try {
    const response = await axiosInstance.get('/showtimes');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getSeatsByShowtime = async (showtimeId) => {
  try {
    const response = await axiosInstance.get(`/seats/showtime/${showtimeId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axiosInstance.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const adminLogin = async (email, password) => {
  try {
    const response = await axiosInstance.post('/admins/login', {
      email,
      password,
    });
    const { token, admin } = response.data;
    localStorage.setItem('token', token); 
    localStorage.setItem('admin', JSON.stringify(admin)); 
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/admins/users');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAdminMovies = async () => {
  try {
    const response = await axiosInstance.get('/admins/movies');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createAdminMovie = async (movieData) => {
  try {
    const response = await axiosInstance.post('/admins/movies', movieData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteAdminMovie = async (movieId) => {
  try {
    const response = await axiosInstance.delete(`/admins/movies/${movieId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAdminShowtimes = async () => {
  try {
    const response = await axiosInstance.get('/admins/showtimes');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createAdminShowtime = async (showtimeData) => {
  try {
    const response = await axiosInstance.post('/admins/showtimes', showtimeData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteAdminShowtime = async (showtimeId) => {
  try {
    const response = await axiosInstance.delete(`/admins/showtimes/${showtimeId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAdminFeedbacks = async () => {
  try {
    const response = await axiosInstance.get('/admins/feedbacks');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getChatMessages = async () => {
  try {
    const response = await axiosInstance.get('/chat');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const postChatMessage = async (message) => {
  try {
    const response = await axiosInstance.post('/chat', { message });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const submitFeedback = async (message) => {
  try {
    const response = await axiosInstance.post('/feedbacks/submit', { message });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const developerLogin = async (email, password) => {
  try {
    const response = await axiosInstance.post('/developers/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAdmins = async () => {
  try {
    const response = await axiosInstance.get('/developers/admins');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createAdmin = async (adminData) => {
  try {
    const response = await axiosInstance.post('/developers/admins', adminData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteAdmin = async (adminId) => {
  try {
    const response = await axiosInstance.delete(`/developers/admins/${adminId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export { axiosInstance };