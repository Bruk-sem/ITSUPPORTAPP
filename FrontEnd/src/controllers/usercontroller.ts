import axios from 'axios';

interface User {
  username: string;
  password: string;
}

export const authenticateUser = async (user: User): Promise<boolean> => {

  try {
    const response = await axios.get('/userlogin', {
      params: {
        username: user.username,
        password: user.password
      }
    });
    return response.data.authenticated; // Assuming backend returns { authenticated: true } if authentication is successful
  } catch (error) {
    console.error('Error authenticating user:', error);
    return false;
  }

};
