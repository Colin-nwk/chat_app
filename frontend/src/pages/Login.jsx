import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useState } from "react";

const Login = () => {
  const { loading, login } = useLogin();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
    console.log(loading);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto min-w-96 ">
      <div className="w-full p-6 bg-indigo-600 bg-opacity-0 shadow-md round-lg bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="mb-4 text-3xl font-semibold text-center text-white">
          Login <span className="text-indigo-800">Chatter</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="flex items-center gap-2 text-white input input-bordered bg-indigo-950/20">
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="grow"
              placeholder="Daisy"
            />
          </label>

          <label className="flex items-center gap-2 text-white input input-bordered bg-indigo-950/20">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="grow"
              placeholder="*****"
            />
          </label>

          <Link className="inline-block link link-primary" to="/signup">
            {" "}
            {"Don't "} have an account ?
          </Link>
          <button
            className="btn btn-outline btn-primary btn-block border-white/30 hover:bg-indigo-600"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner text-info"></span>
            ) : (
              "LOGIN"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
