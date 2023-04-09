import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function AdminNavbar({ fixed }) {
  const [, setCookie] = useCookies(["session"]);
  const navigate = useNavigate();

  const onLogout = () => {
    setCookie("session", "", { path: "/", maxAge: 1 });
    navigate("/");
  }


  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="flex-shrink-0">
            <a
              className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo"
            >
              YOUR DOC ADMIN PANEL
            </a>
          </div>
          <div className="flex-grow lg:flex lg:items-center lg:w-auto hidden" id="example-navbar-info">
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <button class="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={onLogout}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export { AdminNavbar };
