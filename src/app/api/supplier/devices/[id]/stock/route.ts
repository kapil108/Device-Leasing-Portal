import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthFromRequest, requireSupplier } from "@/lib/requestAuth";
import { DeviceListing } from "@/models/DeviceListing";
import { StockLog } from "@/models/StockLog";

export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
    await connectDB();
    const params = await props.params;

    try {
        const auth = getAuthFromRequest(req);
        requireSupplier(auth);

        const body = await req.json();
        const quantityChange = Number(body.quantityChange || 0);
        const changeReason = String(body.changeReason || "");

        if (!quantityChange || Number.isNaN(quantityChange)) {
            return NextResponse.json({ ok: false, message: "quantityChange is required" }, { status: 400 });
        }

        const device = await DeviceListing.findById(params.id);
        if (!device) return NextResponse.json({ ok: false, message: "Device not found" }, { status: 404 });

        if (String(device.supplierId) !== auth.userId) {
            return NextResponse.json({ ok: false, message: "Not allowed" }, { status: 403 });
        }

        device.stockQuantity = Math.max(0, device.stockQuantity + quantityChange);
        device.availabilityStatus = device.stockQuantity > 0 ? "in_stock" : "out_of_stock";

        await device.save();

        await StockLog.create({
            deviceId: device._id,
            supplierId: auth.userId,
            quantityChange,
            changeReason,
        });

        return NextResponse.json({ ok: true, device });
    } catch (e: any) {
        return NextResponse.json({ ok: false, message: e.message }, { status: 400 });
    }
}
