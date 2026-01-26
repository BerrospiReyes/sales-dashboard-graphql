import { db } from "./firebase.js";

export const resolvers = {
  Query: {
    sales: async (_: any, { category, brand }: { category?: string, brand?: string }) => {
      let query: any = db.collection("sales");
      if (category) query = query.where("category", "==", category);
      if (brand) query = query.where("brand", "==", brand);

      const snapshot = await query.get();
      return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    },
  },

   Mutation: {
    addSale: async (_: any, args: any) => {
      const amount = Number(args.quantity || 0) * Number(args.price || 0);

      const saleData = {
        category: args.category,
        brand: args.brand,
        month: args.month,
        quantity: Number(args.quantity || 0),
        price: Number(args.price || 0),
        amount: amount,
        goalQty: Number(args.goalQty || 0),
        goalAmt: Number(args.goalAmt || 0),
        updatedAt: new Date().toISOString()
      };

      // BUSCAR SI YA EXISTE PARA REEMPLAZAR
      const salesRef = db.collection("sales");
      const snapshot = await salesRef
          .where("category", "==", args.category)
          .where("brand", "==", args.brand)
          .where("month", "==", args.month)
          .get();

      if (!snapshot.empty) {
        // Si existe, actualizamos el primero que encuentre
        const docId = snapshot.docs[0].id;
        await salesRef.doc(docId).set(saleData, { merge: true });
        return { id: docId, ...saleData };
      } else {
        // Si no existe, creamos uno nuevo
        const ref = await salesRef.add(saleData);
        return { id: ref.id, ...saleData };
      }
    }
  }
};