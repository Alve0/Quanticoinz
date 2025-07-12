import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const Navber = () => {
  const { user, signout } = use(AuthContext);

  const hendelCLick = async () => {
    try {
      const res = await signout();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="p-4 sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="/">quanticoinz</a>
        </div>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search..."
              className=" rounded-full py-2 px-4 focus:outline-none ring-lime-400/40 ring-2  "
            />
          </div>
          {user ? (
            <>
              {" "}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="m-1">
                  <div className="avatar avatar-offline">
                    <div className="w-14 cursor-pointer select-none  rounded-full">
                      <img src={user.photoURL} />
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <h3 onClick={hendelCLick}>Logout</h3>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div>
              <Link to={"/log-reg/login"}>
                <button className="btn hover:bg-lime-600 hover:text-white">
                  login
                </button>
              </Link>
              <Link to={"/log-reg/register"}>
                <button className="btn bg-lime-600 text-white mr-2 ml-3">
                  {" "}
                  Join
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navber;
