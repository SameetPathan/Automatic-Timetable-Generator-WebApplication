const timeSlots = [
    { start: '9:30 AM', end: '10:15 AM' },
    { start: '10:20 AM', end: '11:05 AM' },
    { start: '11:10 AM', end: '12:00 PM' },
    { start: '12:00 PM', end: '12:45 PM' },
    { start: '12:50 PM', end: '1:35 PM' },
    { start: '1:40 PM', end: '2:00 PM' },
    { start: '2:00 PM', end: '4:00 PM' }
  ];
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const subjects = ['Maths', 'Physics', 'Chemistry', 'Biology', 'History', 'Practical 1', 'Practical 2', 'Project'];
  const teachers = ['S. M. Sameet', 'S. M. Aditya', 'S. M. Rutuja', 'S. M. Sanika', 'Sohan', 'S. M. Amin', 'Guide'];
  
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
      let teacher = '';
      if (periods[i] !== 'Break' && periods[i] !== 'Lunch') {
        const teacherIndex = Math.floor(Math.random() * teachers.length);
        teacher = teachers[teacherIndex];
      }
      assignedTeachers.push(teacher);
    }
    return assignedTeachers;
  };
  
  const generateTimetable = () => {
    const generatedData = [];
  
    daysOfWeek.forEach(day => {
      const periodsBeforeLunch = generateRandomPeriods().slice(0, 3);
      const lunch = ['Lunch'];
      const periodsAfterLunch = generateRandomPeriods().slice(0, 2);
      const breakPeriod = ['Break'];
      const remainingPeriods = generateRandomPeriods().slice(0, 2);
  
      const daySchedule = [
        ...periodsBeforeLunch,
        ...lunch,
        ...periodsAfterLunch,
        ...breakPeriod,
        ...remainingPeriods
      ];
  
      const teachersList = generateRandomTeachers(daySchedule);
  
      const timetableEntry = {
        day,
        periods: daySchedule,
        teacher: teachersList
      };
  
      generatedData.push(timetableEntry);
    });
  
    return generatedData;
  };
  
  const AutoGeneratedTimetableData = generateTimetable();
  console.log(AutoGeneratedTimetableData);
  