export const saveUserSession = (token, userId) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
};

export const getToken = () => localStorage.getItem("token");
export const getUserId = () => localStorage.getItem("userId");
export const logout = () => {
  localStorage.clear();
};
