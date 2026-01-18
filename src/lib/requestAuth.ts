import { verifyToken, type JwtPayload } from "@/lib/auth";

export function getAuthFromRequest(req: Request): JwtPayload {
    const header = req.headers.get("authorization") || "";
    const parts = header.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        throw new Error("Missing or invalid Authorization header");
    }

    return verifyToken(parts[1]);
}

export function requireSupplier(payload: JwtPayload) {
    if (payload.role !== "supplier") throw new Error("Supplier access required");
}

export function requireEmployee(payload: JwtPayload) {
    if (payload.role !== "employee") throw new Error("Employee access required");
}
