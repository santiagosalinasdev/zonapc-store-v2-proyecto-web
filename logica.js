let producto = '';
let precio = 0;

function mensaje() {
    document.getElementById('productos')
        .scrollIntoView({
            behavior: 'smooth'
        });
}

function comprar(nombre, valor) {
    producto = nombre;
    precio = valor;

    alert(`Producto seleccionado:
${producto}
Precio: $${precio.toLocaleString('es-CO')}`);
}

function facturar() {

    const nombre = document
        .getElementById('nombre')
        .value.trim();

    const correo = document
        .getElementById('correo')
        .value.trim();

    const envio = document
        .getElementById('envio')
        .value;

    const metodo = document
        .getElementById('metodo')
        .value;

    const validarCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre || !correo || !envio || !metodo) {
        alert('Completa todos los campos');
        return;
    }

    if (!validarCorreo.test(correo)) {
        alert('Ingrese un correo válido');
        return;
    }

    if (!producto) {
        alert('Selecciona un producto antes de comprar');
        return;
    }

    const iva = precio * 0.19;
    const total = precio + iva;

    // Datos que se enviarán a la API
    const compra = {
        cliente: nombre,
        correo: correo,
        producto: producto,
        subtotal: precio,
        iva: iva,
        total: total,
        envio: envio,
        metodoPago: metodo
    };

    // API de prueba
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(compra)
    })
    .then(response => response.json())
    .then(data => {

        document.getElementById('factura').innerHTML = `
            <h2>🧾 FACTURA FINAL</h2>
            <hr><br>

            <p><strong>Cliente:</strong> ${nombre}</p>
            <p><strong>Correo:</strong> ${correo}</p>
            <p><strong>Producto:</strong> ${producto}</p>
            <p><strong>Subtotal:</strong> $${precio.toLocaleString('es-CO')}</p>
            <p><strong>IVA (19%):</strong> $${iva.toLocaleString('es-CO')}</p>
            <p><strong>Total:</strong> $${total.toLocaleString('es-CO')}</p>
            <p><strong>Envío:</strong> ${envio}</p>
            <p><strong>Método de pago:</strong> ${metodo}</p>

            <h3>✅ Compra Exitosa</h3>
            <p>ID Pedido: ${data.id}</p>
        `;

        // Limpiar formulario
        document.getElementById('nombre').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('envio').value = '';
        document.getElementById('metodo').value = '';

        producto = '';
        precio = 0;
    })
    .catch(error => {
        console.error(error);
        alert('Error al conectar con la API');
    });
}
