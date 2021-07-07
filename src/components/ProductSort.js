import { useState } from "react";

export default function ProductSort(props) {
  const [sortValue, setSortValue] = useState();
  const getSortvalue = (e) => {
    console.log(e.target.value);
    sortByPrice();
  };
  const sortByPrice = () => {
    let data = props.productData;
    let sortedData = data.sort((a, b) => {
      return a.price - b.price;
    });
    console.log("data", data);
    console.log("sorted data", sortedData);
  };
  return (
    <div className="product-sort">
      <select onChange={getSortvalue}>
        <option value="0">Price: Low to high</option>
        <option value="1">Price: High to low</option>
      </select>
    </div>
  );
}
