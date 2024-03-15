import React, { useState } from 'react';

function TimetableData(props) {
 


  const currentDate = new Date().toLocaleDateString();




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

      {/* Search Box */}
     

      {/* Timetable Table */}
      <div className="table-responsive mt-3">
        <table className="table table-bordered table-striped">
          {/* Table content goes here */}
          {/* You can dynamically generate rows and columns using your data */}
          <thead className="thead-dark">
            <tr>
              <th scope="col">Day</th>
              {props.timeSlots.map((slot, i) => (
                <th key={i + 1}>
                  <div>
                    {slot.start} - {slot.end}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.timetableData.map((day, index) => (
              <React.Fragment key={index}>
                <tr className="table-active">
                  <td colSpan={8}>{day.day}</td>
                </tr>
                <tr>
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
                  {day.teacher.map((teacher, idx) => (
                    <td key={idx}>{teacher}</td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TimetableData;
