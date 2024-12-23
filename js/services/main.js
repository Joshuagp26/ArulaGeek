import { servicesProducts } from "./productos-services.js";    

const contenedorProducto = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

//renderizar productos

function createCard({name, price, image, id}){
    const card = document.createElement("div");
    card.classList.add("carta_contenedor")
    card.innerHTML = `
            <div class="contenedor_imagen">
                <img class="imagen_producto" src="${image}" alt="logo canal alura">
        </div>
        <div class="items">
            <div class="texto">
             <h5>${name}</h5>
            <p>$ ${price}</p>
            </div>
         <button class="delete-button btn-delete" data-id="${id}" >
         <img src="../media/delete.png" alt="">
         </button>
         </div>`;
         //eliminando producto
         
         return card;
};

function EliminarCard(card, id) {
    const deleteButton = card.querySelector(".btn-delete");
    deleteButton.addEventListener("click", async () => {
     var resultado = window.confirm('Estas Seguro que deseas eliminar este producto?');
if (resultado === true) {
    try {
        await servicesProducts.deleteProduct(id);
        card.remove();
        console.log(`Producto con id ${id} eliminado`);
      } catch (error) {
        console.error(`Error al eliminar el producto con id ${id}:`, error);
      }
} 
 });
  }

const renderProductos = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        listProducts.forEach((products) =>{
            const productCard = createCard(products);
            contenedorProducto.appendChild(productCard);
            EliminarCard(productCard, products.id);
        })
            
        }
    catch (error) {
        console.log(error)
    }
}
//formulario
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    //tomando los valores de cada input
    const name= document.querySelector("[data-name]").value;
    const price= document.querySelector("[data-price]").value;
    const image= document.querySelector("[data-image]").value;

    //enviar esos valores
    try {
        const newProduct = await servicesProducts.createProducto(name, price, image);
        const newCard = createCard(newProduct);
        contenedorProducto.appendChild(newCard);
        EliminarCard(newCard, newProduct.id);
    } catch (error) {
        console.log(error);
    }
    //reset formulario mediante id 
    const resetForm = document.getElementById("formulario");
    resetForm.reset();
});




renderProductos();

