export function getCartLocalStorage() {
  let cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(localStorage.getItem("cart")!);
  } else {
    return {
      bottles: {
        name: "Bottle",
        capacity: "1.0",
        quantity: 0,
        price: 9.6,
        totalSum: 0,
      },
      boxes: {
        name: "Box",
        capacity: "1.0",
        quantity: 0,
        price: 86.4,
        totalSum: 0,
      },
    };
  }
}

export function responseHandler(
  success: boolean,
  error: boolean,
  lang: string | null
): string {
  if (!success && !error && lang === "ENG") {
    return "Send";
  }

  if (!success && !error && lang === "PL") {
    return "Wyślij";
  }

  if (success && !error && lang === "ENG") {
    return "Your message has been sent";
  }

  if (success && !error && lang === "PL") {
    return "YWiadomość wysłana";
  }

  if (!success && error && lang === "ENG") {
    return "Failed to send";
  }

  if (!success && error && lang === "PL") {
    return "Wysyłka nieudana";
  }

  return "";
}
