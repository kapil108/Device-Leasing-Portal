"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Device {
    _id: string;
    name: string;
    brand: string;
    basePrice: number;
    finalPrice: number;
    stockQuantity: number;
    availabilityStatus: string;
}

export default function Marketplace() {
    const router = useRouter();
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const res = await fetch("/api/devices");
            if (res.ok) {
                const data = await res.json();
                // Adjust based on actual API response structure
                // Assuming { devices: [...] } or array
                setDevices(data.devices || []);
            }
        } catch (error) {
            console.error("Failed to fetch marketplace devices", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        router.push("/");
    };

    return (
        <main className="min-h-screen p-4 md:p-8 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" style={{ animationDelay: "2s" }}></div>

            <div className="max-w-7xl mx-auto z-10 relative">
                {/* Header */}
                <header className="flex justify-between items-center mb-12 animate-slide-up">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Device <span className="text-gradient-primary" style={{ background: 'linear-gradient(135deg, #00f3ff 0%, #0066ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Marketplace</span></h1>
                        <p className="text-gray-400">Browse exclusive offers available for you</p>
                    </div>
                    <button onClick={handleLogout} className="px-6 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
                        Logout
                    </button>
                </header>

                {/* Search / Filter (Visual only for now) */}
                <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    <div className="glass-panel p-2 rounded-xl flex items-center max-w-lg">
                        <span className="pl-4 text-gray-500">🔍</span>
                        <input
                            type="text"
                            placeholder="Search devices..."
                            className="bg-transparent border-none outline-none text-white px-4 py-2 w-full placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Listings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    {loading ? (
                        <div className="col-span-full py-20 text-center text-gray-500">Loading marketplace...</div>
                    ) : devices.length === 0 ? (
                        <div className="col-span-full py-20 text-center text-gray-500 glass-panel rounded-2xl">No devices available right now.</div>
                    ) : (
                        devices.map((device) => (
                            <div key={device._id} className="glass-panel p-6 rounded-2xl group hover:border-cyan-500/50 transition-all duration-300">
                                {/* Image Placeholder */}
                                <div className="w-full h-48 mb-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center group-hover:scale-[1.02] transition-transform">
                                    <div className="text-4xl">📱</div>
                                </div>

                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{device.name}</h3>
                                        <div className="text-sm text-gray-400">{device.brand}</div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${device.stockQuantity > 0 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {device.stockQuantity > 0 ? 'Available' : 'Out of Stock'}
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between items-end">
                                        <span className="text-gray-400 text-sm">Monthly Lease</span>
                                        <span className="text-2xl font-bold text-white">${(device.finalPrice / 24).toFixed(0)}<span className="text-xs text-gray-500 font-normal">/mo</span></span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Total Value</span>
                                        <span>${device.finalPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all">
                                    View Details / Make Offer
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
