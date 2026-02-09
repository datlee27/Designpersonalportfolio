import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function BlogNavigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="bg-white py-5 sticky top-0 z-50 shadow-sm font-sans">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold italic text-black hover:text-[#FF5722] transition-colors duration-300">
                        — Portfolio
                    </Link>

                    <div className="hidden md:flex gap-10 items-center">
                        <Link to="/blog" className="text-black font-medium text-base hover:text-[#FF5722] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#FF5722]">
                            Blog
                        </Link>
                    </div>

                    <button
                        className="md:hidden flex flex-col gap-1.5 p-1 border-none bg-transparent cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed top-[70px] left-0 right-0 bg-white p-5 shadow-lg z-40 transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-5 opacity-0 invisible'}`}>
                <div className="flex flex-col gap-4">
                    <Link to="/" className="text-black font-medium text-base p-2 hover:text-[#FF5722] transition-colors">Home</Link>
                    <Link to="/blog" className="text-[#FF5722] font-medium text-base p-2">Blog</Link>
                </div>
            </div>
        </>
    );
}
