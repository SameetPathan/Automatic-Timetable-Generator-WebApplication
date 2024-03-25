import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from "firebase/database";
import { toast } from 'react-toastify';

function Timetable() {
  const [activeTeachers, setActiveTeachers] = useState([]);
  const [numLectures, setNumLectures] = useState(0);
  const [numPracticals, setNumPracticals] = useState(0);
  const [timetable, setTimetable] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    fetchActiveTeachers();
    setCurrentDate(new Date().toDateString()); // Set current date
  }, []);

  const fetchActiveTeachers = async () => {
    const db = getDatabase();
    const teachersRef = ref(db, "staffdetails");
    const teachersSnapshot = await get(teachersRef);
    const fetchedTeachers = teachersSnapshot.val();
    if (fetchedTeachers) {
      const activeTeachersArray = Object.keys(fetchedTeachers)
        .map((key) => fetchedTeachers[key])
        .filter((teacher) => teacher.activeStaff);
      setActiveTeachers(activeTeachersArray);
    }
  };

  const timeSlots = [
    { start: '8:30 AM', end: '9:30 AM' },
    { start: '9:30 AM', end: '10:30 AM' },
    { start: '10:30 AM', end: '10:45 AM' },
    { start: '10:45 AM', end: '11:45 AM' },
    { start: '11:45 AM', end: '12:45 PM' },
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
    "Friday"
  ];

  const handleGenerateTimetable = () => {
    const totalPeriods = numLectures + numPracticals;
    if (totalPeriods !== 7) {
      toast.error("Total periods should be 7. Please adjust the number of lectures and practicals.");
      return;
    }
  
    const generatedTimetable = [];
    daysOfWeek.forEach(day => {
      const dayTimetable = {
        day: day,
        periods: [],
        teacher: []
      };
      let remainingLectures = numLectures;
      let remainingPracticals = numPracticals;
  
      for (let i = 0; i < timeSlots.length; i++) {
        if (remainingPracticals > 0 && i < timeSlots.length - 2 && i % 2 === 0) {
          // Add practical session
          dayTimetable.periods.push("Practical");
          dayTimetable.teacher.push(getRandomTeacher(true).name);
          remainingPracticals--;
          i++; // Skip the next slot as it's already occupied by the practical session
        } else if (remainingLectures > 0) {
          // Add lecture session
          dayTimetable.periods.push("Lecture");
          dayTimetable.teacher.push(getRandomTeacher(false).name);
          remainingLectures--;
        } else {
          // Add break
          dayTimetable.periods.push("Break");
          dayTimetable.teacher.push("");
        }
      }
      generatedTimetable.push(dayTimetable);
    });
  
    setTimetable(generatedTimetable);
  };
  
  // Helper function to get a random teacher based on availability and type (lecture or practical)
  const getRandomTeacher = (isPractical) => {
    const availableTeachers = activeTeachers.filter(teacher => teacher.isPractical === isPractical);
    const randomIndex = Math.floor(Math.random() * availableTeachers.length);
    return availableTeachers[randomIndex];
  };

  return (
    <div className="container mt-4 mb-5 border shadow p-2">
      <div className="row">
        {/* Logo (Top Left) */}
        <div className="col">
          <img src="rr.png" alt="Your Logo" />
        </div>

        {/* Heading (Centered) */}
        <div className="col text-center">
          <h6>Sinhgad Institute of Technology, Lonavla</h6>
          <h6>Department of Computer Engineering</h6>
          <h6>Time Table: A.Y.- 2023-24 TERM - 2</h6>
          <h6>Department of Computer Engineering</h6>
        </div>

        {/* Date (Top Right) */}
        <div className="col text-right">W.e.f Date: {currentDate}</div>
      </div>

      {/* Timetable Table */}
      <div className="table-responsive mt-3">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Day</th>
              {timeSlots.map((slot, i) => (
                <th key={i + 1}>
                  <div>
                    {slot.start} - {slot.end}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timetable.map((day, index) => (
              <React.Fragment key={index}> 
                <tr className="table-active">
                  <td colSpan={8}>{day.day}</td>
                </tr>
                <tr>
                  <td></td>
                  {day.periods.map((period, idx) => (
                    <td
                      key={idx}
                      className={
                        period === 'Lunch'
                          ? 'lunch'
                          : period.includes('Practical')
                          ? 'practical'
                          : period === 'Break'
                          ? 'lunch'
                          : ''
                      }
                    >
                      {period}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td></td>
                  {day.teacher.map((teacher, idx) => (
                    <td key={idx}>{teacher}</td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Generate Timetable Form */}
      <div className="row mt-4">
        <div className="col text-center">
          <div className="form-group">
            <label htmlFor="numLectures">Number of Lectures per Day: (6)</label>
            <input
              type="number"
              className="form-control"
              id="numLectures"
              value={numLectures}
              onChange={(e) => setNumLectures(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="numPracticals">Number of Practicals per Day:(1)</label>
            <input
              type="number"
              className="form-control"
              id="numPracticals"
              value={numPracticals}
                />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleGenerateTimetable}
                  disabled={numLectures <= 0 || numPracticals <= 0}
                >
                  Generate Timetable
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      export default Timetable;
      