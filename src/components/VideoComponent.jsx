import PropTypes from 'prop-types';

const VideoComponent = ({ id, small }) => {
  return (
    <iframe
      width='100%'
      height={small ? '150' : '500'}
      title='Youtube video player'
      src={`https://www.youtube.com/embed/${id}`}
      allowFullScreen
    ></iframe>
  );
};

VideoComponent.propTypes = {
  id: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

export default VideoComponent;
