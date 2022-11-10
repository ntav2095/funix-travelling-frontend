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
  delete: (tourId) => ({
    url: `/tour`,
    method: "DELETE",
    data: { tourId },
  }),
};

export const fileApi = {
  uploadImages: (formData) => ({
    url: "/file",
    method: "POST",
    data: formData,
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
