const Signup = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto min-w-96 ">
        <div className="w-full p-6 bg-indigo-600 bg-opacity-0 shadow-md round-lg bg-clip-padding backdrop-filter backdrop-blur-lg">
          <h1 className="mb-4 text-3xl font-semibold text-center text-white">
            Signup <span className="text-indigo-800">Chatter</span>
          </h1>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-white input input-bordered bg-indigo-950/20 ">
              Fullname
              <input type="text" className="grow" placeholder="Joe Daisy" />
            </label>{" "}
            <label className="flex items-center gap-2 text-white input input-bordered bg-indigo-950/20 ">
              Username
              <input type="text" className="grow" placeholder="Daisy" />
            </label>{" "}
            <label className="flex items-center gap-2 text-white input input-bordered bg-indigo-950/20 ">
              Password
              <input type="text" className="grow" placeholder="*****" />
            </label>{" "}
            <label className="flex items-center gap-2 text-white input input-bordered bg-indigo-950/20">
              Confirm Password
              <input type="password" className="grow" placeholder="*****" />
            </label>
            <div className="flex space-x-4">
              <label className="flex space-x-2 cursor-pointer label">
                <span className="label-text">Male</span>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
              <label className="flex space-x-2 cursor-pointer label">
                <span className="label-text">Female</span>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </div>
            <a className="inline-block link link-primary">
              {" "}
              Already have an account ?
            </a>
            <button className="btn btn-outline btn-primary btn-block border-white/30 hover:bg-indigo-600">
              SIGNUP
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
