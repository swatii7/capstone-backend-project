import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://capstone-project-1wft.onrender.com/', // Set your default base URL
    timeout: 5000, // Set the default timeout in milliseconds
    // Add any other default configurations you need
  });
  
  export default instance;