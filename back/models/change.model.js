import mongoose from 'mongoose';

const changeSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  valores: [
    {
      campo: {
        type: String,
      },
      valorAnterior: {
        type: String,
      },
      valorNuevo: {
        type: String,
      },
    },
  ],
});

export default mongoose.model('Change', changeSchema);
