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
    offerType: string;
    offerValue: number;
}

export default function SupplierDashboard() {
    const router = useRouter();
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newDevice, setNewDevice] = useState({
        name: "",
        brand: "",
        basePrice: 0,
        stockQuantity: 1,
        offerType: "none",
        offerValue: 0,
        description: "Premium device"
    });

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            // Assuming GET /api/supplier/devices returns the user's devices
            // If authentications works via cookies, this should work. 
            // Note: Make sure the API supports GET. If not, we might need adjustments.
            // Based on previous code logic.
            const res = await fetch("/api/supplier/devices");
            if (res.ok) {
                const data = await res.json();
                setDevices(data.devices || []);
            }
        } catch (error) {
            console.error("Failed to fetch devices", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/supplier/devices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDevice),
            });
            if (res.ok) {
                setShowCreate(false);
                fetchDevices();
                setNewDevice({
                    name: "", brand: "", basePrice: 0, stockQuantity: 1, offerType: "none", offerValue: 0, description: "Premium device"
                });
            }
        } catch (error) {
            console.error("Error creating device", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this listing?")) return;
        try {
            const res = await fetch(`/api/supplier/devices/${id}`, { method: "DELETE" });
            if (res.ok) fetchDevices();
        } catch (e) { console.error(e); }
    };

    const handleLogout = () => {
        // In a real app we'd call a logout API, here we just redirect
        router.push("/");
    };

    return (
        <main className="min-h-screen p-4 md:p-8 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" style={{ animationDelay: "2s" }}></div>

            <div className="max-w-7xl mx-auto z-10 relative">
                {/* Header */}
                <header className="flex justify-between items-center mb-12 animate-slide-up">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Supplier <span className="text-gradient-primary">Dashboard</span></h1>
                        <p className="text-gray-400">Manage your active listings and inventory</p>
                    </div>
                    <button onClick={handleLogout} className="px-6 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
                        Logout
                    </button>
                </header>

                {/* Actions */}
                <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    <button
                        onClick={() => setShowCreate(!showCreate)}
                        className="glass-panel px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover-glow transition-all"
                    >
                        <span className="text-2xl leading-none font-light text-cyan-400">{showCreate ? "×" : "+"}</span>
                        {showCreate ? "Cancel Creation" : "Create New Listing"}
                    </button>
                </div>

                {/* Create Form */}
                {showCreate && (
                    <div className="glass-panel p-8 rounded-2xl mb-12 animate-slide-up">
                        <h2 className="text-2xl font-bold mb-6">New Device Details</h2>
                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition-colors" placeholder="Device Name (e.g. iPhone 15)" value={newDevice.name} onChange={e => setNewDevice({ ...newDevice, name: e.target.value })} required />
                            <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition-colors" placeholder="Brand" value={newDevice.brand} onChange={e => setNewDevice({ ...newDevice, brand: e.target.value })} required />
                            <input type="number" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition-colors" placeholder="Base Price" value={newDevice.basePrice} onChange={e => setNewDevice({ ...newDevice, basePrice: parseInt(e.target.value) })} required />
                            <input type="number" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition-colors" placeholder="Stock" value={newDevice.stockQuantity} onChange={e => setNewDevice({ ...newDevice, stockQuantity: parseInt(e.target.value) })} required />

                            <div className="md:col-span-2">
                                <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.01] transition-all">
                                    Publish Listing
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Listings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    {loading ? (
                        <div className="col-span-full py-20 text-center text-gray-500">Loading your inventory...</div>
                    ) : devices.length === 0 ? (
                        <div className="col-span-full py-20 text-center text-gray-500 glass-panel rounded-2xl">No listings yet. Create your first one above!</div>
                    ) : (
                        devices.map((device) => (
                            <div key={device._id} className="glass-panel p-6 rounded-2xl group hover:border-purple-500/50 transition-all duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">{device.name}</h3>
                                        <div className="text-sm text-gray-400">{device.brand}</div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${device.stockQuantity > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {device.stockQuantity > 0 ? `${device.stockQuantity} In Stock` : 'Out of Stock'}
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Base Price</span>
                                        <span>${device.basePrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Final Price</span>
                                        <span className="text-cyan-300 font-bold">${device.finalPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors">Edit</button>
                                    <button onClick={() => handleDelete(device._id)} className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors">Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
