import { pool } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(`SELECT *
FROM productos
ORDER BY nombre ASC`);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error al cargar productos:", error);

    return NextResponse.json(
      { error: "No se pudieron cargar los productos" },
      { status: 500 },
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

export async function POST(request) {
  try {
    const producto = await request.json();
        const cantidad = Number(producto?.cantidad);
    const precio = Number(producto?.precio);
    const costo = Number(producto?.costo);
    const nombre = producto?.nombre?.trim();
    const categoria = producto?.categoria?.trim();

    if (
      cantidad === "" ||
      precio === "" ||
      costo === "" ||
      nombre === "" ||
      categoria === ""
    ) {
      return NextResponse.json(
        { error: "hay un campo vacio" },
        { status: 500 },
      );
    }

    if (costo > precio) {
      return NextResponse.json(
        {
          error:
            "estas confundiendo los campos el costo no puede ser mayor al precio",
        },
        { status: 500 },
      );
    }

    const resultado = await pool.query(
      `INSERT INTO productos (nombre, categoria, cantidad, precio, costo)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [nombre, categoria, cantidad, precio, costo],
    );
     return NextResponse.json(
      {
        mensaje: "Producto creado correctamente",
        producto: resultado.rows[0],
      },
      { status: 201 },
    );
  } catch (error) {
     return NextResponse.json(
      { error: "Ocurrió un error al crear el producto" },
      { status: 500 },
    );
  }
}
