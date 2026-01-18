import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { DeviceListing } from "@/models/DeviceListing";

export async function GET(req: Request) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = String(searchParams.get("q") || "").trim();
    const brand = String(searchParams.get("brand") || "").trim();
    const sort = String(searchParams.get("sort") || "newest"); // newest, price_asc, price_desc

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {
        availabilityStatus: "in_stock",
        stockQuantity: { $gt: 0 },
    };

    if (q) {
        filter.$or = [
            { name: { $regex: q, $options: "i" } },
            { brand: { $regex: q, $options: "i" } },
        ];
    }

    if (brand) {
        filter.brand = brand;
    }

    let sortOptions: any = { createdAt: -1 };
    if (sort === "price_asc") sortOptions = { finalPrice: 1 };
    if (sort === "price_desc") sortOptions = { finalPrice: -1 };

    const devices = await DeviceListing.find(filter).sort(sortOptions);

    // Get all unique brands for filter (optional, but good for UI)
    // distinct() might be heavy, but fine for this scale
    const brands = await DeviceListing.distinct("brand");

    return NextResponse.json({ ok: true, devices, brands });
}
