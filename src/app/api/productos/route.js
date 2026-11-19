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

export async function PUT(request) {
  try {
    const producto = await request.json();
    const id = Number(producto?.id);
    const cantidad = Number(producto?.cantidad);
    const precio = Number(producto?.precio);
    const costo = Number(producto?.costo);
    const nombre = producto?.nombre?.trim();
    const categoria = producto?.categoria?.trim();

    if (
      !Number.isInteger(id) ||
      id <= 0 ||
      !nombre ||
      !categoria ||
      !Number.isFinite(cantidad) ||
      cantidad < 0 ||
      !Number.isFinite(precio) ||
      precio < 0 ||
      !Number.isFinite(costo) ||
      costo < 0
    ) {
      return NextResponse.json(
        { error: "Los datos del producto no son válidos" },
        { status: 400 },
      );
    }

    const result = await pool.query(
      `UPDATE productos
       SET nombre = $1, categoria = $2, cantidad = $3, precio = $4, costo = $5
       WHERE id = $6
       RETURNING *`,
      [nombre, categoria, cantidad, precio, costo, id],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return NextResponse.json(
      { error: "No se pudo actualizar el producto" },
      { status: 500 },
    );
  }
}
