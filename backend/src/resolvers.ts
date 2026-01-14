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
        (sum: number, doc: any) => sum + doc.data().amount,
        0
      );
    }
  },

  Mutation: {
    addSale: async (_: any, args: any) => {
      const ref = await db.collection("sales").add(args);
      return { id: ref.id, ...args };
    }
  }
};
