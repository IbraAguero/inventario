import computerFormModel from "./computerFormModel";

const {
  formField: {
    nroInventario,
    nroSerie,
    motherBoard,
    cpu,
    ram,
    hdd,
    graphicCard,
    place,
    state,
    supplier,
    mandated,
    comment,
    order,
  },
} = computerFormModel;

export default {
  [nroInventario.name]: "",
  [nroSerie.name]: "",
  [motherBoard.name]: "",
  [cpu.name]: "",
  [ram.name]: "",
  [hdd.name]: "",
  [graphicCard.name]: "",
  [place.name]: "",
  [state.name]: "",
  [supplier.name]: "",
  [order.name]: "",
  [mandated.name]: "",
  [comment.name]: "",
};
