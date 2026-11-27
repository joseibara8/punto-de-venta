import { NextResponse } from "next/server";
import { pool } from "@/libs/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const usuario = await request.json();
    console.log(usuario);
    
    const { contraseña, nombre } = usuario;
    const passwordHash = await bcrypt.hash(contraseña, 10);

    const conexion = await pool.query(`
  SELECT current_database(), current_schema(), current_user
`);

console.log(conexion.rows);
const tablas = await pool.query(`
  SELECT table_schema, table_name
  FROM information_schema.tables
  WHERE table_schema = 'public'
`);

console.log("TABLAS DISPONIBLES:", tablas.rows);

    const resultado = await pool.query(
      `INSERT INTO usuarios(nombre, contraseña)
   VALUES ($1, $2)
   RETURNING id`,
      [nombre, passwordHash],
    );
    return NextResponse.json({
      mensaje: "cajero registrado",
      id: resultado.rows[0].id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { mensaje: "Error al registrar cajero" },

      { status: 500 },
    );
  }
}
