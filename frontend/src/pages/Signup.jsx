import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

// import axios from "axios";

const Signup = () => {
  const { loading, signup } = useSignup();
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

  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
    console.log(loading);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto min-w-96">
        <div className="w-full p-6 bg-indigo-600 bg-opacity-0 shadow-md round-lg bg-clip-padding backdrop-filter backdrop-blur-lg">
          <h1 className="mb-4 text-3xl font-semibold text-center text-white">
            Signup <span className="text-indigo-800">Chatter</span>
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="flex items-center gap-2 text-white input input-bordered bg-indigo-950/20">
              Fullname
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="grow"
                placeholder="Joe Daisy"
              />
            </label>

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

            <label className="flex items-center gap-2 text-white input input-bordered bg-indigo-950/20">
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="grow"
                placeholder="*****"
              />
            </label>

            <div className="flex space-x-4">
              <label className="flex space-x-2 cursor-pointer label">
                <span className="label-text">Male</span>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleGenderChange}
                  className="radio radio-primary"
                />
              </label>
              <label className="flex space-x-2 cursor-pointer label">
                <span className="label-text">Female</span>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleGenderChange}
                  className="radio radio-primary"
                />
              </label>
            </div>

            <Link className="inline-block link link-primary" to="/login">
              Already have an account ?
            </Link>
            <button
              disabled={loading}
              type="submit"
              className="btn btn-outline btn-primary btn-block border-white/30 hover:bg-indigo-600"
            >
              {loading ? (
                <span className="loading loading-spinner text-info"></span>
              ) : (
                "SIGNUP"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
