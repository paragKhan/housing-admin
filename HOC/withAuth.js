/* eslint-disable react/display-name */

import router from "next/router";
import { useEffect } from "react";
import store from "store";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const user = store.get("user");
    const token = store.get("token");

    useEffect(() => {
      if (!token || !user) {
        router.replace("/");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
