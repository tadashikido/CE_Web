export const isAuthenticated = () => {
  return localStorage.getItem("authToken");
};

export const saveAccessToken = token => {
  localStorage.setItem("authToken", token);
};

export const removeAccessToken = () => {
  localStorage.removeItem("authToken");
};
