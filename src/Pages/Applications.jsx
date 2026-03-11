import { useState } from "react";
import { useApplications } from "../Context/Application_Context";
import Navbar from "../Components/NavBar/Navbar";
import Application_Card from "../Components/Application_UI/Application_Card";
import Add_New_Application from "../Components/Application_UI/Add_New_Application";

const Applications = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showapplication, setShowApplication] = useState(false);
  const {applications} = useApplications();

  return (
    <div className="bg-gray-100 text-black min-h-screen">
      <Navbar />

      <h1 className="text-3xl font-bold text-center pt-10">
        Applications Page
      </h1>

      <div className="flex text-2xl justify-center mt-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Applications by Company name..."
          className="border border-gray-500 rounded-md w-2xl p-2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-blue-700 text-white rounded-md p-2 ml-4 w-auto text-center "
        >
          <option value="all">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button
          onClick={() => setShowApplication(true)}
          className="bg-green-500 text-white rounded-md p-2 ml-4 w-auto text-center hover:bg-green-600 hover:scale-105 hover:shadow-lg transition duration-300"
        >
          Add Application
        </button>
      </div>

      <hr className="border-gray-500 mt-[2%]" />
      <div className="flex my-5 text-2xl">
        <p className="ml-[2%]">Company</p>
        <p className="ml-[16%]">Position</p>
        <p className="ml-[18%]">Status</p>
        <p className="ml-[15%]">Applied Date</p>
      </div>
      <hr className="border-gray-500" />

      <div>
        {applications.filter(
          (job) =>
            (statusFilter === "all" || job.status === statusFilter) &&
            job.company.toLowerCase().includes(query.toLowerCase()),
        ).map((job, index) => (
          <Application_Card
            key={index}
            company={job.company}
            position={job.title}
            status={job.status}
            appliedDate={job.appliedDate}
            job={job}
          />
        ))}
      </div>

      <div>
        {showapplication && <Add_New_Application setShowApplication={setShowApplication} />}
      </div>
    </div>
  );
};

export default Applications;
