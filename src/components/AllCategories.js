import { Link } from "react-router-dom";

function AllCategories(props) {
  return (
    <div className="all-categories">
      <ul>
        {props.data.map(function (item, index) {
          return (
            <li key={index}>
              <Link to={`/products/${item}`}>{item}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AllCategories;
