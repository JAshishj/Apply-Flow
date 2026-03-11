import {Link} from 'react-router-dom';

const Navbar = () => {

    return (
        <div className="bg-[#1E3A8A] p-4 inline-flex w-full">
            <h1 className="text-4xl text-white mt-0.5 ml-[8%] font-bold">ApplyFlow</h1>
            <nav className="bg-[#c8d2f6] rounded-full shadow-inner gap-8 p-1.5 ml-[53%]">
                <ul className="flex space-x-12 m-2 mx-10 text-xl font-semibold text-[#1E3A8A] list-none">
                    <li className="hover:text-[#38BDF8] hover:scale-110 cursor-pointer"><Link to="/">Dashboard</Link></li>
                    <li className="hover:text-[#38BDF8] hover:scale-110 cursor-pointer"><Link to="/Applications">Application</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar
