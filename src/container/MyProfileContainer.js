import { useEffect, useState, useContext } from "react";
import useInput from "../hooks/useInput";
import MyProfile from "../components/MyProfile";
import AppContext from "../components/AppContext";
import getFirebase from "../firebase";

export default function MyProfileContainer(props) {
  const MyContext = useContext(AppContext);
  const dName = useInput("");
  const newPwd = useInput("");
  const confirmNewPwd = useInput("");
  const [isLoading, setLoading] = useState(false);
  const firebaseInstance = getFirebase();
  const [pwdMatch, setPwdMatch] = useState(false);
  // Handle user update 
  const handleUpdate = (e) => {
    e.preventDefault();
    const user = firebaseInstance.auth().currentUser;
    if (dName.value != '') {
      setLoading(true);
      user.updateProfile({
        displayName: dName.value,
        photoURL: "https://robohash.org/yomartpic/" + MyContext.userData.email + '?set=set3'
      }).then(() => {
        // Update successful
        // ...
        updateUserName(user.uid, user.displayName);
        alert("successs");
        MyContext.setUserData(user);
        MyContext.setUserName(user.displayName);
        console.log(user);
        setLoading(false);
      }).catch((error) => {
        // An error occurred
        // ...
        alert("update error", error);
      });
    }
  }
  const updateUserName = (uid, dName) => {
    let useRef = firebaseInstance.database().ref('users/' + uid);
    useRef.update({
      dName: dName
    });
  }
  const handleEmailVertify = () => {
    const firebaseInstance = getFirebase();
    firebaseInstance.auth().currentUser.sendEmailVerification()
      .then(() => {
        alert("email sent");
      });
  }
  const handlePwdUpdate = (event) => {
    event.preventDefault();
    const user = firebaseInstance.auth().currentUser;
    const newPassword = newPwd.value;
    console.log(checkPwd);
    if (pwdMatch) {
      user.updatePassword(newPassword).then(() => {
        alert("success");
        // Update successful.
      }).catch((error) => {
        alert("error");
        // An error ocurred
        // ...
      });
    }
  }
  const checkPwd = () => {
    if (newPwd.value === confirmNewPwd.value) {
      setPwdMatch(true);
    }
    else {
      setPwdMatch(false);
    }
  }
  return (
    <div>
      <MyProfile pwdMatch={pwdMatch} checkPwd={checkPwd} isLoading={isLoading} emailVertify={handleEmailVertify} handleUpdate={handleUpdate} data={MyContext.userData} dName={dName} handlePwdUpdate={handlePwdUpdate} newPwd={newPwd} confirmNewPwd={confirmNewPwd}></MyProfile>
    </div>
  );
}
