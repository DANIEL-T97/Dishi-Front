// Utility file (e.g., authUtils.js)
export const getUserEmailFromToken = () => {
    // Get the token from localStorage or wherever you store it
    const token = localStorage.getItem('access_token');
  
    // Decode the token to extract user information
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        return payload.identity; // Assuming the email is stored in the 'identity' field
      }
    }
  
    return null;
  };
  