const DEFAULT_OIPTIONS = {
  autoClose: 5000,
  position: "top-right",
  onClose: () => {},
  canClose: true,
  showProgress: true,
};

export default class Toast {
  #toastElem;
  #autoCloseTimeout;
  #progressInterval;
  #removeBinded;
  #visibleSince;
  #autoClose;

  constructor(options) {
    this.#toastElem = document.createElement("div");
    this.#toastElem.classList.add("toast");
    this.#visibleSince = new Date();
    requestAnimationFrame(() => {
      this.#toastElem.classList.add("show");
    });
    this.#removeBinded = this.remove.bind(this);
    this.update({ ...DEFAULT_OIPTIONS, ...options });
  }

  set autoClose(value) {
    this.#autoClose = value;
    this.#visibleSince = new Date();
    if (value === false) return;
    if (this.#autoCloseTimeout != null) clearTimeout(this.#autoCloseTimeout);

    this.#autoCloseTimeout = setTimeout(() => this.remove(), value);
  }

  set position(value) {
    const currentContainer = this.#toastElem.parentElement;
    const selector = `.toast-container[data-position="${value}"]`;
    const container =
      document.querySelector(selector) || createContainer(value);
    container.append(this.#toastElem);
    if (currentContainer == null || currentContainer.hasChildNodes()) return;
    currentContainer.remove();
  }

  set text(value) {
    this.#toastElem.textContent = value;
  }

  set canClose(value) {
    this.#toastElem.classList.toggle("can-close", value);
    if (value) {
      this.#toastElem.addEventListener("click", this.#removeBinded);
    } else {
      this.#toastElem.removeEventListener("click", this.#removeBinded);
    }
  }

  set showProgress(value) {
    this.#toastElem.classList.toggle("progress", value);
    this.#toastElem.style.setProperty(
      "--progress",
      1
      // `${this.#timeVisible}ms`
    );

    if (value) {
      this.#progressInterval = setInterval(() => {
        const timeVisible = new Date() - this.#visibleSince;
        this.#toastElem.style.setProperty(
          "--progress",
          1 - timeVisible / this.#autoClose
        );
      }, 10);
    }
  }

  // show() {}

  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  remove() {
    clearTimeout(this.#autoCloseTimeout);
    clearInterval(this.#progressInterval);
    const container = this.#toastElem.parentElement;
    this.#toastElem.classList.remove("show");
    this.#toastElem.addEventListener("transitionend", () => {
      this.#toastElem.remove();
      if (container.hasChildNodes()) return;
      container.remove();
    });
    this.onClose();
  }
}

function createContainer(position) {
  const container = document.createElement("div");
  container.classList.add("toast-container");
  container.dataset.position = position;
  document.body.append(container);
  return container;
}
