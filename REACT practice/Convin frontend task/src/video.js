import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="video-player-wrapper">
      <ReactPlayer url={videoUrl} controls />
    </div>
  );
};

export default VideoPlayer;
