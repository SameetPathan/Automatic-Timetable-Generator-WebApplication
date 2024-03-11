import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import "./time.css";
import TimetableData from "./timetableData";
import { addcurrenttime } from "../firebaseConfig";

const Timetable = (props) => {
  const [posts, setPosts] = useState([]);
  const [subjects, setsubjects] = useState([]);
  const [teachers, setteachers] = useState([]);

  const [data1, setdata1] = useState([]);
  const [data2, setdata2] = useState([]);
  const [data3, setdata3] = useState([]);

  const fetchtime = async () => {
    const db = getDatabase();
    const userRef = ref(db, "generatedtimetable");
    const userSnapshot = await get(userRef);
    const fetchedPosts = userSnapshot.val();
    if (fetchedPosts) {
      setdata1(fetchedPosts.Data1)
      setdata2(fetchedPosts.Data2)
      setdata3(fetchedPosts.Data3)
    }
  };

  useEffect(() => {
    fetchtime()
  }, []);

  const fetchPosts = async () => {
    const db = getDatabase();
    const userRef = ref(db, "staffdetails");
    const userSnapshot = await get(userRef);
    const fetchedPosts = userSnapshot.val();
    if (fetchedPosts) {
      const postsArray = Object.keys(fetchedPosts).map((key) => ({
        id: key,
        ...fetchedPosts[key],
      }));
      setPosts(postsArray);
      const subjectsSet = new Set();
      const teachersSet = new Set();
      postsArray.forEach((entry) => {
        subjectsSet.add(entry.subject);
        teachersSet.add(entry.name);
      });

      const subjects = Array.from(subjectsSet);
      const teachers = Array.from(teachersSet);
      setsubjects(subjects);
      setteachers(teachers);
      caller()
    }
  };

  const caller=()=>{
    let data11 = generateTimetable()
    setdata1(data11)
    let data22 = generateTimetable()
    setdata2(data22)
    let data33 = generateTimetable()
    setdata3(data33)
    addcurrenttime(data11,data22,data33)
  }

  const timeSlots = [
    { start: '8:30 AM', end: '9:30 AM' },
    { start: '9:30 AM', end: '10:30 AM' },
    { start: '10:30 AM', end: '10:45 PM' },
    { start: '10:45 PM', end: '11:45 PM' },
    { start: '11:45 PM', end: '12:45 PM' },
    { start: '12:45 PM', end: '1:45 PM' },
    { start: '1:45 PM', end: '2:45 PM' },
    { start: '2:45 PM', end: '3:45 PM' },
    { start: '3:45 PM', end: '4:45 PM' }
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
 

  const generateRandomPeriods = () => {
    const periods = [...subjects];
    for (let i = periods.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [periods[i], periods[j]] = [periods[j], periods[i]];
    }
    return periods;
  };

  const generateRandomTeachers = (periods) => {
    const assignedTeachers = [];
    for (let i = 0; i < periods.length; i++) {
      let teacher = "";
      if (periods[i] !== "Break" && periods[i] !== "Lunch") {
        const index = subjects.indexOf(periods[i]);
        teacher = teachers[index];
      }
      assignedTeachers.push(teacher);
    }
    return assignedTeachers;
  };

  const generateTimetable = () => {
    const generatedData = [];

    daysOfWeek.forEach((day) => {
      const periodsBeforeLunch = generateRandomPeriods().slice(0, 2);
      const lunch = ["Lunch"];
      const periodsAfterLunch = generateRandomPeriods().slice(0, 3);
      const breakPeriod = ["Break"];
      const remainingPeriods = generateRandomPeriods().slice(0, 3);

      const daySchedule = [
        ...periodsBeforeLunch,
        ...lunch,
        ...periodsAfterLunch,
        ...breakPeriod,
        ...remainingPeriods,
      ];

      const teachersList = generateRandomTeachers(daySchedule);

      const timetableEntry = {
        day,
        periods: daySchedule,
        teacher: teachersList,
      };

      generatedData.push(timetableEntry);
    });

    return generatedData;
  };


  return (
    <>
      {props.loggedStatus ? (
        <>
          <div className="container-fluid mt-5 text-center">
            <button
              className="btn btn-info mb-3 ml-3"
              onClick={() => fetchPosts()}
            >
              Generate
            </button>
          </div>
          <TimetableData
            timetableData={data1}
            timeSlots={timeSlots}
            number={1}
          ></TimetableData>
          <TimetableData
            timetableData={data2}
            timeSlots={timeSlots}
            number={2}
          ></TimetableData>
          <TimetableData
            timetableData={data3}
            timeSlots={timeSlots}
            number={3}
          ></TimetableData>
        </>
      ) : (
        <>
          <TimetableData
            timetableData={data1}
            timeSlots={timeSlots}
            number={1}
          ></TimetableData>
        </>
      )}
    </>
  );
};

export default Timetable;
