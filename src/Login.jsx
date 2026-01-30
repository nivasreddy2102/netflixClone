import React, { useState, useRef } from "react";
import Header from "./Header";
import { BG_netflix } from "./utils/Images";
import { checkValidation } from "./utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./utils/firebase";

function Login() {
  const [isSignup, setIsSignup] = useState(true);
  const [error, setError] = useState("");

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleAuth = async () => {
    const message = isSignup
      ? checkValidation(
          name.current.value,
          email.current.value,
          password.current.value
        )
      : checkValidation(
          "dummy",
          email.current.value,
          password.current.value
        );

    setError(message);
    if (message) return;

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen w-screen">
      <Header />

      {/* BACKGROUND */}
      <img
        src={BG_netflix}
        alt="Netflix Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60"></div>

      {/* FORM CONTAINER */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="
            bg-black/75
            p-6 md:p-10
            rounded-md
            w-full max-w-[350px]
            text-white
          "
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            {isSignup ? "Sign Up" : "Sign In"}
          </h1>

          {isSignup && (
            <input
              ref={name}
              type="text"
              placeholder="Name"
              className="w-full p-3 mb-4 bg-gray-700 rounded"
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 bg-gray-700 rounded"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 bg-gray-700 rounded"
          />

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <button
            type="button"
            onClick={handleAuth}
            className="
              w-full
              bg-red-600 hover:bg-red-700
              py-3
              rounded
              font-semibold
              transition
              cursor-pointer
            "
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="
              w-full mt-4
              bg-white text-black
              py-3
              rounded
              font-semibold
              cursor-pointer
            "
          >
            Sign in with Google
          </button>

          <p className="text-gray-400 text-sm mt-4">
            {isSignup ? "Already have an account?" : "New to Netflix?"}
            <span
              className="text-white cursor-pointer hover:underline ml-1"
              onClick={() => setIsSignup(!isSignup)} 
            >
              {isSignup ? "Sign in now" : "Sign up now"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
