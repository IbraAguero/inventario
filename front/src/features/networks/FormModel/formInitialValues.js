import networkFormModel from "./networkFormModel";
const {
  formField: {
    nroInventario,
    nroSerie,
    maker,
    model,
    type,
    place,
    state,
    supplier,
    mandated,
    comment,
    order,
  },
} = networkFormModel;

export default {
  [nroInventario.name]: "",
  [nroSerie.name]: "",
  [maker.name]: "",
  [model.name]: "",
  [type.name]: "",
  [place.name]: "",
  [state.name]: "",
  [supplier.name]: "",
  [order.name]: "",
  [mandated.name]: "",
  [comment.name]: "",
};
