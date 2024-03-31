import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, push } from "firebase/database";
import { toast } from 'react-toastify';

function Timetable() {
  const [activeTeachers, setActiveTeachers] = useState([]);
  const [numLectures, setNumLectures] = useState(0);
  const [numPracticals, setNumPracticals] = useState(0);
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    fetchActiveTeachers();
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
      console.log("## activeTeachersArray:",activeTeachersArray)
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
        slots: []
      };
      let remainingLectures = numLectures;
      let remainingPracticals = numPracticals;
  
      for (let i = 0; i < timeSlots.length; i++) {
        if (remainingPracticals > 0 && i < timeSlots.length - 2 && i % 2 === 0) {
          // Add practical session
          const practicalSlot = {
            time: {
              start: timeSlots[i].start,
              end: timeSlots[i + 2].end
            },
            teacher: getRandomTeacher(true),
            isPractical: true
          };
          dayTimetable.slots.push(practicalSlot);
          remainingPracticals--;
          i++; // Skip the next slot as it's already occupied by the practical session
        } else if (remainingLectures > 0) {
          // Add lecture session
          const lectureSlot = {
            time: {
              start: timeSlots[i].start,
              end: timeSlots[i].end
            },
            teacher: getRandomTeacher(false),
            isPractical: false
          };
          dayTimetable.slots.push(lectureSlot);
          remainingLectures--;
        } else {
          // Add break
          const breakSlot = {
            time: {
              start: timeSlots[i].start,
              end: timeSlots[i].end
            },
            teacher: null,
            isPractical: false
          };
          dayTimetable.slots.push(breakSlot);
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


  if (!timeSlots || timeSlots.length === 0) {
    return <div>No time slots available</div>;
  }

  // Define tea break and lunch break slots
  const teaBreakSlot = 3; // 3rd slot
  const lunchBreakSlot = 7; // 7th slot

  // Function to get the teacher for a specific day and slot
  const getTeacherForSlot = (dayIndex, slotIndex) => {
    // For tea break and lunch break slots, return the appropriate break text
    if (slotIndex === teaBreakSlot) return "Tea Break";
    if (slotIndex === lunchBreakSlot) return "Lunch Break";

    // Find the appropriate teacher for the slot
    const teachersForDay = activeTeachers.filter(teacher => !teacher.isPractical || teacher.isPractical && teacher.subject.includes(`L-${slotIndex}`));
    return teachersForDay[dayIndex % teachersForDay.length] || {};
  };


  return (
    <div className="container"  style={{marginBottom:"80px"}}>
      <div className="alert alert-info" role="alert">
        Active Teachers
      </div>

      <table className="table border shadow">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Subjects</th>
            <th>Is Practical</th>
          </tr>
        </thead>
        <tbody>
          {activeTeachers.map((teacher, index) => (
            <tr key={index}>
              <td>{teacher.name}</td>
              <td>{teacher.phone}</td>
              <td>{teacher.subject}</td>
              <td>
                {teacher.isPractical ? (
                  <i className="fas fa-check-circle text-success"></i> // Yes icon
                ) : (
                  <i className="fas fa-times-circle text-danger"></i> // No icon
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 shadow border p-3" style={{ marginBottom: "80px" }}>
        <div className="alert alert-info" role="alert">
          Generate Timetable
        </div>
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
            onChange={(e) => setNumPracticals(parseInt(e.target.value))}
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



    <div>
    <table className="table border shadow">
      <thead className="thead-dark">
        <tr>
          <th>Time Slot</th>
          {daysOfWeek.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((slot, slotIndex) => (
          <tr key={slot.start}>
            <td>{slot.start} - {slot.end}</td>
            {daysOfWeek.map((day, dayIndex) => {
              const teacher = getTeacherForSlot(dayIndex, slotIndex + 1);
              return (
                <td key={`${day}-${slotIndex}`}>
                  {teacher.name ? (
                    <>
                      {teacher.name}
                      <br />
                      {teacher.subject}
                      <br />
                      {teacher.isPractical && "Practical"}
                    </>
                  ):(slotIndex===2?<span className="p-2" style={{backgroundColor:"yellow"}}>Tea Break</span>:<span className="p-2" style={{backgroundColor:"green"}}>Lunch Break</span>)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    


    </div>
  );
}

export default Timetable;
