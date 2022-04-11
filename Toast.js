export default class Toast {
  #toastElem;

  constructor(options) {
    this.#toastElem = document.createElement("div");
    this.#toastElem.classList.add("toast");
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  set position(value) {
    const selector = `.toast-container[data-position="${value}"]`;
    const container =
      document.querySelector(selector) || createContainer(value);
    container.append(this.#toastElem);
  }

  set text(value) {
    this.#toastElem.textContent = value;
  }

  // show() {}

  update() {}

  remove() {
    const container = this.#toastElem.parentElement;
    this.#toastElem.remove();
    if (container.hasChildNodes()) return;
    container.remove();
  }
}

function createContainer(position) {
  const container = document.createElement("div");
  container.classList.add("toast-container");
  container.dataset.position = position;
  document.body.append(container);
  return container;
}
