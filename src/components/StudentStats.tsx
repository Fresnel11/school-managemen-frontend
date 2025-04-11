import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { getStudentStats } from "../services/studentService";
import { ArrowUp, ArrowDown, Users, UserCheck, Archive, AlertTriangle, FileX, UserMinus } from "lucide-react";

interface StudentStatsData {
  totalStudents: number;
  activeStudents: number;
  archivedStudents: number;
  studentsThisYear: number;
  studentsLastYear: number;
  evolutionPercentage: number | null;
  boys: number;
  girls: number;
  genderDistribution: {
    boysPercent: number;
    girlsPercent: number;
  };
  missingDocs: number;
  missingDocsPercent: number;
  atRisk: number;
  atRiskPercent: number;
  noParents: number;
  noParentsPercent: number;
}

interface StudentStatsProps {
  refreshTrigger: number;
}

export function StudentStats({ refreshTrigger }: StudentStatsProps) {
  const [stats, setStats] = useState<StudentStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getStudentStats();
        setStats(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Erreur lors de la récupération des statistiques.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [refreshTrigger]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  if (loading) {
    return <p className="text-center text-gray-500">Chargement des statistiques...</p>;
  }

  if (error || !stats) {
    return <p className="text-center text-red-500">{error || "Aucune statistique disponible."}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Carte : Total des étudiants */}
      <motion.div
        custom={0}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="p-4 sm:p-6 bg-white/90 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gray-900 rounded-full">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">Total des étudiants</h3>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Carte : Étudiants actifs */}
      <motion.div
        custom={1}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="p-4 sm:p-6 bg-white/90 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gray-900 rounded-full">
              <UserCheck className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">Étudiants actifs</h3>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.activeStudents}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Carte : Étudiants archivés */}
      <motion.div
        custom={2}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="p-4 sm:p-6 bg-white/90 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gray-900 rounded-full">
              <Archive className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">Étudiants archivés</h3>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.archivedStudents}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Carte : Évolution des étudiants (avec flèche) */}
      <motion.div
        custom={3}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="p-4 sm:p-6 bg-white/90 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gray-900 rounded-full">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">Évolution des étudiants</h3>
              <div className="flex items-center gap-2">
                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                  {stats.evolutionPercentage !== null ? `${stats.evolutionPercentage}%` : "N/A"}
                </p>
                {stats.evolutionPercentage !== null && (
                  <span
                    className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${
                      stats.evolutionPercentage >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stats.evolutionPercentage >= 0 ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                    {Math.abs(stats.evolutionPercentage)}%
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">
                {stats.studentsThisYear} cette année vs {stats.studentsLastYear} l'année dernière
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Carte : Répartition par genre */}
      <motion.div
        custom={4}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="p-4 sm:p-6 bg-white/90 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gray-900 rounded-full">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">Répartition par genre</h3>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {stats.genderDistribution.boysPercent}% / {stats.genderDistribution.girlsPercent}%
              </p>
              <p className="text-xs text-gray-500">
                {stats.boys} garçons, {stats.girls} filles
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Carte : Documents manquants */}
      <motion.div
        custom={5}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="p-4 sm:p-6 bg-white/90 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gray-900 rounded-full">
              <FileX className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">Documents manquants</h3>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.missingDocs}</p>
              <p className="text-xs text-gray-500">{stats.missingDocsPercent}% des étudiants</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Carte : Étudiants à risque */}
      <motion.div
        custom={6}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="p-4 sm:p-6 bg-white/90 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gray-900 rounded-full">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">Étudiants à risque</h3>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.atRisk}</p>
              <p className="text-xs text-gray-500">{stats.atRiskPercent}% des étudiants</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Carte : Étudiants sans parents */}
      <motion.div
        custom={7}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="p-4 sm:p-6 bg-white/90 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gray-900 rounded-full">
              <UserMinus className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">Sans parents/tuteurs</h3>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.noParents}</p>
              <p className="text-xs text-gray-500">{stats.noParentsPercent}% des étudiants</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}