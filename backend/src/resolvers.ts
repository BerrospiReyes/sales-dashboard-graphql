import { db } from "./firebase";

export const resolvers = {
  Query: {
    sales: async (_: any, args: any) => {
      let query: any = db.collection("sales");

      if (args.category) {
        query = query.where("category", "==", args.category);
      }

      if (args.brand) {
        query = query.where("brand", "==", args.brand);
      }

      const snapshot = await query.get();

      return snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }));
    },

    totalSalesByCategory: async (_: any, { category }: any) => {
      const snapshot = await db
          .collection("sales")
          .where("category", "==", category)
          .get();

      return snapshot.docs.reduce(
          (sum: number, doc: any) => sum + (doc.data().amount || 0),
          0
      );
    }
  },

  Mutation: {
    addSale: async (_: any, { category, brand, quantity, price }: any) => {
      const amount = quantity * price;

      const newSaleData = {
        category,
        brand,
        quantity,
        price,
        amount,
        createdAt: new Date().toISOString() // Opcional: para ordenar por fecha
      };

      const ref = await db.collection("sales").add(newSaleData);

      return {
        id: ref.id,
        ...newSaleData
      };
    }
  }
};