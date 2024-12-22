import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ItemChart({ items }) {
  const resolvedCount = items.filter((item) => item.resolved).length;

  const notResolvedCount = items.length - resolvedCount;

  const data = {
    labels: ["Resolved", "Not resolved"],
    datasets: [
      {
        data: [resolvedCount, notResolvedCount],
        backgroundColor: ["aqua", "purple"],
      },
    ],
  };

  const options = {};
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Pie
        data={data}
        options={options}
        style={{ width: "35rem", height: "35rem" }}
      ></Pie>
    </div>
  );
}

export default ItemChart;
