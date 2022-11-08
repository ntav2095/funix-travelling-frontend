import developmentConfig from "./development";
import productionConfig from "./production";

let config = developmentConfig;

if (process.env.NODE_ENV === "production") {
  config = productionConfig;
}

<<<<<<< HEAD
export default config;
=======
export default productionConfig;

// export default config;
>>>>>>> firebase-test
