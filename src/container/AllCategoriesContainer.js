import { useEffect, useState } from "react";
import AllCategories from "../components/AllCategories";

export default function AllCategoriesContainer(props) {
  const [categoriesData, setCategoryData] = useState();
  const [cateogoriesStatus, setCateogoriesStatus] = useState(0);
  useEffect(() => {
    getAllCategories();
  }, []);
  const getAllCategories = (e) => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((res) => {
        setCategoryData(res);
        setCateogoriesStatus(1);
      });
  };
  return cateogoriesStatus ? (
    <AllCategories data={categoriesData}></AllCategories>
  ) : (
    "..."
  );
}
