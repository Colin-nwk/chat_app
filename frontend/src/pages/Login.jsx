const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className="w-full p-6 round-lg shadow-md bg-indigo-600  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-center text-3xl font-semibold text-white mb-4">
          Login <span className="text-indigo-800">Chatter</span>
        </h1>

        <div className="space-y-4">
          <label className="input input-bordered flex items-center gap-2 bg-indigo-950/20 text-white ">
            Username
            <input type="text" className="grow" placeholder="Daisy" />
          </label>{" "}
          <label className="input input-bordered flex items-center gap-2 bg-indigo-950/20 text-white">
            Password
            <input type="password" className="grow" placeholder="*****" />
          </label>
          <a className="link link-primary inline-block">
            {" "}
            {"Don't "} have an account ?
          </a>
          <button className="btn btn-outline btn-primary btn-block border-white/30 hover:bg-indigo-600">
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
