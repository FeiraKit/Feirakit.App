import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../components/Loading";

// actions
import { Init } from "../store/actions";

import { LoginRoutes } from "./login.route";
import { AppRoutes } from "./app.route";



export function Routes() {
  const user = useSelector((state) => state.AuthReducers.authToken);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const init = async () => {
    await dispatch(Init());
    setLoading(false);
  };
  
  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {user !== null && user !== "" ? <AppRoutes /> : <LoginRoutes />}
    </NavigationContainer>
  );
}
