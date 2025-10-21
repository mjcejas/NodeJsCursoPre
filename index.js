//console.log(process.argv.slice(2));
const argumentos = process.argv.slice(2);

// const [...arg] = argumentos
const [metodo, endpoint, ...payload] = argumentos;

//console.log(metodo, endpoint, payload);

const api = () => {
  //console.log(process.argv);
  if (endpoint === undefined && metodo != "HELP") {
    console.log(
      "❌ Debes especificar un endpoint. Usa 'HELP' para ver los comandos disponibles."
    );
    return;
  }

  switch (metodo) {
    case "HELP":
      help();
      break;
    case "GET":
      if (endpoint != "products" && !endpoint.startsWith("products/")) {
        console.log(
          `❌ Endpoint ${endpoint} no válido. Usa 'HELP' para ver los comandos disponibles.`
        );
        return;
      }

      if (endpoint.includes("/")) {
        //Consultar un Producto Específico:
        fetch(`https://fakestoreapi.com/products/${endpoint.split("/")[1]}`)
          .then((response) => response.json())
          .then((data) => console.log(data));
      } else {
        //Consultar Todos los Productos:
        fetch("https://fakestoreapi.com/products")
          .then((response) => response.json())
          .then((data) => console.log(data));
      }

      break;
    case "POST":
      if (endpoint != "products") {
        console.log(
          `❌ Endpoint ${endpoint} no válido. Usa 'HELP' para ver los comandos disponibles.`
        );
        return;
      }
      if (payload.length < 3) {
        console.log(
          `❌ Faltan datos para crear el producto. Usa 'HELP' para ver los comandos disponibles.`
        );
        return;
      }
      //Crear un Producto Nuevo:
      const product = {
        title: payload[0],
        price: payload[1],
        category: payload[2],
      };
      fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      break;
    case "DELETE":
      if (!endpoint.startsWith("products/")) {
        console.log(
          `❌ Endpoint ${endpoint} no válido. Usa 'HELP' para ver los comandos disponibles.`
        );
        return;
      }
      //Eliminar un Producto:
      fetch(`https://fakestoreapi.com/products/${endpoint.split("/")[1]}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      break;
    default:
      console.log(
        "Comando no reconocido. Usa 'HELP' para ver los comandos disponibles."
      );
      break;
  }
};

const help = () => {
  console.log(`
Comandos aceptados:

npm run start HELP   
npm run start GET products
npm run start GET products/15
npm run start POST products T-Shirt-Rex 300 remeras (title, price, category)
npm run start DELETE products/7
`);
};

api();
