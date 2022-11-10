export const tourApi = {
  addTour: (formData) => ({
    method: "POST",
    url: "/tour",
    data: formData,
    headers: {
      "Content-Type": "multipart/formdata",
    },
  }),
};
