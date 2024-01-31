import { defineStore } from "pinia";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Cookies } from "quasar";
import { db } from "boot/firebase";
import {
  setDoc,
  doc,
  collection,
  query,
  where,
  arrayUnion,
  updateDoc,
  getDoc,
} from "firebase/firestore";
export const useUserStore = defineStore("user", {
  state: () => ({
    email: null,
    isAuth: false,
    tickets: [],
  }),

  getters: {
    isAdmin() {
      return this.email === "test123@gmail.com" ? true : false;
    },
    getUserTickets() {
      return this.tickets;
    },
  },
  actions: {
    setUserSettings() {
      const auth = getAuth();
      if (Cookies.has("email")) {
        this.email = Cookies.get("email");
        this.isAuth = true;
      }
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user;
          this.email = user.email;
          this.isAuth = true;
          // ...
        } else {
          // User is signed out
          // ...
          this.email = null;
          this.isAuth = false;
          Cookies.remove("email");
        }
      });
    },
    async saveTicketToUser(
      firstName,
      lastName,
      surname,
      documnet,
      place,
      serial,
      numberSerial,
      date,
      phone,
      email,
      from,
      to,
      time,
      id
    ) {

      const newUserTicket = {
        firstName: firstName,
        lastName: lastName,
        surname: surname,
        documnet: documnet,
        place: place,
        serial: serial,
        numberSerial: numberSerial,
        date: date,
        phone: phone,
        email: email,
        from: from,
        to: to,
        time: time,
        uId: id
      };

      const docRef = doc(db, "users", `${this.email}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          tickets: arrayUnion(newUserTicket),
        });
      } else {
        const tickets = { tickets: [newUserTicket] };
        await setDoc(doc(db, "users", `${this.email}`), tickets);
      }
      // this.tickets.push(newUserTicket);
    },
    async getUserTicketsFromStore(email) {
      const snap = await getDoc(doc(db, "users", `${email}`));
      if (snap.exists()) {
        console.log(snap);
        this.tickets.push(snap.id);
        this.setTicketsFromId();
      } else {
        console.log("no info");
      }
    },
    async setTicketsFromId() {
      const docRef = doc(db, "users", `${this.tickets[0]}`);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.id);
      console.log(docSnap.data());
      this.tickets = docSnap.data();
      // docSnap.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      //   // this.docId = doc.id;
      //   // this.tickets.push(doc.data());
      // });
    },
  },
});
