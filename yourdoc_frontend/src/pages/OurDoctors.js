import Img1 from '../photos/doctor4.jpg'
import Img2 from '../photos/doctor2.jpg'
import Img3 from '../photos/doctor6.jpg'



function OurDoctors() {
  return (
    <div id="carouselExampleCaptions" className="carousel slide relative" data-bs-ride="carousel">
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner relative w-full overflow-hidden">
        <div className="carousel-item active relative float-left w-full" style={{ height: '500px' }}>
          <img
            src={Img1}
            className="block w-full"
            alt="..."
          />
          <div className="carousel-caption hidden md:block absolute text-center">
            <h5 className="text-xl bg-gray-800">Dr.Rahul Tyagi</h5>
            <p className=' bg-gray-800'>Oncologist</p>
            <p className=' bg-gray-800'>Specialist in chemotherapy.</p>
          </div>
        </div>
        <div className="carousel-item relative float-left w-full" style={{ height: '500px' }}>
          <img
            src={Img2}
            className="block w-full"
            alt="..."
          />
          <div className="carousel-caption hidden md:block absolute text-center">
            <h5 className="text-xl bg-gray-800">Dr.Jyoti Tyagi</h5>
            <p className=' bg-gray-800'>Heart Surgery</p>
            <p className=' bg-gray-800'>Specialist in Heart strokes.</p>
          </div>
        </div>
        <div className="carousel-item relative float-left w-full" style={{ height: '500px' }}>
          <img
            src={Img3}
            className="block w-full"
            alt="..."
          />
          <div className="carousel-caption hidden md:block absolute text-center">
            <h5 className="text-xl  bg-gray-800">Dr.Harshita Sharma</h5>
            <p className=' bg-gray-800'>Dermatology</p>
            <p className=' bg-gray-800'>Specialist in skin and hair problem.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}


export default OurDoctors;