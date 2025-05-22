class productCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    getStyles() {
      return `
        :host {
          font-family: 'Arial', sans-serif;
          display: block;
          width: 415px;
          height: auto;
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        .card-container{
          display:inline-block;
          gap: 20px;
        }
        .card-2{
          margin: 100px;
          padding-right: 100px;
        }
        .card-header {
          background: #3ff275;
          height: 80px;
          border-bottom-left-radius: 50% 20px;
          border-bottom-right-radius: 50% 20px;
        }
        
        .card-body {
          padding: 40px;
          text-align: center;
          
        }
        h2 {
          color: #7e3ff2;
          margin: 10px 0 5px;
          font-size: 1.2rem;
        }
        p {
          font-size: 0.85rem;
          color: #888;
        }
        .product-img {
          width: 100%;
          border-radius: 15px;
          margin: 15px 0;
        }
        .price-rating {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: bold;
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
        .stars {
          color: #fbbf24;
          font-size: 1rem;
        }
        .sizes, .colors {
          margin: 10px 0;
          text-align: left;
        }
        .sizes span, .colors span {
          margin-right: 10px;
          cursor: pointer;
          font-size: 0.85rem;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .sizes span:hover, .colors span:hover {
          background: #eee;
        }
        .colors .color {
          display: inline-block;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px #ccc;
          margin-right: 8px;
          cursor: pointer;
        }
        .color.blue { background: #140f71; }
        .color.fur { background: #ffd2d2; }
  
        .quantity {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 15px 0;
        }
        .quantity button {
          padding: 5px 10px;
          background: #eee;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .add-to-cart {
          background: #facc15;
          padding: 12px;
          font-weight: bold;
          text-align: center;
          cursor: pointer;
          border-radius: 0 0 20px 20px;
        }
      `;
    }
  
    getTemplate() {
      const template = document.createElement("template");
      template.innerHTML = `
        <style>${this.getStyles()}</style>
        <section class="card-container">
          <div class="card">
            <div class="card-header"></div>
            <div class="card-body">
              <h2>Camisa Elegante</h2>
              <p>Es el artículo con la mejor relación calidad-precio</p>
              <div class="image">
                  <img id="productImage" class="product-img" src="./img/Camisa.jpg" alt="Children Shirt">
              </div>
              <div class="price-rating">
                  <span>$45</span>
                  <div class="stars" id="stars">
                    <span data-value="1">★</span>
                    <span data-value="2">★</span>
                    <span data-value="3">★</span>
                    <span data-value="4">★</span>
                    <span data-value="5">★</span>
                  </div>
                </div>
              <div class="sizes">
                <strong>SIZE</strong><br>
                <span>XS</span><span>S</span><span>M</span><span>L</span><span>XL</span>
              </div>
              <div class="colors">
                  <strong>COLORS</strong><br>
                  <span class="color blue" data-img="./img/Camisa.jpg"></span>
                  <span class="color fur" data-img="./img/Camisa2.webp"></span>
              </div>
              <div class="quantity">
                  <button id="decrease">-</button>
                  <span id="qty">1</span>
                  <button id="increase">+</button>
                </div>
            </div>
            <div class="add-to-cart">ADD TO CART</div>
          </div>
  
          
        </section>
        
      `;
      return template;
    }
  
    render() {
      this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
    setRatingEvents() {
        const stars = this.shadowRoot.querySelectorAll("#stars span");
        stars.forEach(star => {
          star.addEventListener("click", () => {
            const rating = parseInt(star.dataset.value);
            stars.forEach((s, index) => {
              s.textContent = index < rating ? "★" : "☆";
            });
          });
        });
      }
      
      setQuantityEvents() {
        const decreaseBtn = this.shadowRoot.getElementById("decrease");
        const increaseBtn = this.shadowRoot.getElementById("increase");
        const qtyDisplay = this.shadowRoot.getElementById("qty");
        let quantity = 1;
      
        decreaseBtn.addEventListener("click", () => {
          if (quantity > 1) {
            quantity--;
            qtyDisplay.textContent = quantity;
          }
        });
      
        increaseBtn.addEventListener("click", () => {
          quantity++;
          qtyDisplay.textContent = quantity;
        });
      }
      setColorEvents() {
        const colors = this.shadowRoot.querySelectorAll(".color");
        const img = this.shadowRoot.getElementById("productImage");
      
        colors.forEach(color => {
          color.addEventListener("click", () => {
            // Remueve selección actual
            colors.forEach(c => c.classList.remove("selected"));
            color.classList.add("selected");
      
            // Cambia la imagen
            const newImg = color.getAttribute("data-img");
            img.setAttribute("src", newImg);
          });
        });
      }
  
    connectedCallback() {
      this.render();
      this.setRatingEvents();
      this.setQuantityEvents();
      this.setColorEvents();
    }
    
      
  }
  
  customElements.define("product-card", productCard);
  