// import { useContext, useEffect, useState } from "react";
// import AppContext from "../components/AppContext";

// export default function CartContainer(props) {
//   useEffect(() => {
//     getCart();
//   }, []);
//   const MyContext = useContext(AppContext);
//   const [cartData, setCartData] = useState();
//   const [cartLoading, setCartLoading] = useState(0);
//   const getCart = () => {
//     let uid = sessionStorage.getItem("userid");
//     fetch(`https://fakestoreapi.com/carts/user/${uid}`)
//       .then((res) => res.json())
//       .then((res) => {
//         setCartData(res);
//         setCartLoading(1);
//       });
//     if (cartLoading) {
//       //LoadCartProducts();
//     }
//   };
//   const LoadCartProducts = () => {
//     cartData.map(function (item) {
//       console.log(item.products.productId);
//     });
//   };

//   return (
//     <div>
//       {/* {cartLoading
//         ? cartData.map(function (item) {
//             item.products.map(function (itemm) {
//               let newArray;
//               newArray.push(itemm.productId);
//             });
//           })
//         : ""} */}
//     </div>
//   );
// }
