import { db, auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

// 📥 CRIAR
export const addTransaction = async (transaction: any) => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("Usuário não logado");
        reject("no-user");
        return;
      }

      try {
        await addDoc(collection(db, "transactions"), {
          ...transaction,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const subscribeTransactions = (callback: (data: any[]) => void) => {
  const user = auth.currentUser;

  if (!user) return;

  const q = query(
    collection(db, "transactions"),
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(data);
  });
};

export const deleteTransaction = async (id: string) => {
  await deleteDoc(doc(db, "transactions", id));
};