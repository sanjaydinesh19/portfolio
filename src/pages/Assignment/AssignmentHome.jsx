import { Link } from "react-router-dom";
import "./assignment.css";

export default function AssignmentHome() {
  return (
    <>
      <div className="assignment-container">
        <Link to="/Assignment1" className="assignment-button">Assignment 1</Link>
        <Link to="/Assignment2" className="assignment-button">Assignment 2</Link>
        <Link to="/Assignment3" className="assignment-button">Assignment 3</Link>
        <Link to="/Assignment4" className="assignment-button">Assignment 4</Link>
        <Link to="/Assignment5" className="assignment-button">Assignment 5</Link>
        <Link to="/Assignment6" className="assignment-button">Assignment 6</Link>
        <Link to="/Assignment6_Part2" className="assignment-button">Assignment 6 Part 2</Link>
      </div>
    </>
  );
}
