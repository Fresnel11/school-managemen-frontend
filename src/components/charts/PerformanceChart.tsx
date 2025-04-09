import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Données (inchangées)
const data = [
  { subject: 'Math', average: 78, highest: 98, lowest: 45 },
  { subject: 'Science', average: 82, highest: 100, lowest: 55 },
  { subject: 'English', average: 85, highest: 97, lowest: 60 },
  { subject: 'History', average: 79, highest: 95, lowest: 50 },
  { subject: 'Art', average: 88, highest: 100, lowest: 65 },
  { subject: 'PE', average: 92, highest: 100, lowest: 70 },
];

// Personnalisation du Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-800">{`Subject: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm text-gray-600">
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function PerformanceChart() {
  return (
    <div className="w-full h-[350px] bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" opacity={0.5} />
          <XAxis
            dataKey="subject"
            tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Inter, sans-serif' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Inter, sans-serif' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: 10,
              fontSize: 12,
              fontFamily: 'Inter, sans-serif',
              color: '#6b7280',
            }}
            iconType="circle"
            iconSize={10}
          />
          <Bar
            dataKey="average"
            fill="#60a5fa" // Bleu doux
            name="Average Grade"
            radius={[4, 4, 0, 0]}
            animationDuration={800}
          />
          <Bar
            dataKey="highest"
            fill="#34d399" // Vert apaisant
            name="Highest Grade"
            radius={[4, 4, 0, 0]}
            animationDuration={800}
          />
          <Bar
            dataKey="lowest"
            fill="#f87171" // Rouge atténué
            name="Lowest Grade"
            radius={[4, 4, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}