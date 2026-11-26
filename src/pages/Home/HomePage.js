import "../../components/window/WindowContainer/WindowContainer.js";
import "../../components/window/TitleBar/TitleBar.js";
import "../../components/window/WindowContent/WindowContent.js";
import "../../components/window/WindowIcon/WindowIcon.js";
import "../../components/blog/BlogItem/BlogItem.js";
import "../../components/blog/BlogWindow/BlogWindow.js";
import "../../components/MicroBlog/MicroBlog.js";
import "../../components/Blogs/Blogs.js";
import "../../components/MicroBlogs/MicroBlogs.js";
import "../../components/Button/Button.js";
import "../../components/Player/Player.js";
import "../../components/Player/PlayerApp.js";
import "../../components/file-manager/FileManager/FileManager.js";
import "../../components/file-manager/FileWindow/FileWindow.js";
import "../../components/Changelog/Changelog.js";
import { getWindowWidth } from "../../utils/viewport/getWindowWidth.js";

class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  changelogsIcn = 
    new URL(
      "../../assets/icons/desktop/changelogs.webp", import.meta.url
    ).href;

  blogsIcn = 
    new URL("../../assets/icons/desktop/blogs.webp", import.meta.url).href;

  microBlogsIcn = new URL(
    "../../assets/icons/desktop/micro-blogs.webp", 
    import.meta.url
  ).href;

  filesIcn = 
    new URL("../../assets/icons/desktop/files.webp", import.meta.url).href;

  cassetteIcn = 
    new URL("../../assets/icons/desktop/cassette.webp", import.meta.url).href;

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../index.css", import.meta.url)}")
        @import url("${new URL("./HomePage.css", import.meta.url)}")
      </style>

      <div class="home">
        <window-icon
          icon="${this.changelogsIcn}"
          title="Changelogs"
          bottom="13"
          left="1"
          window="changelogs"
          widget
          app
        ></window-icon>

        <window-icon
          icon="${this.blogsIcn}"
          title="Blogs"
          bottom="1"
          left="1"
          window="blogs"
          app
        ></window-icon>

        <window-icon
          icon="${this.microBlogsIcn}"
          title="Micro Blogs"
          bottom="1"
          left="${getWindowWidth() >= 1536 ? 5 : 7}"
          window="micro-blogs"
          app
        ></window-icon>

        <window-icon
          icon="${this.cassetteIcn}"
          title="Cassette Player"
          bottom="1"
          left="${getWindowWidth() >= 1536 ? 10.5 : 16}"
          window="cassette-player"
          widget
          app
        ></window-icon>

        <window-icon
          icon="${this.filesIcn}"
          title="File Manager"
          bottom="1"
          left="${getWindowWidth() >= 1536 ? 17.5 : 26}"
          window="file-manager"
          widget
          app
        ></window-icon>

        <blogs-window id="blogs"></blogs-window>
        <microblogs-window id="micro-blogs"></microblogs-window>
        <file-manager id="file-manager"></file-manager>
        <player-widget id="cassette-player"></player-widget>
        <change-logs id="changelogs"></change-logs>
        <blog-window closed></blog-window>
        <file-window></file-window>
      </div>
    `
  }
}

customElements.define("home-page", HomePage);
