import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDc7G-sJS8iDMS1Bx47QEOXsIBFfUDqXpU",
  authDomain: "automatic-timetable-gene-7d2ff.firebaseapp.com",
  projectId: "automatic-timetable-gene-7d2ff",
  storageBucket: "automatic-timetable-gene-7d2ff.appspot.com",
  messagingSenderId: "267973790529",
  appId: "1:267973790529:web:87e82a8af80ad72ade6fc0"
};

export const app = initializeApp(firebaseConfig);

export function register(registerData){
    const dbb = getDatabase();
    set(ref(dbb, 'users/' + registerData.phoneNumber), {
      "name":registerData.name,
      "phoneNumber":registerData.phoneNumber,
      "email":registerData.email,
      "password":registerData.password,
      "confirmPassword":registerData.confirmPassword,
    });
    alert("Registration Successfull")
}


export function addcurrenttime(Data1,Data2,Data3){
  const dbb = getDatabase();
  set(ref(dbb, "generatedtimetable/"), {
    "Data1":Data1,
    "Data2":Data2,
    "Data3":Data3,

  });
}





