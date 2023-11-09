import * as Yup from "yup";
import computerFormModel from "./computerFormModel";
const {
  formField: {
    nroInventario,
    nroSerie,
    motherBoard,
    cpu,
    hdd,
    ram,
    graphicCard,
    place,
    state,
    supplier,
    order,
  },
} = computerFormModel;

export default [
  Yup.object().shape({
    [nroInventario.name]: Yup.string()
      .required(`${nroInventario.requiredErrorMsg}`)
      .matches(/^[A-Z]{2}-\d{2,}$/, "Formato invalido, Ej: GA-08"),
    [nroSerie.name]: Yup.string().required(`${nroSerie.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [motherBoard.name]: Yup.string().required(
      `${motherBoard.requiredErrorMsg}`
    ),
    [cpu.name]: Yup.string().required(`${cpu.requiredErrorMsg}`),
    [ram.name]: Yup.string().required(`${ram.requiredErrorMsg}`),
    [hdd.name]: Yup.string().required(`${hdd.requiredErrorMsg}`),
    [graphicCard.name]: Yup.string().required(
      `${graphicCard.requiredErrorMsg}`
    ),
  }),
  Yup.object().shape({
    [place.name]: Yup.string().required(`${place.requiredErrorMsg}`),
    [state.name]: Yup.string().required(`${place.requiredErrorMsg}`),
    [supplier.name]: Yup.string().required(`${supplier.requiredErrorMsg}`),
    [order.name]: Yup.string().required(`${order.requiredErrorMsg}`),
  }),
];
