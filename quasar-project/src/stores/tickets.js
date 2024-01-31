import { defineStore } from "pinia";
import { db, firebaseApp } from "boot/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  FieldValue,
  Firestore,
  arrayRemove,
  arrayUnion,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

export const useTicketsStore = defineStore("tickets", {
  state: () => ({
    tickets: [],
    docId: null,
  }),

  getters: {
    getTickets(state) {
      return state.tickets;
    },
    getDocId(state) {
      return state.docId;
    },
  },

  actions: {
    async setTicketsAll() {
      this.tickets = [];
      const querySnapshot = await getDocs(collection(db, "NewTickets"));
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        this.tickets.push(doc.id);
      });
      console.log(this.docId);
      this.tickets.forEach((i) => {
        const docRef = doc(db, "NewTickets", `${i}`);
        const docSnap = getDoc(docRef);
        console.log(docSnap);
      });
    },
    async setTicketsSearch(from, to, time) {
      const searchTime = new Date(time).toLocaleDateString("ru-RU");
      console.log(searchTime);
      const q = query(
        collection(db, "NewTickets"),
        where("from_place", "==", `${from}`),
        where("to_place", "==", to),
        where("time", "==", searchTime)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        this.docId = doc.id;
      });
      const unsub = onSnapshot(doc(db, "NewTickets", this.docId), (doc) => {
        // console.log("Current data: ", doc.data());
        this.tickets.push(doc.data());
      });
      console.log(this.tickets);
    },
    async updateFreePlaces(numberOfSeat, freePlaces, allPlaces, date) {
      const updatedValue = doc(db, "NewTickets", this.docId);
      console.log(updatedValue.id, updatedValue);
      const newArrayFreePlaces = freePlaces.filter((x) => x != numberOfSeat);
      const newAllPlaces = allPlaces.split(",");
      const digitFrePlaces = [];
      const digitAllPlaces = [];
      newArrayFreePlaces.forEach((i) => digitFrePlaces.push(Number(i)));
      newAllPlaces.forEach((i) => digitAllPlaces.push(Number(i)));
      const current_timestamp = Timestamp.fromDate(new Date(date));
      console.log(current_timestamp);
      const newDateInfo = {
        freePlaces: digitFrePlaces,
        allPlaces: digitAllPlaces,
        timeFromTo: current_timestamp,
      };
      console.log(newDateInfo);
      await updateDoc(updatedValue, {
        date_info: [newDateInfo],
      });
      // await updateDoc(updatedValue, {
      //   date_info: newDateInfo,
      // });
      // const remove = await updatedValue.update({
      //   date_info: {
      //     freePlaces: firebaseApp.firestore.FieldValue.arrayRemove(Number(numberOfSeat)),
      //   },
      // });
    },
    async addRoute(from, to, price, timeFromTo, searchTime, seats) {
      const seatsFill = Array.from({ length: seats }, (_, i) => i + 1);
      const newRoute = {
        from_place: from,
        to_place: to,
        price: price,
        time: searchTime,
        date_info: [
          {
            allPlaces: seatsFill,
            freePlaces: seatsFill,
            timeFromTo: timeFromTo,
          },
        ],
      };
      await setDoc(doc(db, "NewTickets", `${from}_${to}`), newRoute);
    },
  },
});
