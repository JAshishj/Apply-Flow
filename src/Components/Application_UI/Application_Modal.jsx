import { useState } from "react";
import { useApplications } from "../../Context/Application_Context";
import Edit_Application from "./Edit_Application";
const Application_Modal = ({ job, setShowDetails, setShowJob }) => {
  const { applications,deleteApplication } = useApplications();
  const [showEdit, setShowEdit] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">{job.company}</h2>
        <p className="mb-2">
          <strong>Position:</strong> {job.title}
        </p>
        <p className="mb-2">
          <strong>Status:</strong> {job.status}
        </p>
        <p className="mb-2">
          <strong>Applied Date:</strong> {job.appliedDate}
        </p>
        <p className="mb-2">
          <strong>Job Description:</strong> {job.description}
        </p>
        <p className="mb-2">
          <strong>Last Updated:</strong>{" "}
          {job.updatedAt ? new Date(job.updatedAt).toLocaleDateString() : "N/A"}
        </p>
        <p className="mb-2">
          <strong>Notes:</strong> {job.notes || "No notes available."}
        </p>
        <button
          className="absolute top-[28%] right-[26.5%] text-4xl font-bold text-red-500 hover:text-red-700 hover:scale-110 transition duration-300"
          onClick={() => {
            setShowDetails(false);
            setShowJob(null);
          }}
        >
          X
        </button>
        <div className="flex mt-2 ml-[18%] gap-2 gap-x-[45%]">
          <button
            onClick={() => {
              setEditingJob(job);
              setShowEdit(true);
            }}
            className="mt-4 ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:scale-105 hover:shadow-lg transition duration-300"
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteApplication(job.id);
              setShowDetails(false);
              setShowJob(null);
            }}
            className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 hover:scale-105 hover:shadow-lg transition duration-300"
          >
            Delete
          </button>
        </div>
        {editingJob && (
          <Edit_Application
            job={editingJob}
            setEditingJob={setEditingJob}
            setShowEdit={setShowEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Application_Modal;
