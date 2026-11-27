import { NextResponse } from "next/server";
import { pool } from "@/libs/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/libs/session";

export async function POST(request) {
  try {
    const data = await request.json();
    const { contraseña, nombre } = data;

    const resultado = await pool.query(
      `SELECT * FROM usuarios 
      WHERE nombre = $1`,
      [nombre],
    );
    if (resultado.rows.length === 0) {
      return NextResponse.json(
        { error_correo: "*este nombre no esta registrado*" },
        { status: 401 },
      );
    }

    const usuario = resultado.rows[0];
    const coincide = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!coincide) {
      return NextResponse.json(
        { error_contraseña: "contraseña incorrecta" },
        { status: 401 },
      );
    }
    const session = await getIronSession(await cookies(), sessionOptions);

    session.user = {
      id: usuario.id,
    };

    await session.save();
    return NextResponse.json({
  mensaje: "Sesión iniciada correctamente",
  id: usuario.id,
});
  } catch (error) {
  console.error("Error en login:", error);

  return NextResponse.json(
    { mensaje: "Error interno del servidor" },
    { status: 500 }
  );
}
}
