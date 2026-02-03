export const saveTokens = (access: string, refresh: string) => {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);

  document.cookie =  `access=${access}; path=/`
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  document.cookie = "access=; path=/; max-age=0";
};
