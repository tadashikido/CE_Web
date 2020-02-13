export const isAuthenticated = () => {
  return localStorage.getItem("authToken");
};

export const saveAccessToken = token => {
  localStorage.setItem("authToken", token);
};

export const clearStorage = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("dadosUsuario");
};

export const saveAuthentication = dadosUsuario => {
  localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));
}

export const getAuthentication = () => (
  JSON.parse(localStorage.getItem("dadosUsuario"))
)