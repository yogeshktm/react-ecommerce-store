import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import AppContext from "./AppContext";

function AllCategories(props) {
  const MyContext = useContext(AppContext);
  return (
    <div className="all-categories">
      <ul>
        {props.data.map(function (item, index) {
          return (
            <li key={index}>
              <Link to={MyContext.isLoggedin ? `/products/${item}` : `/login`}>{item}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AllCategories;
