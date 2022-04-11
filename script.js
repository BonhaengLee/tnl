import Toast from "./Toast.js";

document.querySelector("button").addEventListener("click", () => {
  const toast = new Toast({
    text: "Hello World!",
    position: "top-right",
    // showProgress: false,
  });

  setTimeout(() => {
    toast.update({ autoClose: 2000 });
  }, 1000);
});
