import { useEffect, useState } from "react";
import MyProfile from "../components/MyProfile";

export default function MyProfileContainer(props) {
  const [userData, setUserData] = useState();
  const [myProfileLoading, setMyProfileLoading] = useState(0);
  useEffect(() => {
    const getUserDetails = () => {
      fetch("https://fakestoreapi.com/users")
        .then((res) => res.json())
        .then((res) => {
          let userName = sessionStorage.getItem("username");
          let data = res.filter((item) => item.username === userName);
          setUserData(data);
          setMyProfileLoading(1);
        });
    };
    getUserDetails();
  }, []);

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
