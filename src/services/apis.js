export const userApi = {
  login: (username, password) => ({
    url: "/user/login",
    method: "POST",
    data: { username, password },
  }),
};
