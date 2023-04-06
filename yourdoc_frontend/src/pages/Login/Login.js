import { Link } from "react-router-dom";
import { Navbar } from "../../components/nav-bar";
import { Overlay } from "../../components/Overlay";
import { RadioInput2 } from "../../components/RadioInput";
import { Fields, useLoginPage } from "./useLoginPage";
import './Login.css'
import Footer from "../Footer";

export function Login({ type }) {
  const { onSubmitLogin, loginState } = useLoginPage(type);

  return <>
    <Navbar />
    <section className="min-h-full">
      <div className="h-full dark:bg-gray-700">
        <div
          className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div
            className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample" />
          </div>
          <div className="relative mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={onSubmitLogin}>
              {Fields.map(f => {
                if (f.type === 'radio') {
                  return <RadioInput2 key={f.placeholder} options={f.options} label={f.placeholder} name={f.id} isRequired={f.isRequired} />
                }
                return <div className="relative mb-8" data-te-input-wrapper-init key={f.placeholder}>
                  <input
                    type={f.type}
                    className="txt peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id={f.id}
                    placeholder={f.placeholder} required={f.isRequired} />
                  <label
                    for={f.id}
                    className="label"
                  >{f.placeholder}
                  </label>
                </div>
              })}

              <div className="mb-6 flex items-center justify-between">
                {/* <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-blue-bg-blue-600 dark:checked:border-blue-bg-blue-600 checked:bg-blue-600 dark:checked:bg-blue-600 checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                  type="checkbox"
                  value=""
                  id="exampleCheck2" />
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  for="exampleCheck2">
                  Remember me
                </label>
              </div> */}
              </div>

              <div className="text-center lg:text-left">
                <div className="relative inline-block">
                  {loginState === 'isLoading' ? <Overlay /> : null}
                  <button
                    type="submit"
                    className="inline-block rounded bg-blue-600 px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-600-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    disabled={loginState === 'isLoading'}
                  >
                    Login
                  </button>
                </div>
                <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                  Don't have an account?
                  <Link
                    to={type ? "/signup/" + type : "/signup"}
                    className="text-red-500 transition duration-150 ease-in-out hover:text-red-500-600 focus:text-red-500-600 active:text-red-500-700"
                  >Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
}