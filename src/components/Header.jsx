import { Link } from "react-router-dom";
import { hourglassIcon } from "../assets/utils"
import { useStore } from "../store/useStore"



const Header = () => {
  const openModal = useStore(state => state.openModal);
  return (
    <header className = "w-[1410px]">
      <div className = "flex flex-row justify-between">
        <Link to = "/">
          <div className = "flex cursor-pointer">
            <p className = "text-[#8338EC] font-bold text-[31px]">Momentum</p>
            <img src = {hourglassIcon} alt = "hourglass icon"/>
          </div>
        </Link>
        <div className = "flex gap-[40px]">
          <button onClick = {() => openModal()} className = "font-serif border-[1px] border-[#8338EC] py-[10px] px-[20px] rounded-[5px] text-[16px] text-[#212529] font-[400] cursor-pointer">თანამშრომლის შექმნა</button>
          <Link to = "/tasks/new"><button className = "font-serif border-[1px] border-[#8338EC] py-[10px] px-[20px] rounded-[5px] text-[16px] font-[400] bg-[#8338EC] text-white cursor-pointer">+ შექმენი ახალი დავალება</button></Link>
        </div>
      </div>
    </header>
  )
}

export default Header