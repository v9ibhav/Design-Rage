function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-700/70 to-gray-800/40 hover:from-gray-700/90 hover:to-gray-800/60 transition-all duration-300 rounded-xl p-4 border border-gray-600 hover:border-gray-500 hover:shadow-md group">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-gray-300 font-medium group-hover:text-white transition-colors">{title}</h4>
        <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text group-hover:from-pink-300 group-hover:to-blue-300 transition-all duration-300">
        {value}
      </p>
    </div>
  );
