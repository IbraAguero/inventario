export default {
  formId: "computerForm",
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
    motherBoard: {
      name: "motherBoard",
      label: "Placa Madre*",
      url: "/computadoras/placa-madre",
      requiredErrorMsg: "Placa madre es requerida",
    },
    cpu: {
      name: "cpu",
      label: "CPU*",
      url: "/computadoras/cpu",
      requiredErrorMsg: "CPU es requerido",
    },
    ram: {
      name: "ram",
      label: "RAM*",
      url: "/computadoras/ram",
      requiredErrorMsg: "RAM es requerida",
    },
    hdd: {
      name: "hdd",
      label: "Disco Duro*",
      url: "/computadoras/hdd",
      requiredErrorMsg: "Disco duro es requerido",
    },
    graphicCard: {
      name: "graphicCard",
      label: "Tarjeta Grafica*",
      url: "/computadoras/tarjeta-grafica",
      requiredErrorMsg: "Tarjeta grafica es requerida",
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
