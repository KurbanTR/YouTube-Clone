import { useState } from "react"
import { useGenres } from "../context/context"
import { genres } from "../utils/genre"

const Catigories = () => {
    const {setGenre} = useGenres()
    const [active, setActive] = useState<number>(0)
    return (
        <div className="flex justify-center py-2">            
            <div className="flex w-[97%] items-center gap-3 overflow-x-scroll scrollnone whitespace-nowrap">
                {genres.map((item, index) => (
                    <div key={index} onClick={() => {setGenre(item.value); setActive(index)}} className={`${active == index ? 'bg-opacity-100 bg-white text-black' : 'hover:bg-opacity-20 bg-opacity-5 text-opacity-100'} rounded-lg px-3 py-1 bg-white text-white cursor-pointer transition-colors duration-200 ease-in`}> 
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Catigories
