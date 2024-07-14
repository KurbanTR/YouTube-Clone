import { Link, useNavigate, useSearchParams } from "react-router-dom"
import logo from '../assets/logo.svg'
import search from '../assets/search.svg'
import { useEffect, useState } from "react"

const Header = () => {

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search_query');

    const [query, setQuery] = useState('')

    const nav = useNavigate()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    useEffect(()=>{
        if(searchQuery) setQuery(searchQuery)
    },[searchQuery])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(query.trim() !== ''){
            nav(`/result?search_query=${query}`)
        }else{
            nav('/')
        }
    }

    return (
        <header className="fixed w-full z-30 bg-def-black flex justify-center items-center h-[6vw]">
            <div className="w-[98%] flex items-center justify-between">
                <div>
                    <Link to='/'>
                        <img src={logo} alt="logo" className="w-[10vw]" />
                    </Link>
                </div>
                <div className="w-[45%]">
                    <form onSubmit={handleSubmit} className="w-full border-[#808080] border-[1px] flex overflow-hidden items-center rounded-full h-[3.7vw]">
                        <input type="text" value={query} onChange={handleInputChange} className="text-[1.5vw] px-[1.2vw] outline-none border-none bg-[var(--bg-color)] h-full text-white w-full" placeholder="Введите запрос"/>
                        <button className="flex justify-center items-center outline-none border-none h-full px-[1vw] bg-[hsla(0,0%,100%,.04)] hover:bg-[hsla(0,0%,100%,.10)]">
                            <img src={search} alt="search" className="w-[2.4vw]" />
                        </button>
                    </form>
                </div>
                <div/>
            </div>
        </header>
    )
}

export default Header
