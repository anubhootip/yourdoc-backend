import './NavBar.css'
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from './ThemeToggle';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact Us' },
]
const DownArrowIcon = <svg
  aria-hidden="true"
  focusable="false"
  data-prefix="fas"
  data-icon="caret-down"
  className="w-2 ml-2"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 320 512"
>
  <path
    fill="currentColor"
    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
  ></path>
</svg>;

function Navbar() {
  const [cookie, setCookie] = useCookies(["session"]);
  const navigate = useNavigate();
  let userId;
  try {
    userId = jwtDecode(cookie.session).id;
  } catch { }

  const onLogout = () => {
    setCookie("session", "", { path: "/", maxAge: 1 });
    navigate("/");
  }


  return (
    <nav
      className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light"
    >
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <button
          className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bars"
            className="w-6"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>
        </button>
        <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent1">
          <p className="text-xl text-white pr-2 font-semibold">YourDoc</p>

          <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
            {LINKS.map(l =>
              <li className="nav-item pl-8 pr-4" key={l.label}>
                <Link className="nav-link text-white opacity-60 hover:opacity-100 focus:opacity-100 p-0"
                  to={l.to}>{l.label}</Link>
              </li>
            )}
          </ul>
        </div>
        {userId ?
          <button
            className="blueBtn mr-4"
            type="button"
            onClick={onLogout}
          >
            Logout
          </button>
          : <>
            <div className="flex items-center relative  pr-8">

              <div className="dropdown relative">
                <button
                  className="blueBtn"
                  type="button"
                  id="dropdownMenuButton1h"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Login
                  {DownArrowIcon}
                </button>
                <ul
                  className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none"
                >
                  <li>
                    <Link
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      to="/login/doctor"
                    >Doctor Login</Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      to="/login"
                    >Patient Login</Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      to="/patientRegistration"
                    >Admin Login</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="dropdown relative pr-8">
              <button
                className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                type="button"
                id="dropdownMenuButton1h"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Register
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="caret-down"
                  className="w-2 ml-2"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  ></path>
                </svg>
              </button>
              <ul
                className="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
              >
                <li>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="/signup/doctor"
                  >Doctor Registration</Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="/signup"
                  >Patient Registration</Link>
                </li>
              </ul>
            </div>
          </>
        }
        <ThemeToggle />
      </div>
    </nav>
  );
}


export { Navbar };