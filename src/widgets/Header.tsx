import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from '../assets/logo.svg';
import search from '../assets/search.svg';
import { useEffect, useState } from "react";
import { Modal } from "antd";
import '../styles/antdModel.css';
import Catigories from "./Catigories";

const Header: React.FC = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search_query');

    const [query, setQuery] = useState('');

    const nav = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        if (searchQuery) setQuery(searchQuery);
    }, [searchQuery]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim() !== '') {
            nav(`/result?search_query=${query}`);
            handleCancel()
        } else {
            nav('/');
        }
    };

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='fixed z-30 w-full bg-def-black overflow-auto'>
            <header className="flex justify-center items-center h-16 1650res:h-12 540res:px-3">
                <div className="w-[97%] flex items-center justify-between">
                    <div>
                        <Link to='/'>
                            <img src={logo} alt="logo" className="w-28 1650res:w-24 540res:w-20" />
                        </Link>
                    </div>
                    <div className="w-[40%] 540res:hidden">
                        <form onSubmit={handleSubmit} className="w-full border-[#808080] border-[1px] flex overflow-hidden items-center rounded-full h-11 1650res:h-10">
                            <input type="text" value={query} onChange={handleInputChange} className="text-lg 1650res:text-base px-[1em] outline-none border-none bg-[var(--bg-color)] h-full text-white w-full" placeholder="Введите запрос" />
                            {query !== '' && <div className="flex items-center">
                                <img onClick={()=>setQuery('')} className="w-12 h-10 cursor-pointer rounded-full hover:bg-opacity-20 hover:bg-white" src="/cross.svg" alt="" />
                            </div>}
                            <button className="flex justify-center items-center outline-none border-none h-full px-5 1650res:px-3 bg-[hsla(0,0%,100%,.04)] hover:bg-[hsla(0,0%,100%,.10)]">
                                <img src={search} alt="search" className="w-8 1650res:w-7" />
                            </button>
                        </form>
                    </div>
                    <div className="540res:hidden" />
                    <img onClick={showModal} src={search} alt="search" className="hidden w-[1.3em] 540res:block" />
                </div>
                <Modal className="hidden 540res:block" open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={query} onChange={handleInputChange} className="text-[1em] px-[0.5em] outline-none border-none border-2 bg-[var(--bg-color)] h-full text-white bg-black w-11/12 p-1 rounded-md" placeholder="Введите запрос" />
                    </form>
                </Modal>
            </header>
            <Catigories/>
        </div>
    );
};

export default Header;
