import { useState } from "react";
import Application_Modal from "./Application_Modal";

const Application_Card = ({ company, position, status, appliedDate, job }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showJob, setShowJob] = useState("");

  return (
    <>
      <div className="bg-white shadow-md rounded-lg px-6 py-4 m-2 grid grid-cols-5 gap-50 items-center">
        <h2 className="font-bold">{company}</h2>
        <p className="text-gray-600 font-semibold">{position}</p>
        <p className="text-gray-600 font-semibold">{status}</p>
        <p className="text-gray-600 font-semibold">{appliedDate}</p>

        <div className="flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            View Details
          </button>
        </div>
        {showDetails && (
          <Application_Modal
            job={showJob}
            setShowDetails={setShowDetails}
            setShowJob={setShowJob}
          />
        )}
      </div>
    </>
  );
};

export default Application_Card;
