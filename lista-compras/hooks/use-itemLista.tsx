import { styles } from "@/src/componentes/itemLista";
import { useState } from "react";
import { Pressable, Text } from "react-native";
type Item = {
  id: string;
  nombre: string;
  hecho: boolean;
};

export default function useItem() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState<string>("");

  const agregarItem = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setItems((prev) => [
      ...prev,
      { id: String(Date.now()), nombre: trimmed, hecho: false },
    ]);
    setText("");
  };

  const cambiarItem = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, hecho: !it.hecho } : it)),
    );
  };

  const eliminarItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const renderItem = ({ item }: { item: Item }) => (
    <Pressable
      onPress={() => cambiarItem(item.id)}
      onLongPress={() => eliminarItem(item.id)}
      style={styles.row}
    >
      <Text style={[styles.rowText, item.hecho && styles.done]}>
        {item.nombre}
      </Text>

      <Text
        style={[styles.pill, item.hecho ? styles.pillDone : styles.pillTodo]}
      >
        {item.hecho ? "✔" : "•"}
      </Text>
    </Pressable>
  );

  return {
    agregarItem,
    renderItem,
    eliminarItem,
    items,
  };
}
