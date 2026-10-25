import "../../components/Button/Button.js";
import { fetchMicroBlogs } from "../../apis/fetchMicroBlogs.js";

class RollingBlogsPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.microBlogs = {};
    this.microBlogsOffset = 0;
    this.limit = 0;
  }

  async connectedCallback() {
    this.microBlogs = await fetchMicroBlogs({});
    this.render();

    console.log(this.microBlogs);
  }

  render() {
    this.shadowRoot.innerHTML = `
    `
  }
}

customElements.define("rolling-blogs-page", RollingBlogsPage);
