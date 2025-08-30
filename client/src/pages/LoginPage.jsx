import { Bird } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function LoginPage() {
  const [currstate, setCurrstate] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  function onSubmitHandler(e) {
    e.preventDefault();
    if (currstate === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currstate === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col">
      {/* left */}
      <Bird className="w-[min(30vw,250px)] h-[min(30vw,250px)] text-black" />

      {/* right */}

      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/95 text-gray-800 border-gray-200 p-6 flex flex-col gap-6 rounded-lg shadow-xl backdrop-blur-sm"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center text-gray-800">
          {currstate}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
          )}
        </h2>

        {currstate === "Sign Up" && !isDataSubmitted && (
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white text-gray-800"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white text-gray-800"
              placeholder="Email Address"
              required
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white text-gray-800"
              placeholder="Password"
              required
            />
          </>
        )}

        {currstate === "Sign Up" && isDataSubmitted && (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
            placeholder="provide a short bio"
            required
          ></textarea>
        )}

        <button
          className="py-3 bg-black text-white rounded-md cursor-pointer hover:bg-gray-800 transition-all duration-200"
          type="submit"
        >
          {currstate === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy</p>
        </div>

        <div className="flex flex-col gap-2">
          {currstate === "Sign Up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setCurrstate("Login")}
                className="font-medium text-black cursor-pointer hover:text-gray-700"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an account{" "}
              <span
                onClick={() => setCurrstate("Sign Up")}
                className="font-medium text-black cursor-pointer hover:text-gray-700"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
