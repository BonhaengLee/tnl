import Toast from "./Toast.js";

document.querySelector("button").addEventListener("click", () => {
  const toast = new Toast({
    text: "Hello World!",
    position: "top-right",
    pauseOnHover: true,
  });
});
