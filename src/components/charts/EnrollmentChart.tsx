import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', students: 1150 },
  { month: 'Feb', students: 1172 },
  { month: 'Mar', students: 1180 },
  { month: 'Apr', students: 1185 },
  { month: 'May', students: 1190 },
  { month: 'Jun', students: 1195 },
  { month: 'Jul', students: 1100 }, // Summer break
  { month: 'Aug', students: 1210 },
  { month: 'Sep', students: 1225 },
  { month: 'Oct', students: 1235 },
  { month: 'Nov', students: 1240 },
  { month: 'Dec', students: 1248 },
];

export function EnrollmentChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[1000, 1300]} />
          <Tooltip formatter={(value) => [`${value} students`, 'Enrollment']} />
          <Area 
            type="monotone" 
            dataKey="students" 
            stroke="#0ea5e9" 
            fill="#0ea5e9" 
            fillOpacity={0.2} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}