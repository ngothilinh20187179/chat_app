import axiosClient from './axiosClient';

interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

const authService = {
  signup: () => {
    // Implement signup logic here later
  },

  /**
   * Sends login credentials to the backend.
   * Payload matches: { usernameOrEmail, password }
   */
  login: (credentials: LoginCredentials) => {
    const url = '/auth/login';
    return axiosClient.post(url, credentials);
  },
  
  logout: () => {
    localStorage.removeItem('token');
    // Add any additional cleanup logic here
  }
};

export default authService;