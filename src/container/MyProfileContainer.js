import { useContext, useEffect, useState } from "react";
import AppContext from "../components/AppContext";
import MyProfile from "../components/MyProfile";

export default function MyProfileContainer(props) {
  const MyContext = useContext(AppContext);
  const [AllUsersData, setAllUsersData] = useState();
  const [userData, setUserData] = useState();
  const [myProfileLoading, setMyProfileLoading] = useState(0);
  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = () => {
    if (MyContext.isLoggedin) {
      fetch("https://fakestoreapi.com/users")
        .then((res) => res.json())
        .then((res) => {
          let userName = sessionStorage.getItem("username");
          setAllUsersData(res);
          let data = res.filter((item) => item.username === userName);
          setUserData(data);
          setMyProfileLoading(1);
        });
    }
  };
  return (
    <div>
      {myProfileLoading ? (
        <MyProfile data={userData}></MyProfile>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
