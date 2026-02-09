import { Link } from 'react-router-dom';

export function BlogFooter() {
    return (
        <footer className="bg-[#2C2C2C] text-white py-20 font-sans">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-20 mb-16">
                    <div className="flex flex-col gap-8">
                        <h2 className="text-5xl font-black italic text-[#FF5722] mb-2">Portfolio</h2>
                        <div className="flex flex-col gap-4">
                            <Link to="/" className="text-[#8899AA] hover:text-white transition-colors duration-300 text-base no-underline">Home</Link>
                            <Link to="/blog" className="text-[#8899AA] hover:text-white transition-colors duration-300 text-base no-underline">Blog</Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-[60px] h-[3px] bg-white"></div>
                            <h3 className="text-2xl font-semibold text-white">The Developer's Newsletter</h3>
                        </div>
                        <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Email *"
                                required
                                className="flex-1 p-4 border-none rounded bg-white/10 text-white text-base placeholder:text-white/50 focus:outline-none focus:bg-white/15 transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-9 py-4 bg-[#FF5722] text-white border-none rounded text-base font-semibold cursor-pointer hover:bg-[#E64A19] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 shadow-[#FF5722]/30"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
}
