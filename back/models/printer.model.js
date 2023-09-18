import mongoose from 'mongoose';

const printerSchema = new mongoose.Schema(
  {
    nroinventario: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    nroserie: {
      type: String,
      trim: true,
      required: true,
    },
    maker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Maker',
      required: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Type',
      required: true,
    },
    model: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Model',
      required: true,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    order: {
      type: String,
      trim: true,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    mandated: {
      type: String,
      trim: true,
    },
    changes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Change',
      },
    ],
  },
  { timestamps: true }
);

/* printerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
 */



export default mongoose.model('Printer', printerSchema);
