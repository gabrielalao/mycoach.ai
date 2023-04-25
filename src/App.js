import React from "react";

import Courses from "./components/Courses";
import CourseEdit from "./components/CourseEdit";
import CustomLoadingOverlay from "./components/LoadingOverlay";
import "./App.css";
import VideoModal from "./components/video/VideoModal";

function App() {
  return (
    <div className="content_contain">
      <Courses/>
      <CourseEdit/>
      <VideoModal/>
      <CustomLoadingOverlay/>
    </div>
  );
}

export default App;
