import Toast from "./Toast.js";

document.querySelector("button").addEventListener("click", () => {
  const toast = new Toast({
    text: "Hello World!",
    autoClose: false,
    canClose: true,
  });
});
