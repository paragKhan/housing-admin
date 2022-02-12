import router from "next/router";
import { toast } from "react-toastify";
import store from "store";

export const errorify = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      toast.error("You must be logged in.");
      store.remove("uesr");
      store.remove("token");
      router.push("/login");
    } else {
      Object.values(error.response.data.errors).forEach((key) =>
        toast.error(key[0])
      );
    }
  } else {
    toast.error("Something went wrong");
  }
};
