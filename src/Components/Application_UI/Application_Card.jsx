import { useState } from "react";
import Application_Modal from "./Application_Modal";

const Application_Card = ({ company, position, status, appliedDate, job }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showJob, setShowJob] = useState("");

  return (
    <div className="bg-white shadow-md rounded-lg p-5 m-2 inline-flex w-full justify-between items-center">
      <h2 className="text-xl font-bold">{company}</h2>
      <p className="text-gray-600">{position}</p>
      <p className="text-gray-600">{status}</p>
      <p className="text-gray-600">{appliedDate}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={() => {
          setShowDetails(true);
          setShowJob(job);
        }}
      >
        View Details
      </button>

      {showDetails && (
        <Application_Modal
          job={showJob}
          setShowDetails={setShowDetails}
          setShowJob={setShowJob}
        />
      )}
    </div>
  );
};

export default Application_Card;
