import * as Yup from "yup";
import peripheralFormModel from "./peripheralFormModel";
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
    order,
  },
} = peripheralFormModel;

export default [
  Yup.object().shape({
    [nroInventario.name]: Yup.string()
      .required(`${nroInventario.requiredErrorMsg}`)
      .matches(/^[A-Z]{2}-\d{2,}$/, "Formato invalido, Ej: IMP-10"),
    [nroSerie.name]: Yup.string().required(`${nroSerie.requiredErrorMsg}`),
    [maker.name]: Yup.string().required(`${maker.requiredErrorMsg}`),
    [model.name]: Yup.string().required(`${maker.requiredErrorMsg}`),
    [type.name]: Yup.string().required(`${type.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [place.name]: Yup.string().required(`${place.requiredErrorMsg}`),
    [state.name]: Yup.string().required(`${place.requiredErrorMsg}`),
    [supplier.name]: Yup.string().required(`${supplier.requiredErrorMsg}`),
    [order.name]: Yup.string().required(`${order.requiredErrorMsg}`),
  }),
];
