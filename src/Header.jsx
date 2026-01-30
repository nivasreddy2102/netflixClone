import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { netflix_logo, profile_logo, supportedLanguages } from "./utils/Images";
import { signOut, onAuthStateChanged, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./utils/firebase";
import { addUser, removeUser } from "./utils/userSlice";
import { addSearch } from "./utils/searchSlice";
import { setLanguage } from "./utils/configSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const searchToggle = useSelector((store) => store.search.toggleSearch);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Auth listener */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignout = () => {
    signOut(getAuth()).catch((err) =>
      console.error("Sign out error:", err)
    );
  };

  const handleSearch = () => {
    dispatch(addSearch());
  };

  const handleSetLang = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        
        {/* LOGO */}
        <img
          src={netflix_logo}
          alt="Netflix"
          className="h-6 md:h-7 cursor-pointer"
          onClick={() => navigate("/browse")}
        />

        {/* RIGHT SECTION */}
        {user && (
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* LANGUAGE SELECT */}
            {searchToggle && (
              <select
                onChange={handleSetLang}
                className="
                  bg-black text-white rounded-md
                  px-2 py-1
                  text-xs md:text-sm
                  max-w-[90px] md:max-w-none
                "
              >
                {supportedLanguages.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            {/* SEARCH / HOME BUTTON */}
            <button
              onClick={handleSearch}
              className="
                px-3 md:px-4
                py-1 md:py-1.5
                text-xs md:text-sm
                bg-red-600 hover:bg-red-700
                text-white font-semibold
                rounded-md
                transition duration-200
                shadow-md hover:shadow-lg
                active:scale-95
                cursor-pointer
              "
            >
              {searchToggle ? "HomePage" : "AI Search"}
            </button>

            {/* PROFILE */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <img
                  src={profile_logo}
                  alt="Profile"
                  className="w-8 h-8 rounded"
                />

                {/* Arrow hidden on mobile */}
                <svg
                  className={`hidden md:block w-4 h-4 text-white transition-transform duration-200 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* DROPDOWN */}
              {showDropdown && (
                <div
                  className="
                    absolute right-0 top-12
                    w-44 md:w-48
                    bg-black border border-gray-800
                    py-2 shadow-lg rounded
                  "
                >
                  <div className="px-4 py-3 flex items-center gap-3 hover:bg-white/10 cursor-pointer">
                    <img
                      src={profile_logo}
                      alt="Profile"
                      className="w-8 h-8 rounded"
                    />
                    <span className="text-sm text-white capitalize">
                      {user.displayName}
                    </span>
                  </div>

                  <div className="border-t border-gray-800 my-1" />

                  <button
                    onClick={handleSignout}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:underline"
                  >
                    Sign out of Netflix
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
