import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export const useHeader = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search_query');
    const inputRef = useRef<HTMLInputElement>(null);

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

    useEffect(() => {
        if (isModalOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isModalOpen]);

    return {query, inputRef, setQuery, isModalOpen, handleCancel, handleInputChange, handleSubmit, showModal}
}