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
  updateItinerary: (data) => ({
    url: "/tour/itinerary",
    method: "PUT",
    data: data,
  }),
};

export const fileApi = {
  uploadImages: (formData) => ({
    url: "/file",
    method: "POST",
    data: formData,
  }),
};

export const postsApi = {
  add: (formData) => ({
    url: "/article",
    method: "POST",
    data: formData,
  }),
  get: () => ({
    url: `/article`,
    method: "GET",
  }),
  getSingleArticle: (articleId) => ({
    url: `/tour/${articleId}`,
    method: "GET",
  }),
  edit: (formData) => ({
    url: "/article",
    method: "PUT",
    data: formData,
  }),
  delete: (articleId) => ({
    url: `/article/${articleId}`,
    method: "DELETE",
  }),
};