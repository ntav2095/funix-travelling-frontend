export const articleApis = {
  get: (params = {}) => ({
    url: `/admin/article`,
    method: "GET",
    params,
  }),
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
};

export const tourApis = {
  get: (params = {}) => ({
    url: `admin/tour`,
    method: "GET",
    params: params,
  }),
  add: (formData) => ({
    method: "POST",
    url: "/admin/tour",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
  getSingle: (tourId, language) => ({
    method: "GET",
    url: `/admin/tour/${tourId}/?language=${language || "vi"}`,
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
  updateItinerary: {
    update: (formData) => ({
      method: "PUT",
      url: "/admin/tour/itinerary",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  },
  rate: (data) => ({
    method: "POST",
    url: "/admin/tour/rating",
    data,
  }),
  editRatingItem: (data) => ({
    method: "PUT",
    url: "/admin/tour/rating",
    data,
  }),
  deleteRatingItem: (data) => ({
    method: "DELETE",
    url: "/admin/tour/rating",
    data,
  }),
};

export const itineraryApis = {
  update: (formData) => ({
    method: "PUT",
    url: "/admin/tour/itinerary",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
};
export const imagesApis = {
  update: (formData) => ({
    method: "PUT",
    url: "/admin/tour/images",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
};
export const categoryApis = {
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
};

export const layoutApis = {
  updateImages: (formData) => ({
    method: "POST",
    url: "/admin/layout/image",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
};

export const termApis = {
  getAll: () => ({
    method: "GET",
    url: "/admin/term",
  }),
  getSingle: (type) => ({
    method: "GET",
    url: `/admin/term/${type}`,
  }),
  update: (data) => ({
    method: "PUT",
    url: "/admin/term",
    data,
  }),
};

export const visaApis = {
  get: (params) => ({
    method: "GET",
    url: "/admin/visa",
    params,
  }),
  deleteOne: (id) => ({
    method: "GET",
    url: "/admin/visa",
    data: { id },
  }),
};
