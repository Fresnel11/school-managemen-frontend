import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PerformanceChart } from "./charts/PerformanceChart";
import { AttendanceChart } from "./charts/AttendanceChart";
import { EnrollmentChart } from "./charts/EnrollmentChart";
import { RecentActivity } from "./RecentActivity";
import { Users, GraduationCap, UserRound, CalendarDays } from "lucide-react";
import { getAllStudents } from "@/services/studentService";
import { getAllParents } from "@/services/parentServices";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [parents, setParents] = useState<any[]>([]);

  

   useEffect(() => {
      const fetchData = async () => {
        try {
          const students = await getAllStudents();
          console.log("Fetched students:", students);
          setStudents(students);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data. Please try again later.");
          setLoading(false);
        }
      };
  
      fetchData();

      const fetchParents = async () => {
        try {
          const parents = await getAllParents();
          setParents(parents);
        }
        catch (err) {
          console.error("Error fetching parents:", err);
        }
      };
      fetchParents(); 
    }, []);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your school's performance and statistics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
          {loading ? (
              <div className="text-lg">Loading...</div>  // Affiche "Loading..." pendant le chargement
            ) : error ? (
              <div className="text-red-500">{error}</div>  // Affiche l'erreur si elle existe
            ) : (
              <div className="text-2xl font-bold">{students.length}</div>  // Affiche le nombre total d'étudiants
            )}
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <UserRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground">
              +2 new this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Parents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
          {loading ? (
              <div className="text-lg">Loading...</div>  // Affiche "Loading..." pendant le chargement
            ) : error ? (
              <div className="text-red-500">{error}</div>  // Affiche l'erreur si elle existe
            ) : (
              <div className="text-2xl font-bold">{parents.length}</div>  // Affiche le nombre total d'étudiants
            )}
            <p className="text-xs text-muted-foreground">
              +18 new this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              +1.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Student Performance</CardTitle>
            <CardDescription>
              Average grades by subject for the current semester
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceChart />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>
              Daily attendance rates for the past 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
            <CardDescription>
              Student enrollment over the past 12 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EnrollmentChart />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}