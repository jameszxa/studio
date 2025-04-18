import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Assuming you've set up a proxy in next.config.js
});

interface User {
  id: string;
  email: string;
  // You might have other user properties here
}

export async function createUser(email: string, passwordPlain: string): Promise<void> {
  try {
    const response = await api.post('/register', { email, password: passwordPlain });
    // You might want to handle success (e.g., redirect the user)
    console.log('User registered successfully:', response.data);
  } catch (error) {
    // Handle registration errors (e.g., display an error message)
    console.error('Registration failed:', error);
    throw error; // Re-throw the error to be handled by the calling component
  }
}

export async function authenticateUser(email: string, passwordPlain: string): Promise<User | null> {
  try {
    const response = await api.post('/login', { email, password: passwordPlain });
    // Assuming your API returns a user object upon successful login
    const user: User = response.data.user;
    // You might also want to handle authentication tokens here (e.g., store them in local storage)
    console.log('User authenticated successfully:', user);
    return user;
  } catch (error) {
    // Handle authentication errors (e.g., display an error message)
    console.error('Authentication failed:', error);
    return null;
  }
}
