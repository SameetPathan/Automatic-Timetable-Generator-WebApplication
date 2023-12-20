import React from 'react';
import "./time.css";
import TimetableData from './timetableData';

const Timetable = (props) => {


    const timeSlots = [
        { start: '9:30 AM', end: '10:15 AM' },
        { start: '10:20 AM', end: '11:05 AM' },
        { start: '11:10 AM', end: '12:00 AM' },
        { start: '12:00 AM', end: '12:45 PM' },
        { start: '12:50 PM', end: '1:35 PM' },
        { start: '1:40 PM', end: '2:00 PM' },
        { start: '2:00 PM', end: '4:00 PM' }
      ];
  // Example data for timetable
  const timetableData = [
    {
      day: 'Monday',
      periods: ['Maths', 'Physics', 'Chemistry', 'Lunch', 'Biology', 'History','Break', 'Practical 1'],
      teacher: ['S. M. Sameet', 'S. M. Aditya', 'S. M. Rutuja', '', 'S. M. Sanika', 'Sohan','', 'S. M. Amin']
    },
    {
      day: 'Tuesday',
      periods: ['Physics', 'History', 'Maths', 'Lunch', 'Chemistry', 'Biology','Break', 'Practical 1'],
      teacher: ['S. M. Aditya', 'S. M. Rutuja', 'S. M. Sameet', '', 'S. M. Sanika', 'Sohan','', 'S. M. Amin']
    },
    {
      day: 'Wednesday',
      periods: ['Chemistry', 'Biology', 'Physics', 'Lunch', 'History', 'Maths','Break', 'Practical 1'],
      teacher: ['S. M. Aditya', 'S. M. Rutuja', 'Sohan', '', 'S. M. Sanika', 'S. M. Sameet','', 'S. M. Amin']
    },
    {
      day: 'Thursday',
      periods: ['Biology', 'Maths', 'History', 'Lunch', 'Physics', 'Chemistry','Break', 'Practical 1'],
      teacher: ['S. M. Aditya', 'S. M. Sameet', 'S. M. Sanika', '', 'S. M. Rutuja', 'Sohan','', 'S. M. Amin']
    },
    {
      day: 'Friday',
      periods: ['History', 'Chemistry', 'Biology', 'Lunch', 'Maths', 'Physics','Break', 'Practical 1'],
      teacher: ['S. M. Aditya', 'S. M. Rutuja', 'S. M. Sanika', '', 'S. M. Sameet', 'Sohan','', 'S. M. Amin']
    },
    {
      day: 'Saturday',
      periods: ['Project', 'Practical 1', 'Practical 2', 'Maths','Chemistry', 'Biology', 'History','Break'],
      teacher: ['Guide', 'S. M. Aditya', 'S. M. Sanika', 'S. M. Sameet', 'S. M. Rutuja', 'Sohan','S. M. Amin', '']
    }

  ];
  

  return (
    <>
    {props.loggedStatus ?<><TimetableData timetableData={timetableData} timeSlots={timeSlots} number={1}></TimetableData>
    <TimetableData timetableData={timetableData} timeSlots={timeSlots} number={2}></TimetableData>
    <TimetableData timetableData={timetableData} timeSlots={timeSlots} number={3}></TimetableData></>:<>
    <TimetableData timetableData={timetableData} timeSlots={timeSlots} number={1}></TimetableData>
    
    </>}
    
    </>
  );
};

export default Timetable;
