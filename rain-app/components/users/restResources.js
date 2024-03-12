import db from "../../src/firebase";
import { collection,query,where,getDoc, doc } from "firebase/firestore";
// const getUser = async (user_id) =>{
//     try{
//         const userRef = db.collection("user").doc(user_id);
//         const userDoc = await userRef.get();
//         console.log(userDoc);
//     } catch (e){
//         console.log("error READING a user data");
//         return null;
//     }
// };

const getUser = async (user_id) => {
  try{
    const userRef = doc(db, "users", user_id);
    const userDoc = await getDoc(userRef);
    const data = await userDoc.data();
    console.log(data.name);
    return data;
  } catch (e) {
    console.log("error reading user:", e);
    return null;
  }
};

export default getUser;