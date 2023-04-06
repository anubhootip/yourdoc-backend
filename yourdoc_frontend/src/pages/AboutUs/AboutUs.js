import { HomeImage } from "../../components/HomeImage";
import { Navbar } from "../../components/nav-bar";
import Footer from "../Footer";

function AboutUs() {
    return (
        <div className="bg-dark">
            <Navbar />
            <HomeImage />

            <div className='text-center bg-blue-400'>

                <h1 className="text-black font-semibold text-2xl pt-3 " align="center">About Us</h1>
                <br />
                <br />
                <p className="text-black">


                    YourDoc is a rapidly growing digital health platform and marketplace that provides comprehensive care virtually, incorporating advanced at medical services.

                    We connect patients with board-certified physicians of all disciplines through our proprietary technology platform. Founded in Halifax, the service has delivered over 225,000 visits across Canada.

                </p>
                <br />
                <br />

                <p className="text-black">
                    It was founded by doctors for doctors.

                    We started the company to empower independent physicians to improve the quality and access of care available to everyone.



                    Our digital health platform and marketplace connects doctors and patients in a unique way; bringing the world’s most advanced doctor’s office directly to patients.



                    The end result is faster, more convenient and more compassionate care. “
                </p>

                <br />
                <br />

                <p className="text-black">
                    At YourDoc, we believe healthcare is a basic human right not a privilege for those with money and connections. Everyone should have access to affordable high-quality care. Rocket Doctor is on a mission to power healthcare providers to deliver high-quality, comprehensive and affordable care to all patients.

                    Through our efficient and automated digital health platform, we’re making high-quality healthcare affordable, accessible, quick and convenient. Particularly for those living in underserved communities.
                </p>
                <br />
                <br />

            </div>
            <Footer />
        </div >
    );
}

export default AboutUs;