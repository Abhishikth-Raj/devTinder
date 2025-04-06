import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [emailId, setEmailId] = useState("elon1@gmail.com");
  const [password, setPassword] = useState("Elon@123");

  const handleLogin = async () => {
    try {
      const waitTime = 5000;
        setTimeout(() => console.log("Request taking a long time"), waitTime);
      const res = await axios.post("http://localhost:7777/login", {
        emailId,
        password,
      },
      {withCredentials: true},
    );
    
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset form-control w-full max-w-xs my-4">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset form-control w-full max-w-xs my-4">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
