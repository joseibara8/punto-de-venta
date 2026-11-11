import { pool } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM productos");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error al cargar productos:", error);

    return NextResponse.json(
      { error: "No se pudieron cargar los productos" },
      { status: 500 }
    );
  }
}