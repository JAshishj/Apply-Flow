import { useMemo } from "react";
import { useApplications } from "../Context/Application_Context";
import Navbar from "../Components/NavBar/Navbar";
import Dashboard_Card from "../Components/Dashboard_UI/Dashboard_Card";

const Dashboard = () => {
  const { applications } = useApplications();
  const Status_Counts = useMemo(() => {
    return applications.reduce((acc, job) => {
      const status = String(job.status || "").trim();
      if (!status) return acc;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  }, [applications]);

  function Get_Job_Counts_By_Time_Range(jobs) {
    if (jobs.length === 0)
      return {
        last30Days: 0,
        last6Months: 0,
        last1Year: 0,
      };

    const now = new Date();

    const days30 = new Date();
    days30.setDate(now.getDate() - 30);

    const months6 = new Date();
    months6.setMonth(now.getMonth() - 6);

    const year1 = new Date();
    year1.setFullYear(now.getFullYear() - 1);

    return {
      last30Days: jobs.filter((job) => new Date(job.appliedDate) >= days30)
        .length,
      last6Months: jobs.filter((job) => new Date(job.appliedDate) >= months6)
        .length,
      last1Year: jobs.filter((job) => new Date(job.appliedDate) >= year1)
        .length,
    };
  }

  const Job_Counts_By_Time_Range = useMemo(
    () => Get_Job_Counts_By_Time_Range(applications),
    [applications],
  );

  const Last_application_Date = useMemo(() => {
    if (applications.length === 0) return null;
    return applications.reduce((latest, job) => {
      const appliedDate = new Date(job.appliedDate);
      return appliedDate > latest ? appliedDate : latest;
    }, new Date(applications[0].appliedDate));
  }, [applications]);

  const Time_Since_Last_Application = useMemo(() => {
    if (applications.length === 0) return null;
    const now = new Date();
    const lastDate = new Date(Last_application_Date);
    const diffTime = Math.abs(now - lastDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [Last_application_Date]);

  return (
    <div className="bg-gray-100 text-black min-h-screen">
      <Navbar />

      <p className="text-center mt-6 text-3xl font-bold">
        Welcome to ApplyFlow Dashboard!
      </p>
      <p className="text-center mt-2 text-3xl ">
        <i>Track every application. Never miss an opportunity.</i>
      </p>
      <p className="text-center mt-2 text-2xl font-light">
        (To add new applications, go to the Applications page.)
      </p>

      <div className="bg-white mt-4 p-3 rounded-lg shadow-lg text-center">
        <p className="text-2xl font-semibold">Total Applications</p>
        <p className="text-gray-600 text-xl font-semibold">
          {applications.length}
        </p>
      </div>
      {applications.length === 0 ? (
        <div className="text-center mt-6 text-xl font-medium">
          No applications to display.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-7 p-6 mt-2">
          <Dashboard_Card
            title="Interview Scheduled"
            count={Status_Counts.Interview || 0}
          />
          <Dashboard_Card
            title="Offers Received"
            count={Status_Counts.Offer || 0}
          />
          <Dashboard_Card
            title="Applications Rejected"
            count={Status_Counts.Rejected || 0}
          />
        </div>
      )}

      <p className="p-2 mt-6 m-2 text-2xl font-bold">
        Applications by Time Range :-
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-7 p-6 mt-1">
        <Dashboard_Card
          title="Applications in Last 30 Days"
          count={Job_Counts_By_Time_Range.last30Days}
        />
        <Dashboard_Card
          title="Applications in Last 6 Months"
          count={Job_Counts_By_Time_Range.last6Months}
        />
        <Dashboard_Card
          title="Applications in Last 1 Year"
          count={Job_Counts_By_Time_Range.last1Year}
        />
      </div>

      <div>
        <p className="p-2 mt-6 m-1 text-2xl font-bold">
          Last Application Details :-
        </p>
        <div className="p-2 m-2 mt-0">
          <p className="text-xl font-medium">
            {" "}
            Last Application Date:{" "}
            {Last_application_Date
              ? Last_application_Date.toLocaleDateString()
              : "No applications yet"}
          </p>
          <p className="text-xl font-medium mt-2">
            Days Since Last Application: {Time_Since_Last_Application || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
