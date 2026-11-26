import { pool } from "@/libs/db";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const result = await pool.query(`SELECT *
    FROM caja`);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error al cargar los datos de caja:", error);

    return NextResponse.json(
      { error: "No se pudieron cargar los datos de caja" },
      { status: 500 },
    );
  }
}