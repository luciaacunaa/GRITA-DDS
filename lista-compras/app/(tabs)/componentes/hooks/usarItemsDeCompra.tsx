import { useState } from "react";
import { Item } from "./tipos/item";

export const usarItemsDeCompra = () => {
  const [items, setItems] = useState<Item[]>([]);

  const agregarItem = (nombre: string) => {
    const trimmed = nombre.trim();
    if (!trimmed) return;

    setItems((prev) => [
      ...prev,
      { id: String(Date.now()), name: trimmed, done: false },
    ]);
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)),
    );
  };

  const eliminarItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    agregarItem,
    toggleItem,
    eliminarItem,
  };
};
