import { useContext, useState } from "react";
import userImage from "../assets/user640.png";
import { AuthContext } from "../context/AuthContextProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const [toggleUserOptions, setToggleUserOptions] = useState(false)
  // const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  function logoutAccount() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white z-20 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src=""
            className="h-8"
          // alt="Flowbite Logo"
          />
          <span className=" self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Straming Tube
          </span>
        </a>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!user?.username ? (
            <Link to="/login">
              {" "}
              <button
                type="button"
                className="focus:outline-none mt-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Login
              </button>{" "}
            </Link>
          ) : (
            <div>
              <button
                onClick={() => { setToggleUserOptions(!toggleUserOptions) }}
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={!user ? userImage : user.avatar}
                  alt="user photo"
                />
              </button>
              {!toggleUserOptions ? "" :
                <div id="dropdown" className="absolute top-14 lg:right-12  z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    {/* <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                  </li> */}
                    <li>
                      <a href={`/${user.username}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{user?.fullName}</a>
                    </li>
                    <li>
                      <a href="#" onClick={logoutAccount} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                    </li>
                  </ul>
                </div>}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
