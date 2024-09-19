import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Linear Algebra - Strong', value: 90 },
  { name: 'Calculus - Weak', value: 65 },
  { name: 'Statistics - Strong', value: 85 },
  { name: 'Geometry - Weak', value: 70 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PerformancePieChart = () => (
  <PieChart width={600} height={400}>
    <Pie
      data={data}
      cx={200}
      cy={150}
      labelLine={false}
      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
      outerRadius={120}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
);

export default PerformancePieChart;
