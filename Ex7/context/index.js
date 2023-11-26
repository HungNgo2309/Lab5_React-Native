import { createContext, useContext, useReducer, useMemo } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
// import PropTypes from "prop-types";
// Create MyContext
const MyContext = createContext();
// Setting custom name for the context 
MyContext.displayName = "MyContextContext";
// React reducer
function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN": {
      return { ...state, darkMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
// React context provider
function MyContextControllerProvider({ children }) {
  console.log("Test")
  const initialState = {
    userLogin:{},
  };
  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}
//React custom hook for using context
function useMyContextController() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "useMyContextController should be used inside the MyContextControllerProvider."
    );
  }
  return context;
}
const USERS = firestore().collection("USERS")
const login = async(dispatch,newUser =>{
  auth().signInWithEmailAndPassword(newUser.email,newUser.password)
  .then(
    ()=>
      USERS.doc(newUser.email)
      .onSnapshot(u => {
        console.log("Đăng Nhập Thành Công voi user : ", u.data());
        dispatch({type: "USER_LOGIN", ...u.data()});
      })
  )
})

export {
  MyContextControllerProvider,
  useMyContextController,
  login,
};
