import { useState } from "react";
import { ListCard } from "../../components/ListCard/ListCard";
import { Navbar } from "../../components/nav-bar";
import { Overlay } from "../../components/Overlay";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { useSearch } from "../../hooks/useSearch";
import { useProfilePage } from "./useProfilePage";
import { useNavigate } from "react-router-dom";

function Search({ setSearchedDoctorResults }) {
  const { search } = useSearch();
  const [loadingState, setLoadingState] = useState('isInit');

  const onSearch = async (e) => {
    e.preventDefault();
    const q = e.target.q.value;
    if (q) {
      setLoadingState('isLoading');
      const searchDoctorResults = await search(q);
      setSearchedDoctorResults(searchDoctorResults);
      setLoadingState('isSuccess');
    }
  }
  const onChange = (e) => {
    const q = e.target.value;
    if (!q) {
      setSearchedDoctorResults([]);
    }
  }

  return <form onSubmit={onSearch}>
    <div className="relative mb-4">
      <input
        type="text"
        className="inline-block txt min-h-[auto] rounded bg-transparent px-3 leading-[2.15] outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
        id="q"
        onChange={onChange}
        placeholder="Search Doctor..."
      />
      <div className="ml-2 inline-block relative">
        {loadingState === 'isLoading' ? <Overlay /> : null}
        <button type="submit" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </div>
    </div>
  </form>
}

export function Profile() {
  const { user, listData } = useProfilePage();
  const [searchedDoctorResults, setSearchedDoctorResults] = useState();
  const navigate = useNavigate();

  return <>
    <Navbar />
    <div className="dark:bg-slate-700 min-h-screen min-w-max flex-wrap p-4">
      <h2 class="mt-0 mb-2 text-4xl font-medium leading-tight dark:text-gray-200">
        Patient Overview
      </h2>
      <div className="relative flex">
        <ListCard
          title="Search"
          listData={searchedDoctorResults?.map(d => ({ title: d.name, subTitle: d.specialization + ', ' + d.address, rightText: d.gender, onItemClick: () => navigate('/appointment/' + d.id) })) || []}
          headerComponent={<Search {...{ setSearchedDoctorResults }} />}
        />
      </div>
      <div className="flex gap-4">
        <div className="relative">
          {!user ? <Overlay /> : null}
          <ProfileCard user={user} />
        </div>
        <div className="relative">
          {listData ? null : <Overlay />}
          <ListCard title="Upcoming Appointments" listData={listData} />
        </div>
      </div>
    </div>
  </>
}