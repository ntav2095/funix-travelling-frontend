export const userApi = {
  login: (username, password) => ({
    url: "/user/login",
    method: "POST",
    data: { username, password },
  }),
};

export const tourApi = {
  add: (formData) => ({
    url: "/tour",
    method: "POST",
    data: formData,
  }),
  get: () => ({
    url: `/tour`,
    method: "GET",
  }),
  edit: (formData) => ({
    url: "/tour",
    method: "PUT",
    data: formData,
  }),
  getSingleTour: (tourId) => ({
    url: `/tour/${tourId}`,
    method: "GET",
  }),
};
