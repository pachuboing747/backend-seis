const socket = io()

function ContentLoaded() {
    document.addEventListener("DOMContentLoaded", () => {
      const realTimesProducts = document.querySelector("#realTimesProducts");
      if (realTimesProducts) {
        const socket = io();
  
        socket.emit("event", "Bienvenidos a Real Times Products ");
        socket.on("evento", (res) => console.log(res));
  
        function addProducts({ price, title }) {
          const div = document.createElement('div');
  
          div.innerHTML= `
              <div class="uk-card uk-card-default">
                  <div class="uk-card-body">
                      <h3 class="uk-card-title">${title}</h3>
                      <h5>ARG ${price}</h5>
                      <button class="uk-button uk-button-secondary uk-button-small">Agregar al carrito</button>
                  </div>
              </div>
          `;
          realTimesProducts.appendChild(div);
        }
  
        socket.on("newProduct", (product) => {
          addProducts(product);
        });
      }
    });
}
  

ContentLoaded();
  
  



