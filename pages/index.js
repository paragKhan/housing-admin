import { login } from "apis/auth";
import { useRouter } from "next/router";
import { useAuth } from "providers/AuthProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import store from "store";

export default function Home() {
  const [loginFailed, setLoginFailed] = useState(false);
  const { setUser, setToken } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      store.set("token", res.token);
      store.set("user", {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        photo: res.user.photo,
      });
      setUser(store.get("user"));
      setToken(store.get("token"));
      setLoginFailed(false);
      toast.success("Login successful");
      router.replace("/dashboard");
    } catch (error) {
      toast.error("Invalid email or password");
      setLoginFailed(true);
    }
  };

  return (
    //create a custom styled react login page
    <div className="d-flex vh-100 vw-100 justify-content-center align-items-center">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center">Login</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                {...register("email", { required: true })}
                defaultValue=""
                type="text"
                className={`form-control ${errors.email && "is-invalid"}`}
              />
              {errors.email && (
                <p className="invalid-feedback">Email is required</p>
              )}
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputEmail1">Password</label>
              <input
                defaultValue=""
                {...register("password", { required: true })}
                type="password"
                className={`form-control ${errors.password && "is-invalid"}`}
              />
              {errors.password && (
                <p className="invalid-feedback">Password is required</p>
              )}
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
