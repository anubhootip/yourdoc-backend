import { Navbar } from "../../components/nav-bar";
import Footer from "../Footer";
import Img2 from '../../photos/gallery1.jpg'

function Contact() {
    return (
        <div className="bg-dark">
            <Navbar />
            <div class="flex max-w-full" style={{ height: '500px' }}>

                <div class="flex flex-col md:flex-row max-w-full rounded-lg">
                    <img class=" w-full h-96 md:h-auto object-cover" style={{ width: '650px' }} src={Img2} alt="" />
                    <div class="p-6 flex flex-col justify-start bg-gray-700" style={{ width: '900px' }}>
                        <h5 class="text-white text-xl font-semibold mb-2 text-center"> Contact Us</h5>
                        <br />
                        <br />
                        <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                                <label for="Email" class="form-label inline-block font-semibold mb-2 text-white"
                                >Email</label
                                >
                                <input
                                    type="email"
                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                        border border-solid border-gray-300 rounded transition ease-in-out m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="Email"
                                    placeholder="Email address"
                                />
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                                <label for="FName" class="form-label inline-block font-semibold mb-2 text-white"
                                >First Name</label
                                >
                                <input
                                    type="text"
                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                        border border-solid border-gray-300 rounded transition ease-in-out m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="FName"
                                    placeholder="FirstName"
                                />
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                                <label for="LName" class="form-label inline-block font-semibold mb-2 text-white"
                                >Last Name</label
                                >
                                <input
                                    type="text"
                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                        border border-solid border-gray-300 rounded transition ease-in-out m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="LName"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                                <label for="exampleFormControlTextarea1" class="form-label inline-block mb-2 font-semibold text-white"
                                >Type your message</label
                                >
                                <textarea
                                    class="form-control block w-ful px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                                         border border-solid border-gray-300 rounded transition ease-in-out m-0
                                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    placeholder="Your message" style={{ width: '385px' }}
                                ></textarea>
                            </div>
                        </div>
                        <div class="flex space-x-2 justify-center pt-3">
                            <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Submit</button>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}
export default Contact;