import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { DeviceListing } from "@/models/DeviceListing";
import { calcFinalPrice } from "@/lib/pricing";

export async function POST() {
    await connectDB();

    const supplierEmail = "supplier@test.com";
    const employeeEmail = "employee@test.com";

    const supplierPassword = "Supplier@123";
    const employeePassword = "Employee@123";

    let supplier = await User.findOne({ email: supplierEmail });
    let employee = await User.findOne({ email: employeeEmail });

    if (!supplier) {
        const passwordHash = await bcrypt.hash(supplierPassword, 10);
        supplier = await User.create({ email: supplierEmail, passwordHash, role: "supplier" });
    }

    if (!employee) {
        const passwordHash = await bcrypt.hash(employeePassword, 10);
        employee = await User.create({ email: employeeEmail, passwordHash, role: "employee" });
    }

    const devicesCount = await DeviceListing.countDocuments();
    if (devicesCount === 0) {
        const devices = [
            { name: "iPhone 15 Pro", brand: "Apple", basePrice: 129999, offerType: "percent", offerValue: 10, stockQuantity: 8 },
            { name: "MacBook Air M2", brand: "Apple", basePrice: 99999, offerType: "flat", offerValue: 5000, stockQuantity: 4 },
            { name: "Samsung Galaxy S24", brand: "Samsung", basePrice: 89999, offerType: "percent", offerValue: 12, stockQuantity: 7 },
            { name: "OnePlus 12", brand: "OnePlus", basePrice: 69999, offerType: "flat", offerValue: 3000, stockQuantity: 10 },
            { name: "iPad Air 5", brand: "Apple", basePrice: 59999, offerType: "none", offerValue: 0, stockQuantity: 6 },
            { name: "Dell XPS 13", brand: "Dell", basePrice: 109999, offerType: "percent", offerValue: 8, stockQuantity: 3 },
        ];

        await DeviceListing.insertMany(
            devices.map((d) => ({
                supplierId: supplier!._id,
                name: d.name,
                brand: d.brand,
                description: "Premium device available for leasing.",
                imageUrl: "",
                basePrice: d.basePrice,
                offerType: d.offerType as any,
                offerValue: d.offerValue,
                finalPrice: calcFinalPrice(d.basePrice, d.offerType as any, d.offerValue),
                stockQuantity: d.stockQuantity,
                availabilityStatus: d.stockQuantity > 0 ? "in_stock" : "out_of_stock",
            }))
        );
    }

    return NextResponse.json({
        ok: true,
        message: "Seed users + devices ensured",
        users: [
            { role: "supplier", email: supplierEmail, password: supplierPassword },
            { role: "employee", email: employeeEmail, password: employeePassword },
        ],
    });
}
