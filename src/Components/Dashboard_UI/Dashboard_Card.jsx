const Dashboard_Card = ({ title, count }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-xl text-center">
      <p className="text-xl font-semibold">{title}</p>
      <p className="text-gray-600 text-xl font-semibold">{count}</p>
    </div>
  );
};

export default Dashboard_Card;
