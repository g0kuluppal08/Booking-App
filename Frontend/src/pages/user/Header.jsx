import { Link, useNavigate } from 'react-router-dom';


export function Header(){
    return (
        <nav className="w-full bg-blue-600  py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
                <div className="space-x-4 text-lg font-bold ">
                    <Link to="/" className="hover:underline text-white">Home</Link>
                    <Link to="/signup" className="hover:underline text-white">Sign Up</Link>
                    <Link to="/signin" className="hover:underline text-white">Sign In</Link>
                </div>
            </div>
        </nav>
    )
}