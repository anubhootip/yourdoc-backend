import Img from '../photos/hospital.jpg';


export function HomeImage() {
  return <div
    className="flex flex-wrap">
    <img src={Img} alt="..." style={{ height: '400px', width: '100%' }} />
  </div>
}