import Contenedor from "./componentes/Contenedor";
import FormularioParaItemNuevo from "./componentes/FormularioParaItemNuevo";
import { usarItemsDeCompra } from "./componentes/hooks/usarItemsDeCompra";
import ListaDeCompras from "./componentes/listaDeCompras";
import TituloDeLaPagina from "./componentes/TituloDeLaPagina";

export default function Index() {
  const { items, agregarItem, toggleItem, eliminarItem } = usarItemsDeCompra();

  return (
    <Contenedor>
      <TituloDeLaPagina />
      <FormularioParaItemNuevo onAgregar={agregarItem} />
      <ListaDeCompras
        items={items}
        onToggle={toggleItem}
        onDelete={eliminarItem}
      />
    </Contenedor>
  );
}
