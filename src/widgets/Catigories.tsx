import { useState } from "react"
import { useGenres } from "../context/context"
import { genres } from "../utils/genre"
import { useLocation } from "react-router-dom"

const Catigories = () => {
    const {setGenre} = useGenres()
    const [active, setActive] = useState<number>(0)
    const location = useLocation()

    if(location.pathname !== '/') return;
    return (
        <div className="flex justify-center py-2 540res:pt-[0px] 540res:px-3">            
            <div className="flex w-[97%] items-center gap-3 540res:gap-2 overflow-x-scroll scrollnone whitespace-nowrap">
                {genres.map((item, index) => (
                    <div key={index} onClick={() => {setGenre(item.value); setActive(index)}} className={`${active == index ? 'bg-opacity-100 text-black' : 'hover:bg-opacity-20 bg-opacity-5 text-white'} rounded-lg 540res:rounded-md px-3 540res:px-[10px] py-1 540res:py-[3px] 540res:text-[13px] bg-white font-[450] cursor-pointer transition-colors duration-200 ease-in`}> 
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Catigories
