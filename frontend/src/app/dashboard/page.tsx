import { Users, GraduationCap, Clock } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      name: "Tổng Học Sinh",
      value: "1,248",
      icon: Users,
      change: "+12%",
      trend: "up"
    },
    {
      name: "Điểm Trung Bình",
      value: "7.8",
      icon: GraduationCap,
      change: "+0.4",
      trend: "up"
    },
    {
      name: "Kỳ Thi Gần Nhất",
      value: "Giữa Kỳ 1",
      icon: Clock,
      change: "2 tuần trước",
      trend: "neutral"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-1">Chào mừng quay trở lại G-Scores.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {stat.change}
                </span>
                {stat.trend === 'up' && <span className="text-gray-400 text-sm ml-2">so với tháng trước</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h2>
        <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
          <p className="text-gray-400 text-sm">Chưa có hoạt động mới nào.</p>
        </div>
      </div>
    </div>
  );
}
