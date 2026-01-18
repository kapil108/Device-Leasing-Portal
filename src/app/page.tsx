import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-glow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }}></div>
            </div>

            <div className="z-10 text-center max-w-5xl w-full flex flex-col items-center gap-12 animate-slide-up">
                {/* Hero Section */}
                <div className="space-y-6">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
                        Device <span className="text-gradient-primary">Leasing</span>
                        <br />
                        Portal
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        The premium platform for managing corporate device inventory.
                        Seamlessly connect suppliers and employees in a unified ecosystem.
                    </p>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-12">

                    <Link href="/supplier/login" className="group">
                        <div className="glass-panel p-8 rounded-2xl h-full flex flex-col items-center text-center gap-4 transition-all duration-500 hover:scale-105 hover-glow group-hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform shadow-lg shadow-purple-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">Supplier Login</h2>
                            <p className="text-gray-400 text-sm">Manage listings, offers, inventory & track stock.</p>
                        </div>
                    </Link>

                    <Link href="/employee/login" className="group">
                        <div className="glass-panel p-8 rounded-2xl h-full flex flex-col items-center text-center gap-4 transition-all duration-500 hover:scale-105 hover-glow group-hover:-translate-y-2 delay-100">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform shadow-lg shadow-cyan-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">Employee Login</h2>
                            <p className="text-gray-400 text-sm">Browse exclusive device offers and request leases.</p>
                        </div>
                    </Link>

                    <Link href="/marketplace" className="group">
                        <div className="glass-panel p-8 rounded-2xl h-full flex flex-col items-center text-center gap-4 transition-all duration-500 hover:scale-105 hover-glow group-hover:-translate-y-2 delay-200">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">Marketplace</h2>
                            <p className="text-gray-400 text-sm">Explore all available devices in real-time.</p>
                        </div>
                    </Link>

                </div>
            </div>
        </main>
    );
}
