import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { Item } from "../componentes/hooks/tipos/item";

type Props = {
  items: Item[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ListaDeCompras({ items, onToggle, onDelete }: Props) {
  return (
    <FlatList
      data={items}
      keyExtractor={(it) => it.id}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onToggle(item.id)}
          onLongPress={() => onDelete(item.id)}
          style={styles.row}
        >
          <Text style={[styles.text, item.done && styles.done]}>
            {item.name}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: { padding: 12 },
  text: { fontSize: 16 },
  done: { textDecorationLine: "line-through" },
});
