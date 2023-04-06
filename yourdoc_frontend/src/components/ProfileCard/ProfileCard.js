import { DateTime } from "luxon"

export function ProfileCard({ user }) {
  const { name, dob, blood_group: bloodGroup, gender, email, phone, address } = user || {};
  const age = Math.floor(DateTime.now().diff(DateTime.fromISO(dob), ["years"]).toObject().years);

  return <div className="relative w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <div className="flex flex-col items-center m-5 pb-10">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="User" />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{gender}</span>
          <div class="grid grid-cols-2 gap-6">
            <div className="dark:text-white">
              <div className="text-sm text-gray-500 dark:text-gray-400">DOB</div>
              <div>{DateTime.fromISO(dob).toFormat('dd-LL-yyyy')}</div>
            </div>
            <div className="dark:text-white">
              <div className="text-sm text-gray-500 dark:text-gray-400">Age</div>
              <div>{age}</div>
            </div>
            <div className="dark:text-white">
              <div className="text-sm text-gray-500 dark:text-gray-400">Blood Group</div>
              <div>{bloodGroup}</div>
            </div>
          </div>
          <div className="flex mt-4 space-x-3 md:mt-6">
            {/* <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button> */}
            {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a> */}
          </div>
        </div>
      </div>

      <div className="border-l-gray-500 border-l-2 mt-3 mb-3 flex flex-col justify-between p-10">
        <div className="dark:text-white break-words">
          <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
          <div>{email}</div>
        </div>
        <div className="dark:text-white break-words">
          <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
          <div>{phone}</div>
        </div>
        <div className="dark:text-white break-words">
          <div className="text-sm text-gray-500 dark:text-gray-400">Address</div>
          <div className="">{address}</div>
        </div>
      </div>
    </div>
  </div>

}