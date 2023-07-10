import React from 'react';
import arr from '../assets/images/arr_back.svg';
interface NavigationProps {
    page: number;
    setPage: (page: number) => void;
}
const Navigation: React.FC<NavigationProps> = ({ page, setPage }) => {
    const pages = 4;
    return (
        <nav>
            <button className='flex gap-4 btn_back' onClick={() => { if (page > 0) { setPage(0) } }}>
                <img src={arr} alt="" />Back
            </button>
            <div className="pagination flex">
                {[...Array(pages)].map((_, index) => (
                    <span key={index} className={`pageCounter ${index <= page ? 'active' : ''}`} />
                ))}
            </div>
        </nav >
    );
};

export default Navigation;
