import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables.");
}

export type UserRole = "supplier" | "employee";

export type JwtPayload = {
    userId: string;
    role: UserRole;
};

export function signToken(payload: JwtPayload) {
    return jwt.sign(payload, JWT_SECRET!, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET!) as JwtPayload;
}
