import { BarChart3, Download, Filter } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Báo Cáo Thống Kê
          </h1>
          <p className="text-gray-500 mt-1">
            Phân tích chuyên sâu kết quả học tập của học sinh.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <Filter className="h-4 w-4" /> Lọc
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Download className="h-4 w-4" /> Xuất File
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 lg:p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Phổ Điểm Môn Toán
        </h2>

        <div className="relative h-96 w-full rounded-xl border-2 border-dashed border-gray-200 bg-blue-50/30 flex flex-col items-center justify-center group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="z-10 flex flex-col items-center text-center p-6">
            <div className="h-16 w-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">
              Đang Thu Thập Dữ Liệu
            </h3>
            <p className="text-gray-500 mt-2 max-w-sm">
              Biểu đồ sẽ hiển thị tại đây khi hệ thống có đủ dữ liệu từ các bài
              thi gần nhất.
            </p>
            <button className="mt-6 px-6 py-2 bg-white border border-gray-200 shadow-sm rounded-full text-blue-600 font-medium hover:text-blue-700 hover:border-blue-300 transition-colors">
              Làm mới dữ liệu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
