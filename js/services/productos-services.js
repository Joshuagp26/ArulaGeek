const BASE_URL ="https://675d7a3e63b05ed07977f8e4.mockapi.io/products";

const productList = async () =>{
    try {
        const respuesta = await fetch(BASE_URL);
        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.log("Error al Listar prodcutos:  ", error);
    }
}

//crear producto
const createProducto = async (name, price, image) => {
    try {
        const respuesta = await fetch(BASE_URL,{
            method: "POST",
            headers:{
                "Content-type": "application/json",
            },
            body: JSON.stringify({name,price,image})
        });
        const data = await respuesta.json();
        return data;        
    } catch (error) {
        console.log("error al crear Producto: ", error);
    }
}


//eliminar producto

const deleteProduct = async (id) => {
    if (!id) {
      throw new Error("Id de producto no válido");
    }
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar producto: ${response.status}`);
      }
      const data = await response.json();
      console.log("Producto eliminado:", data);
      return data;
    } catch (error) {
      console.log("Error al eliminar producto:", error);
      throw error;
    }
  };
  

export const servicesProducts = {
    productList, createProducto, deleteProduct
};