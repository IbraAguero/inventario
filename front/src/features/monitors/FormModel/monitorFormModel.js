export default {
  formId: "monitorForm",
  formField: {
    nroInventario: {
      name: "nroinventario",
      label: "Nro Inventario*",
      requiredErrorMsg: "Nro inventario es requerido",
    },
    nroSerie: {
      name: "nroserie",
      label: "Nro Serie*",
      requiredErrorMsg: "Nro serie es requerido",
    },
    maker: {
      name: "maker",
      label: "Fabricante*",
      url: "/monitores/fabricantes",
      requiredErrorMsg: "Fabricante es requerido",
    },
    model: {
      name: "model",
      label: "Modelo*",
      url: "/monitores/modelos",
      requiredErrorMsg: "Modelo es requerido",
    },
    type: {
      name: "type",
      label: "Tipo*",
      url: "/monitores/tipos",
      requiredErrorMsg: "Tipo es requerido",
    },
    place: {
      name: "place",
      label: "Lugar*",
      url: "/lugares",
      requiredErrorMsg: "Lugar es requerido",
    },
    state: {
      name: "state",
      label: "Estado*",
      url: "/estados",
      requiredErrorMsg: "Lugar es requerido",
    },
    supplier: {
      name: "supplier",
      label: "Proveedor*",
      url: "/proveedores",
    },
    comment: {
      name: "comment",
      label: "Comentario",
    },
    order: {
      name: "order",
      label: "Remito*",
      requiredErrorMsg: "Remito es requerido",
    },
    mandated: {
      name: "mandated",
      label: "Encargado",
    },
  },
};
