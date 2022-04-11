import Toast from "./Toast.js";

document.querySelector("button").addEventListener("click", () => {
  const toast = new Toast({
    text: "Hello World!",
    autoClose: 1000,
    position: "top-right",
  });

  setTimeout(() => {
    toast.update({
      text: "Hello World! (updated)",
      position: "top-left",
    });
  });
});
