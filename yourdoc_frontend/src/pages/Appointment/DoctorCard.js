import { Overlay } from "../../components/Overlay";

export function DoctorCard({ name, specialization }) {
  return <figure className="relative md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
    {!name ? <Overlay /> : null}
    <img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="" width="384" height="512" />
    <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
      <blockquote>
        <p className="text-lg font-medium dark:text-gray-300">
          “Our doctors are highly qualified and verified”
        </p>
      </blockquote>
      <figcaption className="font-medium">
        <div className="text-sky-500 dark:text-sky-400">
          {name}
        </div>
        <div className="text-slate-700 dark:text-slate-500">
          {specialization}
        </div>
      </figcaption>
    </div>
  </figure>
}