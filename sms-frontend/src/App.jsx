import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentPortal from './Component/StudentPortal';
import ManageStudents from './Component/Student/ManageStudents';
import AddStudentPage from './Component/Student/AddStudentPage';
import UpdateStudent from './Component/Student/UpdateStudent';
import StudentDetails from './Component/Student/StudentDetails';
import ManageCourses from './Component/Course/ManageCourse';
import AddCoursePage from './Component/Course/AddCourse';
import ManageAudit from './Component/Audit/ManageAudit';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentPortal />} />
      <Route path="/manage-students" element={<ManageStudents />} />
      <Route path="/add-student" element={<AddStudentPage />} />
      <Route path="/update-student/:id" element={<UpdateStudent />} />
      <Route path="/student-details/:id" element={<StudentDetails />} />
      <Route path="/manage-courses" element={<ManageCourses />} />
      <Route path="/add-course" element={<AddCoursePage />} />
      <Route path="/view-audit" element={<ManageAudit />} />
    </Routes>
  );
}

export default App;