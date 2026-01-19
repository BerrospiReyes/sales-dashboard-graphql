import { db } from "./firebase";

export const resolvers = {
  Query: {
    sales: async (_: any, args: any) => {
      let query: any = db.collection("sales");

      if (args.category && args.category !== "") {
        query = query.where("category", "==", args.category);
      }
      if (args.brand && args.brand !== "") {
        query = query.where("brand", "==", args.brand);
      }
      if (args.month && args.month !== "") {
        query = query.where("month", "==", args.month);
      }

      const snapshot = await query.get();
      return snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }));
    },
  },

  Mutation: {
    addSale: async (_: any, { category, brand, quantity, price, month }: any) => {
      const amount = quantity * price;
      const newSaleData = {
        category,
        brand,
        quantity,
        price,
        amount,
        month,
        createdAt: new Date().toISOString()
      };
      const ref = await db.collection("sales").add(newSaleData);
      return { id: ref.id, ...newSaleData };
    }
  }
};