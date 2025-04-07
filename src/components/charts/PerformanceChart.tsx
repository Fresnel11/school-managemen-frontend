import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { subject: 'Math', average: 78, highest: 98, lowest: 45 },
  { subject: 'Science', average: 82, highest: 100, lowest: 55 },
  { subject: 'English', average: 85, highest: 97, lowest: 60 },
  { subject: 'History', average: 79, highest: 95, lowest: 50 },
  { subject: 'Art', average: 88, highest: 100, lowest: 65 },
  { subject: 'PE', average: 92, highest: 100, lowest: 70 },
];

export function PerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="average" fill="#3b82f6" name="Average Grade" />
          <Bar dataKey="highest" fill="#10b981" name="Highest Grade" />
          <Bar dataKey="lowest" fill="#ef4444" name="Lowest Grade" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}