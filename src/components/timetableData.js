import React from 'react'

function TimetableData(props) {
  return (
    <div className="container mt-4 mb-5">
    <div className="alert alert-dark mb-4 text-center" role="alert">
      Timetable Generated using AI (Template {props.number})
    </div>

    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Day</th>
            {props.timeSlots.map((slot, i) => (
              <th key={i + 1}>
                {slot.start} - {slot.end}
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
                  <td key={idx}  className={
                      period === 'Lunch'
                        ? 'lunch'
                        : period.includes('Practical')
                        ? 'practical'
                        : period === 'Break'
                        ? 'lunch'
                        : '' 
                    }>
                    {period}
                  </td>
                ))}
              </tr>
              <tr>
                {day.teacher.map((teacher, idx) => (
                  <td key={idx}>
                    {teacher}
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default TimetableData