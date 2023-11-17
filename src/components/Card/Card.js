import React from 'react';
import './Card.css';
import myImage from '../assets/profileimg.jpeg';

const Card = ({ id, title, tags, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'InProgress':
        return '#FFA500'; // Orange color for 'InProgress'
      case 'Completed':
        return '#008000'; // Green color for 'Completed'
      case 'Pending':
        return '#FF6347'; // Tomato color for 'Pending'
      default:
        return '#808080'; // Default color for unknown status
    }
  };

  return (
    <div className="cardContainer" style={{ gap: '10px', borderColor: getStatusColor() }}>
      <div className="cardHeading">
        <span className="userId">ID: {id}</span>
        <div className="imageContainer">
          <img src={myImage} alt="UserImage" />
          <div className="showStatus" style={{ background: getStatusColor() }}></div>
        </div>
      </div>
      <div className="cardTitle">
        <p>{title}</p>
      </div>
      <br></br>
      <div className="cardTags">
        <div className="tags"> ... </div>
        {tags?.map((tag, index) => (
          <div key={index} className="tags">
            <span>•</span> {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
