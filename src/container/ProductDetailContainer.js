import { useEffect, useState } from "react";
import ProductDetail from "../components/ProductDetail";

export default function ProductDetailContainer(props) {
  const [productDetail, setProductDetail] = useState();
  const [productDetailLoader, setProductDetailLoader] = useState(0);
  useEffect(() => {
    const getProductDetail = (e) => {
      let id = window.location.pathname.split("/").pop();
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setProductDetail(res);
          setProductDetailLoader(1);
        });
    };
    getProductDetail();
  }, []);

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
