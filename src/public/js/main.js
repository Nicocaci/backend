console.log("hola mundo")

// Generamos una instancia socket.io. desde el lado del cliente 

const socket = io();
const form = document.querySelector('form');


// Escuchamos el evento prodcutos  y recibimos array con datos

socket.on("productos",(data) =>{
    renderProducts(data);
})

// Funcion que se encargue de modificar el dom para agregar los productos 

const renderProducts = (productos) =>{
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    productos.forEach(item =>{
        const card = document.createElement("div");
        card.innerHTML = `  <p>${item.id}</p>
                            <p>${item.title}</p>
                            <p>${item.price}</p>
                            <button>Eliminar</button>
        
        ` 
        contenedorProductos.appendChild(card);

        card.querySelector("button").addEventListener("click",()=>{
            eliminarProducto(item.id);
        })
    }
    )
}

// Funcion para eliminar producto

const eliminarProducto = (id) =>{
    socket.emit("eliminarProducto", id);
}

// Funcion para agregar producto
const addProduct = (product) => {
    socket.emit('addProduct', product);
    console.log(product);
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const product = Object.fromEntries(formData);
    product.price = parseFloat(product.price);
    product.stock = parseInt(product.stock, 10);
    //console.log('Form data:', product);
    addProduct(product);
    form.reset(); // Opcional: resetear el formulario después de enviar
});

const agregarProduct = async (products) =>{
    try {
        const response = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        });

        if (response.ok) {
            alert('product added successfully');
            socket.emit('addProduct', products);
        } else {
            alert('Error adding product');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}




