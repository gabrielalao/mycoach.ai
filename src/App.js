import React from "react";

import Courses from "./components/Courses";
import CourseEdit from "./components/CourseEdit";
import CustomLoadingOverlay from "./components/LoadingOverlay";
import "./App.css";

function App() {
  return (
    <div className="content_contain">
      <Courses/>
      <CourseEdit/>
      <CustomLoadingOverlay/>
    </div>
  );
}

export default App;
