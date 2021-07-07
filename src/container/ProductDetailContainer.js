import { useEffect, useState } from "react";
import ProductDetail from "../components/ProductDetail";

export default function ProductDetailContainer(props) {
  let id = window.location.pathname.split("/").pop();
  const [productDetail, setProductDetail] = useState();
  const [productDetailLoader, setProductDetailLoader] = useState(0);
  useEffect(() => {
    getProductDetail();
  }, []);
  const getProductDetail = (e) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setProductDetail(res);
        setProductDetailLoader(1);
      });
  };
  return (
    <div>
      {productDetailLoader ? (
        <ProductDetail detailData={productDetail}></ProductDetail>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
