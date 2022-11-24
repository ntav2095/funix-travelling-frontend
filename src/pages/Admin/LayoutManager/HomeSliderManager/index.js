import useAxios from "../../../../hooks/useAxios";
import { useState } from "react";

function HomeSliderManager({ slider = [] }) {
  const [imgs, setImgs] = useState(slider);

  const changeHandler = (e) => {
    setImgs(Array.from(e.target.files));
  };
  return (
    <div>
      <input type="file" multiple onChange={changeHandler} />
      <div className="preview d-flex">
        {imgs.map((img, index) => (
          <div key={index} className="image m-2">
            <img
              src={typeof img === "string" ? img : URL.createObjectURL(img)}
            />
          </div>
        ))}
      </div>
      <button className="btn btn-primary">Submit</button>
    </div>
  );
}

export default HomeSliderManager;
