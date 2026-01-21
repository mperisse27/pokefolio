export type SnackbarType = "info" | "success" | "error";

function showSnackbar(message: string, duration: number = 3000, type: SnackbarType = "info"): void {
  const snackbar = document.getElementById("snackbar")!;
  switch (type) {
    case "info":
      snackbar.className = "z-50 ml-4 px-4 py-1 bg-blue-800 text-white text-3xl rounded h-fit -translate-x-120 transition-transform duration-500 border-2 border-white";
      break;
    case "success":
      snackbar.className = "z-50 ml-4 px-4 py-1 bg-green-800 text-white text-3xl rounded h-fit -translate-x-120 transition-transform duration-500 border-2 border-white";
      break;
    case "error":
      snackbar.className = "z-50 ml-4 px-4 py-1 bg-red-800 text-white text-3xl rounded h-fit -translate-x-120 transition-transform duration-500 border-2 border-white";
      break;
  }
  snackbar.textContent = message;
  snackbar.classList.add("-translate-x-120");
  void snackbar.offsetWidth;

  snackbar.classList.remove("-translate-x-120");

  setTimeout(() => {
    snackbar.classList.add("-translate-x-120");
  }, duration);
}

export default showSnackbar;
