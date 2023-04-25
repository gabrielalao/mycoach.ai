import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import VideoPlayer from "./VideoPlayer";
import useCouseStore from '../../store/useCourseStore';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

const VideoModal = () => {
  const { activeVideo, setActiveVideo } = useCouseStore();
  const [options, setOptions] = useState(null);

  const closeModal = () => {
    setActiveVideo(null);
  }

  useEffect(() => {
    if (!activeVideo) {
      setOptions(null);
      return;
    }

    setOptions({
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{        
        src: activeVideo.video_url,
        type: "video/mp4"
      }],
    })
  }, [activeVideo]);

  return (
      <>
      <Modal
        isOpen={activeVideo != null}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Course Video"
      >    
        {options && <VideoPlayer options={options} />}        
        <button
          className="btn close-modal-btn"
          onClick={closeModal}
        >
          Close Course
        </button>
      </Modal>           
      </>
  );
}

export default VideoModal;