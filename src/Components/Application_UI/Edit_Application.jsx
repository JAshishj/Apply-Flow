import { useState } from "react";
import { useApplications } from "../../Context/Application_Context";
const Edit_Application = ({ job, setEditingJob, setShowEdit }) => {
  const { applications, updateApplication } = useApplications();

  const [formData, setFormData] = useState({
    company: job?.company || "",
    title: job?.title || "",
    description: job?.description || "",
    status: job?.status || "applied",
    appliedDate: job?.appliedDate || "",
    notes: job?.notes || "",
    id: job?.id,
    createdAt: job?.createdAt,
  });

  const isFormValid = () => {
    return (
      formData.company?.trim() &&
      formData.title?.trim() &&
      formData.description?.trim() &&
      formData.status?.trim() &&
      formData.appliedDate &&
      formData.notes?.trim()
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!isFormValid()) return;
    const now = new Date().toISOString();
    const updatedApplication = {
      ...formData,
      updatedAt: now,
    };
    updateApplication(updatedApplication);
    setShowEdit(false);
    setEditingJob(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
        <h2 className="text-3xl font-bold mb-4">Edit Application</h2>
        <div className="flex flex-col gap-5 mt-[3.5%]">
          <div className="inline-flex gap-4">
            <p className="w-2/12 text-2xl">Company :-</p>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="border text-lg p-2 rounded-md w-3/4"
            />
          </div>
          <div className="inline-flex gap-4">
            <p className="w-2/12 text-2xl">Position :-</p>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border text-lg p-2 rounded-md w-3/4"
            />
          </div>
          <div className="inline-flex gap-4">
            <p className="w-2/12 text-2xl">Description :-</p>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border text-lg p-2 rounded-md w-3/4"
            />
          </div>
          <div className="inline-flex gap-4">
            <p className="w-2/12 text-2xl">Status :-</p>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border text-lg p-2 rounded-md w-auto"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="inline-flex gap-4">
            <p className="w-2/12 text-2xl">Applied On :-</p>
            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              disabled
              className="border text-lg p-2 rounded-md w-3/4"
            />
          </div>
          <div className="inline-flex gap-4">
            <p className="w-2/12 text-2xl">Notes :-</p>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="border text-lg p-2 rounded-md w-3/4"
            />
          </div>
          <div className="flex gap-4 gap-x-[75%] mt-3 ml-20">
            <button
              onClick={() => {
                setShowEdit(false);
                setEditingJob(null);
              }}
              className="mt-4 bg-red-500 text-white px-4 py-2 w-auto rounded-md text-center hover:bg-red-600 hover:scale-110 hover:shadow-lg transition duration-300"
            >
              Close
            </button>
            <button
              onClick={() => handleSave()}
              className={`mt-4 px-4 py-2 w-auto text-center rounded-md transition
                ${
                  isFormValid()
                    ? " bg-green-500 text-white hover:bg-green-600 hover:scale-110 hover:shadow-lg transition duration-300"
                    : " bg-gray-300 text-gray-500  cursor-not-allowed"
                }
              `}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit_Application;
