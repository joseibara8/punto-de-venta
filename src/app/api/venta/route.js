import { pool } from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  let cliente;

  try {
    const carrito = await request.json();

    if (!Array.isArray(carrito) || carrito.length === 0) {
      return NextResponse.json(
        { error: "El carrito debe contener al menos un producto" },
        { status: 400 },
      );
    }

    cliente = await pool.connect();
    await cliente.query("BEGIN");

    const productos = [];
    let total = 0;
    let ganancias = 0;

    for (const producto of carrito) {

      const id = Number(producto?.id);
      const unidades = Number(producto?.unidades);

      if (!Number.isInteger(id) || id <= 0 ||
          !Number.isFinite(unidades) || unidades <= 0) {
        await cliente.query("ROLLBACK");

        return NextResponse.json(
          { error: "El producto tiene un ID o una cantidad inválida" },
          { status: 400 },
        );
      }

      const resultado = await cliente.query(
        `UPDATE productos
         SET cantidad = cantidad - $1
         WHERE id = $2 AND cantidad >= $1
         RETURNING nombre, precio, costo`,
        [unidades, id],
      );

      if (resultado.rowCount === 0) {
        await cliente.query("ROLLBACK");

        return NextResponse.json(
          { error: `El producto ${nombre_producto} no existe o tiene stock insuficiente` },
          { status: 409 },
        );
      }

      const { nombre, precio, costo } = resultado.rows[0];

      productos.push(nombre);
      total += Number(precio) * unidades;
      ganancias += (Number(precio) - Number(costo)) * unidades;
    }

    const nuevaVenta = await cliente.query(
      `INSERT INTO ventas (productos, total, ganancias)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [productos.join(", "), total, ganancias],
    );

    const valor_caja = await cliente.query(
  `UPDATE caja
   SET ganancias = COALESCE(ganancias, 0) + $1,
       total = COALESCE(total, 0) + $2
   RETURNING ganancias, total`,
  [ganancias, total],
);

    

    await cliente.query("COMMIT");
   

    return NextResponse.json(
      { mensaje: "Venta guardada y caja actualizada", 
        id: nuevaVenta.rows[0].id,
        venta:valor_caja.rows[0]},
      { status: 201 },
    );

  } catch (error) {
    if (cliente) {
      await cliente.query("ROLLBACK").catch(console.error);
    }

    console.error("Error al guardar la venta", error);

    return NextResponse.json(
      { error: "No se pudo guardar la venta" },
      { status: 500 },
    );
  } finally {
    cliente?.release();
  }
}