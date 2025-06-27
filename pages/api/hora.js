import { DateTime } from "luxon";

export default function handler(req, res) {
  const caracas = DateTime.now().setZone("America/Caracas");
  res.status(200).json({
    hora: caracas.toFormat("hh:mm a"),
    fecha: caracas.toFormat("dd 'de' LLLL 'de' yyyy")
  });
}