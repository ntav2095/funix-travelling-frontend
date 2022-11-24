const getExtension = (path) => path.slice(path.lastIndexOf(".") + 1);

const imgToBase64 = (URL) => {
  return new Promise((res, _) => {
    let image;
    console.log("change file");
    image = new Image();
    image.crossOrigin = "Anonymous";
    image.addEventListener("load", function () {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      try {
        return res([null, canvas.toDataURL(`image/${getExtension(URL)}`)]);
      } catch (err) {
        console.error("error when convert image to base64", err);
        return res([err, null]);
      }
    });
    image.src = URL;
  });
};

export default imgToBase64;
