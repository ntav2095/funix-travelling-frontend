import { useEffect } from "react";

function Banner() {
  const [fetchBanner, loading, banner, error] = useAxios();

  useEffect(() => {
    fetchBanner();
  }, []);
  return <div>{banner && <Slider></Slider>}</div>;
}

export default Banner;
