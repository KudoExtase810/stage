const mongoose = require("mongoose");

const SJPostSchema = new mongoose.Schema({
  caseNumber: { type: String, required: true },
  date: {
    type: { day: { type: String }, hour: { type: String } },
    required: true,
  },
  place: { type: String, required: true },
  comission: { type: String, required: true },
  service: { type: String, required: true },
  subject: { type: String, maxLength: 420, required: true },
  nameHuissier: { type: String, required: true },
  from: { type: String, required: true },
});

const SJPostFactureSchema = new mongoose.Schema({
  caseNumber: { type: String, required: true },
  date: {
    type: { day: { type: String }, hour: { type: String } },
    required: true,
  },
  place: { type: String, required: true },

  nameHuissier: { type: String, required: true },
  payement: { type: String, required: true },
});

const SJPostPVSchema = new mongoose.Schema({
  caseNumber: { type: String, required: true },
  date: {
    type: { day: { type: String }, hour: { type: String } },
    required: true,
  },
  place: { type: String, required: true },
  comission: { type: String, required: true },
  service: { type: String, required: true },
  subject: { type: String, maxLength: 420, required: true },
  nameHuissier: { type: String, required: true },
  from: { type: String, required: true },
});

const SJPost = mongoose.models.SJPost || mongoose.model("SJPost", SJPostSchema);

const SJPostFacture =
  mongoose.models.SJPostFacture ||
  mongoose.model("SJPostFacture", SJPostFactureSchema);
const SJPostPV =
  mongoose.models.SJPostPV || mongoose.model("SJPostPV", SJPostPVSchema);
module.exports = { SJPost, SJPostFacture, SJPostPV };
