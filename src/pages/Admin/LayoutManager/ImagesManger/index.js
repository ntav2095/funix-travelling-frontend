import { useEffect, useState, useRef } from "react";
import useAxios from "../../../../hooks/useAxios";
import { adminApis } from "../../../../services/apis";
import SpinnerModal from "../../../../components/SpinnerModal";

const spinner = (
  <span
    className="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
  ></span>
);

function ImagesManger({ name, type, initialImages = [], reFetch }) {
  const [imgs, setImgs] = useState([]);
  const [curImgs, setCurImgs] = useState(initialImages);
  const [sendRequest, isLoading, isSuccess, error] = useAxios();
  const inputRef = useRef();

  const changeHandler = (e) => {
    setImgs(Array.from(e.target.files));
  };

  const emptyInput = imgs.length === 0;

  const submitHandler = (e) => {
    e.preventDefault();
    if (emptyInput) {
      alert("Bạn chưa chọn hình");
      return;
    }

    const formData = new FormData();
    formData.append("type", type);
    imgs.forEach((item) => {
      formData.append("images", item);
    });

    sendRequest(adminApis.layout.updateImages(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      setImgs([]);
      setCurImgs(isSuccess.data);
      inputRef.current.value = "";
    }
  }, [isSuccess]);

  return (
    <form>
      <h5>{name}</h5>
      <div className="row mb-2">
        <h6 className="col-12">Ảnh hiện tại</h6>
        {curImgs.map((item, index) => (
          <div className="col-12 col-sm-4 col-md-3 col-lg-2 mb-2" key={index}>
            <img src={item} className="w-100" />
          </div>
        ))}
      </div>
      <input
        className="bg-white mb-2"
        type="file"
        multiple={type === "home"}
        onChange={changeHandler}
        ref={inputRef}
      />

      {imgs.length > 0 && <p className="mb-2">Ảnh đang chọn</p>}
      <div className="row">
        {imgs.map((item, index) => (
          <div key={index} className="col-12 col-sm-4 col-md-3 col-lg-2 mb-2">
            <img
              className="w-100"
              src={typeof item === "string" ? item : URL.createObjectURL(item)}
            />
          </div>
        ))}
      </div>

      {error && <p className="text-danger mb-1">{error.message}</p>}
      {isSuccess && <p className="text-success mb-1">Thành công</p>}

      <button
        className={"btn btn-success " + (emptyInput ? "disabled" : "")}
        onClick={submitHandler}
        type="submit"
      >
        {isLoading && spinner} Submit
      </button>
    </form>
  );
}

export default ImagesManger;
