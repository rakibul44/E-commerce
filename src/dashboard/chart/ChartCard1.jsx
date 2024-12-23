/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);


const DashboardCard = ({ title, sales, change, positiveChange, chartData }) => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: chartData,
        borderColor: "#6D28D9",
        backgroundColor: "rgba(109, 40, 217, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false } },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col w-full">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-500 text-sm">SALES</p>
      <div className="flex items-center mt-2">
        <span className="text-2xl font-bold">${sales}</span>
        <span className={`ml-2 text-sm font-medium ${positiveChange ? "text-green-500" : "text-red-500"}`}>
          {change > 0 ? "+" : ""}
          {change}%
        </span>
      </div>
      <Line data={data} options={options} className="mt-4" />
    </div>
  );
};

const ChartCard1 = () => {
  const cardsData = [
    {
      title: "Acme Plus",
      sales: "24,780",
      change: 49,
      positiveChange: true,
      chartData: [10, 20, 15, 30, 40, 50],
    },
    {
      title: "Acme Advanced",
      sales: "17,489",
      change: -14,
      positiveChange: false,
      chartData: [50, 40, 35, 30, 25, 20],
    },
    {
      title: "Acme Professional",
      sales: "9,962",
      change: 29,
      positiveChange: true,
      chartData: [5, 10, 15, 20, 25, 30],
    },
  ///add extra card if needed 
  ];

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {cardsData.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            sales={card.sales}
            change={card.change}
            positiveChange={card.positiveChange}
            chartData={card.chartData}
          />
        ))}
      </div>
    </div>
  );
};

export default ChartCard1;
