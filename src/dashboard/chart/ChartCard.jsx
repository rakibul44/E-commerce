import { FaShoppingBag, FaDollarSign, FaFileInvoice, FaUsers } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const DashboardCards = () => {
  const data = [
    {
      title: "Total Sales",
      value: "34,945",
      percentage: "1.56%",
      icon: <FaShoppingBag className="text-green-600" />,
      trend: "up",
      graphColor: "rgba(34, 197, 94, 0.5)", // Green
      graphData: [30, 32, 35, 34, 36, 39, 40],
    },
    {
      title: "Total Income",
      value: "$37,802",
      percentage: "1.56%",
      icon: <FaDollarSign className="text-orange-600" />,
      trend: "down",
      graphColor: "rgba(251, 146, 60, 0.5)", // Orange
      graphData: [40, 38, 37, 36, 35, 34, 33],
    },
    {
      title: "Orders Paid",
      value: "34,945",
      percentage: "0.00%",
      icon: <FaFileInvoice className="text-gray-500" />,
      trend: "neutral",
      graphColor: "rgba(156, 163, 175, 0.5)", // Gray
      graphData: [34, 34, 34, 34, 34, 34, 34],
    },
    {
      title: "Total Visitor",
      value: "34,945",
      percentage: "1.56%",
      icon: <FaUsers className="text-blue-600" />,
      trend: "up",
      graphColor: "rgba(59, 130, 246, 0.5)", // Blue
      graphData: [20, 25, 30, 35, 40, 45, 50],
    },
  ];

  return (
    <section className="w-full bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4"
          >
            {/* Icon */}
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full bg-gray-100">{item.icon}</div>
              <span className="text-gray-600 font-medium">{item.title}</span>
            </div>

            {/* Main Value */}
            <h2 className="text-3xl font-bold">{item.value}</h2>

            {/* Graph */}
            <div className="h-20">
              <Line
                data={{
                  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  datasets: [
                    {
                      label: item.title,
                      data: item.graphData,
                      fill: true,
                      borderColor: item.graphColor,
                      backgroundColor: `${item.graphColor}`,
                      tension: 0.4,
                      pointRadius: 0,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: { display: false },
                    y: { display: false },
                  },
                }}
              />
            </div>

            {/* Trend */}
            <div className="flex justify-between items-center">
              <span className={`text-sm font-semibold ${
                item.trend === "up"
                  ? "text-green-500"
                  : item.trend === "down"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}>
                {item.trend === "up" ? "↑" : item.trend === "down" ? "↓" : "→"} {item.percentage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardCards;
