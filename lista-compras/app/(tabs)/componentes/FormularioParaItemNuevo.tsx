import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function FormularioParaItemNuevo({
  onAgregar,
}: {
  onAgregar: (text: string) => void;
}) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    onAgregar(text);
    setText("");
  };

  return (
    <View style={styles.inputRow}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Agregar producto"
        style={styles.input}
        onSubmitEditing={handleAdd}
      />
      <Pressable style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.addTxt}>Agregar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: { flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  addBtn: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: "center",
  },
  addTxt: { color: "#fff" },
});
