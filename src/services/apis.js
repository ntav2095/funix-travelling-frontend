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
  get: (params = {}) => ({
    url: `/tour/?hehe=chicken&hehe=bird`,
    method: "GET",
    params: params,
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
  delete: (tourId) => ({
    url: `/tour`,
    method: "DELETE",
    data: { tourId },
  }),
  getHotTours: () => ({
    url: `/tour/hot-tours`,
    method: "GET",
  }),
};

export const postsApi = {
  add: (formData) => ({
    url: "/article",
    method: "POST",
    data: formData,
  }),
  get: (params = {}) => ({
    url: `/article`,
    method: "GET",
    params,
  }),
  getSingleArticle: (articleId) => ({
    url: `/article/${articleId}`,
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
  getNewArticles: () => ({
    url: `/article/new-articles`,
    method: "GET",
  }),
};

export const visaApi = {
  addVisa: (data) => ({
    method: "POST",
    url: "/visa",
    data,
  }),
  editVisa: (data) => ({
    method: "PUT",
    url: "/visa",
    data,
  }),
  getVisas: () => ({
    method: "GET",
    url: "/visa",
  }),
  getSingleVisa: (visaId) => ({
    method: "GET",
    url: `/visa/${visaId}`,
  }),
  deleteVisa: (visaId) => ({
    method: "DELETE",
    url: "/visa",
    data: { visaId },
  }),
};

export const categoryApi = {
  get: () => ({
    method: "GET",
    url: "/admin/categories",
  }),
  add: (formData) => ({
    method: "POST",
    url: "/admin/categories",
    formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
};

export const adminApis = {
  article: {
    add: (formData) => ({
      method: "POST",
      url: "/admin/article",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    getSingle: (articleId, cat_lang) => ({
      method: "GET",
      url: `/admin/article/${articleId}/?cat_lang=${cat_lang}`,
    }),
    edit: (formData) => ({
      method: "PUT",
      url: "/admin/article",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    delete: (articleId) => ({
      method: "DELETE",
      url: "/admin/article",
      data: { articleId },
    }),
  },

  tour: {
    add: (formData) => ({
      method: "POST",
      url: "/admin/tour",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    getSingle: (tourId, cat_lang) => ({
      method: "GET",
      url: `/admin/tour/${tourId}/?cat_lang=${cat_lang}`,
    }),
    edit: (formData) => ({
      method: "PUT",
      url: "/admin/tour",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    delete: (tourId) => ({
      method: "DELETE",
      url: "/admin/tour",
      data: { tourId },
    }),
  },

  itinerary: {
    update: (data) => ({
      method: "PUT",
      url: "/admin/tour/itinerary",
      data,
    }),
  },
  category: {
    add: (data) => ({
      method: "POST",
      url: "/admin/categories",
      data,
    }),
    get: () => ({
      method: "GET",
      url: "/admin/categories",
    }),
    delete: (catId) => ({
      method: "DELETE",
      url: "/admin/categories",
      data: { catId },
    }),
    update: (data) => ({
      method: "PUT",
      url: "/admin/categories",
      data,
    }),
  },
};
