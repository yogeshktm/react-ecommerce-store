import ProductListItem from "../components/ProductListItem";
import { useContext, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ProductListItemLoader from "../components/ListingLoader";
import AppContext from "../components/AppContext";

export default function ProductListItemContainer(props) {
  const MyContext = useContext(AppContext);
  const [productData, setProductData] = useState();
  const [isLoading, setLoading] = useState(0);
  const [categoryName, setCategoryName] = useState();

  useEffect(() => {
    loadProducts();
  }, [categoryName]);
  useEffect(() => {
    setCategory();
  });
  const setCategory = () => {
    let catYName = window.location.pathname.split("/").pop();
    setCategoryName(catYName);
  };
  const loadProducts = () => {
    props.isCategory ? getCategoryProducts() : getAllProductsData();
  };
  const getAllProductsData = (e) => {
    setProductData(MyContext.ProductsData);
    setLoading(MyContext.isLoading);
  };
  const getCategoryProducts = (cat) => {
    let catName = window.location.pathname.split("/").pop();
    fetch(`https://fakestoreapi.com/products/category/${catName}`)
      .then((res) => res.json())
      .then((res) => {
        setProductData(res);
        setLoading(1);
      });
  };

  return (
    <Container maxWidth="md">
      <div className="product-list-wrapper">
        {isLoading ? (
          <Grid container spacing={3}>
            <ProductListItem data={productData}></ProductListItem>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <ProductListItemLoader items="20"></ProductListItemLoader>
          </Grid>
        )}
      </div>
    </Container>
  );
}
