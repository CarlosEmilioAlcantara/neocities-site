class MicroBlog extends HTMLElement {
  static get observedAttributes() {
    return ["date", "post"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  } 

  connectedCallback() {
    this.render();
  }

  render() {
    const date = this.getAttribute("date");
    const post = this.getAttribute("post");

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../index.css", import.meta.url)}");
        @import url("${new URL("./MicroBlog.css", import.meta.url)}");
      </style>

      <blockquote class="micro-blog">
        ${post ? `<p>${post}</post>` : ''}    
        <footer>
          — Snibbenings, ${date ? `<small>${date}</small>` : ''}    
        </footer>
      </blockquote>
    `
  }
}

customElements.define("micro-blog", MicroBlog);
