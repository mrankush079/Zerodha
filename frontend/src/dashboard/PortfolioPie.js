import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const defaultData = [
  { name: "Equity", value: 40 },
  { name: "Debt", value: 30 },
  { name: "Gold", value: 20 },
  { name: "Others", value: 10 },
];

const COLORS = ["#00b894", "#0984e3", "#fdcb6e", "#d63031", "#6c5ce7", "#e17055"];

const PortfolioPie = ({ data = defaultData }) => {
  return (
    <div className="portfolio-pie">
      <h3>SIP Portfolio Allocation</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioPie;