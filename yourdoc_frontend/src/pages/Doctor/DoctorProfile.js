import { useRef } from "react";
import { ListCard } from "../../components/ListCard/ListCard";
import { Overlay } from "../../components/Overlay";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { Navbar } from "../../components/nav-bar";
import { Fields, useProfilePage } from "./useProfilePage";

export function DoctorProfile() {
  const { user, listData, onSetAvailability, availState, defaultValues } = useProfilePage();
  const refForm = useRef();

  const onFillSame = () => {
    const monFromValue = refForm.current[Fields[0].id].value;
    const monToValue = refForm.current[Fields[0].id + '_to'].value;
    Fields.forEach(f => {
      refForm.current[f.id].value = monFromValue;
      refForm.current[f.id + '_to'].value = monToValue;
    })
  }

  return <>
    <Navbar />
    <div className="dark:bg-slate-700 min-h-screen flex-wrap p-4">
      <h2 class="mt-0 mb-2 text-4xl font-medium leading-tight dark:text-gray-200">
        Doctor Overview
      </h2>
      <div className="flex gap-4">
        <div className="relative min-w-[500px]">
          {!user ? <Overlay /> : null}
          <ProfileCard user={user} />
        </div>
        <div className="relative">
          {listData ? null : <Overlay />}
          <ListCard title="Upcoming Appointments" listData={listData} />
        </div>
      </div>
      <div className="relative inline-block">
        {!defaultValues ? <Overlay /> : null}

        <div className="min-w-[500px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Your Availability</h5>
          </div>
          <form onSubmit={onSetAvailability} ref={refForm}>
            <div>
              {Fields.map((f, i) =>
                <div key={f.placeholder} className="mb-4">
                  <div className="inline-block w-36">
                    <label for={f.id} className="dark:text-white" >{f.placeholder} </label>
                  </div>
                  <div className="inline-block">
                    <input type={f.type} id={f.id} placeholder={f.placeholder} required={f.isRequired} defaultValue={defaultValues?.[f.id]?.from_time} />
                    <span className="dark:text-white"> to </span>
                    <input type={f.type} id={f.id + '_to'} placeholder={f.placeholder} required={f.isRequired} defaultValue={defaultValues?.[f.id]?.to_time} />
                  </div>
                  {i === 0
                    ? <button
                      className="ml-10 inline-block rounded bg-blue-600 px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white hover:bg-blue-600-600 "
                      type="button"
                      onClick={onFillSame}
                    >
                      Fill Same for all Days
                    </button>
                    : null}
                </div>
              )}
            </div>
            <div className="relative inline-block">
              {availState === 'isLoading' ? <Overlay /> : null}
              <button
                type="submit"
                className="inline-block rounded bg-blue-600 px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white hover:bg-blue-600-600"
                disabled={availState === 'isLoading'}
              >
                Set
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </>
}