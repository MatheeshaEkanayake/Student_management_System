import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentPortal from './Component/Student/StudentPortal'
import ManageStudents from './pages/ManageStudents';
import ManageCourses from './pages/ManageCourses';
import ViewAudit from './pages/ViewAudit';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentPortal />} />
      <Route path="/manage-students" element={<ManageStudents />} />
      <Route path="/manage-courses" element={<ManageCourses />} />
      <Route path="/view-audit" element={<ViewAudit />} />
    </Routes>
  );
}

export default App;
