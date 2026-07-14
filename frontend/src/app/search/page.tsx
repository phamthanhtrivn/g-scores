import { Search, SearchX } from "lucide-react";

export default function SearchScores() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Tìm Kiếm Điểm Số</h1>
        <p className="text-gray-500 mt-1">Tra cứu điểm thi của học sinh một cách nhanh chóng.</p>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8 max-w-3xl mx-auto mt-10">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <Search className="h-8 w-8" />
          </div>
          
          <div className="w-full relative max-w-xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <Search className="h-5 w-5" />
            </div>
            <input 
              type="text" 
              placeholder="Nhập Mã học sinh (VD: HS001)..." 
              className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm focus:bg-white text-lg"
            />
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center">
            Tra cứu
          </button>
        </div>
      </div>
      
      {/* State khi không có kết quả */}
      <div className="flex flex-col items-center justify-center py-12 text-center opacity-0">
        <SearchX className="h-12 w-12 text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg">Vui lòng nhập thông tin để tìm kiếm</p>
      </div>
    </div>
  );
}
