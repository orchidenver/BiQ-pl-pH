import * as React from "react";
import { useState, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/context";
import {
  ModalProps,
  OrderInterface,
  ItemInOrderInterface,
} from "../interfaces";
import axios from "axios";

import "./Modal.css";

export default function Modal({ btnText, open, onClose }: ModalProps) {
  const [cartEmailValue, setCartEmailValue] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const bottleId = useId();
  const boxId = useId();
  const navigate = useNavigate();
  const {
    openCart,
    resetOrder,
    lang,
    cart: { bottles, boxes },
  } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [success]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
      onClose();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  function cartValue() {
    const items: ItemInOrderInterface[] = [];

    if (bottles.quantity > 0) {
      items.push({
        id: bottleId,
        title: {
          en: "pH",
          pl: "Woda pH",
        },
        type: "pH",
        amount: Number(bottles.capacity),
        price: {
          en: 0,
          pl: bottles.price,
        },
        package: "bottle",
        image: "path",
        count: bottles.quantity,
      });
    }

    if (boxes.quantity > 0) {
      items.push({
        id: boxId,
        title: {
          en: "pH",
          pl: "Woda pH",
        },
        type: "pH",
        amount: Number(boxes.capacity),
        price: {
          en: 0,
          pl: boxes.price,
        },
        package: "box",
        image: "path",
        count: boxes.quantity,
      });
    }

    return items;
  }

  async function onPlaceOrderHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const { data, status } = await axios.post<OrderInterface>(
        "https://ohopewater.com/checkout",
        {
          cart: cartValue(),
          email: cartEmailValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log({
        data,
        status,
      });

      if (status !== 200 && status !== 201) {
        throw new Error("Something went wrong");
      }

      setSuccess(true);
    } catch (error) {
      setError(true);
    } finally {
      setCartEmailValue("");
      resetOrder();
      navigate("/");
      openCart();
    }
  }

  if (!open) return null;
  return createPortal(
    <>
      <div className="overlay" />
      <aside className="modal">
        <p className="modal-head">
          {lang === "ENG" ? "Great choice!" : "Doskonały wybór!"}
        </p>
        <p
          className="modal-text"
          style={{ fontSize: lang === "ENG" ? "16px" : "14px" }}
        >
          {lang === "ENG"
            ? "At the moment this product is out of stock. Please leave your email, and as soon as pure water flows into the bottles, we'll notify you first."
            : "W tej chwili produkt jest niedostępny. Prosimy podać swój adres e-mail, a jak tylko czysta woda zostanie napełniona do butelek, powiadomimy Cię jako pierwszego."}
        </p>
        {success && (
          <button className="modal-btn" onClick={onClose}>
            {lang === "ENG" ? "Stay tuned!" : "Bądźcie na bieżąco!"}
          </button>
        )}
        {error && (
          <button className="modal-btn" onClick={onClose}>
            {lang === "ENG" ? "Try again!" : "Spróbuj ponownie!"}
          </button>
        )}
        <button className="modal-btn-close" onClick={onClose}>
          ╳
        </button>
        {!success && !error && (
          <form className="modal-form" onSubmit={onPlaceOrderHandler}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="modal-email"
              placeholder={
                lang === "ENG"
                  ? "Enter your email"
                  : "Wprowadź swój adres e-mail"
              }
              value={cartEmailValue}
              onChange={(e) => setCartEmailValue(e.target.value)}
            />
            <button
              className="send-btn"
              type="submit"
              disabled={!cartEmailValue}
            >
              ᐳ
            </button>
          </form>
        )}
      </aside>
    </>,
    document.getElementById("modal")!
  );
}
