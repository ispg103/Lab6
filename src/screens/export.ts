import { Product } from "../types/product";
import Firebase from "../utils/firebase";

const formData = {
  name: "",
  description: "",
};

export default class Dashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  submitForm() {
    console.log(formData);
    Firebase.addProduct(formData);
  }

  changeName(e: any) {
    formData.name = e?.target?.value;
  }

  changeDescription(e: any) {
    formData.description = e?.target?.value;
  }


  async render() {
    const title = this.ownerDocument.createElement("h1");
    title.innerText = "Añade producto";
    this.shadowRoot?.appendChild(title);

    const pName = this.ownerDocument.createElement("input");
    pName.placeholder = "nombre del producto";
    pName.addEventListener("change", this.changeName);
    this.shadowRoot?.appendChild(pName);

    const pDescription = this.ownerDocument.createElement("input");
    pDescription.placeholder = "descripción del producto";
    pDescription.addEventListener("change", this.changeDescription);
    this.shadowRoot?.appendChild(pDescription);

    const save = this.ownerDocument.createElement("button");
    save.innerText = "Guardar";
    save.addEventListener("click", this.submitForm);
    this.shadowRoot?.appendChild(save);

    const products = await Firebase.getProducts();
    products.forEach((p: Product) => {
      const container = this.ownerDocument.createElement("section");
      const name = this.ownerDocument.createElement("h3");
      name.innerText = p.name;
      container.appendChild(name);

      this.shadowRoot?.appendChild(container);
    });
  }
}

customElements.define("app-dashboard", Dashboard);