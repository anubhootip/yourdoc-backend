import axios from "axios";
import { useEffect, useState } from "react";
import { AdminNavbar } from "../../components/adminNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";


export function AdminDashboard() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const loadData = async () => {
    const response = await axios.get("http://localhost:3000/admin");
    setUserData(response.data.data);
  };

  useEffect(() => {
    loadData();
  }, []);


  const deleteUser = async (id) => {
    try {
      await axios.delete("http://localhost:3000/admin/" + id);
      toast.success("Doctor Removed Sucessfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      //await delay(2000);
      loadData();
      //window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const approveUser = async (id) => {
    try {
      await axios.put("http://localhost:3000/admin/" + id);
      toast.success("Doctor Approved Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      //await delay(2000);
      loadData();
      //window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };


  const ITEMS_PER_PAGE = 5;

  return (
    <>
      <div className="bg-dark">
        <AdminNavbar />

        <div className="flex flex-row bg-dark inline-block">
          <div className="w-full px-4 py-8 mt-8 flex-row items-center justify-center">
            <h1 className="text-3xl font-bold justify-center justify-center items-center text-center">New Doctors Register</h1>
            <div className="chart-table">
              <table className="table-auto w-fit text-center">
                <thead className="border-b bg-gray-800">
                  <tr>
                    <th scope="col" className="text-sm font-lg text-white px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="text-sm font-lg text-white px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="text-sm font-lg text-white px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="text-sm font-lg text-white px-6 py-4">
                      Phone
                    </th>
                    <th scope="col" className="text-sm font-lg text-white px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="border-black border-b-2">
                  {userData
                    .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
                    .map((data, index) => {
                      return (
                        <tr
                          key={index.id}
                          className="bg-white border-b-2 font-semibold px-6 py-4 border-black"
                        >
                          <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                            {data.name}
                          </td>
                          <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                            {data.email}
                          </td>
                          <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                            {data.phone}
                          </td>
                          <td className="text-sm flex flex-col md:flex-row justify-center md:justify-between items-center text-gray-900 font-bold px-6 py-4 space-y-2 md:space-y-0 md:space-x-4 whitespace-nowrap">
                            <Link to={`userProfile/${data.id}`}><button className="bg-gray-600 text-white px-6 py-2 rounded-lg w-full md:w-auto">
                              View
                            </button>
                            </Link>
                            <button className="bg-green-600 hover:bg-green-800 text-white px-6 py-2 rounded-lg w-full md:w-auto" onClick={e => approveUser(data.id)}>
                              Approve
                            </button>
                            <button className="bg-red-600 hover:bg-red-800 text-white px-6 py-2 rounded-lg w-full md:w-auto" onClick={e => deleteUser(data.id)}>
                              Reject
                            </button>
                            <ToastContainer />
                          </td>
                        </tr>
                      );
                    }
                    )}
                </tbody>
              </table>
              <ReactPaginate
                pageCount={Math.ceil(userData.length / ITEMS_PER_PAGE)}
                onPageChange={({ selected }) => setCurrentPage(selected)}
                containerClassName="flex justify-center mt-8"
                pageClassName="px-4 py-2 text-sm border-l font-medium text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                previousLabel="Prev"
                nextLabel="Next"
                previousClassName="px-4 py-2 text-sm font-medium border-l text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                nextClassName="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-l rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                activeClassName="px-4 py-2 text-sm border-l font-medium text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

