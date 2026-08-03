import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
initializeApp({ credential: applicationDefault(), projectId: "genesis-hardware" });
const db = getFirestore();
const ref = "4523daec-e41b-489d-ab90-74c9f0f0dca1";
const doc = await db.collection("pagos_pendientes").doc(ref).get();
console.log("pagos_pendientes:", JSON.stringify(doc.data()));
if (doc.data()?.pedido_id) {
  const pedido = await db.collection("pedidos").doc(doc.data().pedido_id).get();
  console.log("pedido:", JSON.stringify(pedido.data()));
}
