import "server-only";

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD,
  cookieName: "mi_sesion",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  },
};