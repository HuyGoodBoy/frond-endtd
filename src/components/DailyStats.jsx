import { useState, useEffect } from 'react';

const DailyStats = ({ type = "all" }) => {
  const [stats, setStats] = useState({ cv_count: 0, company_count: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://cv.tdconsulting.vn/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err.message);
      }
    };

    // Fetch stats immediately
    fetchStats();

    // Set up interval to fetch stats every minute
    const interval = setInterval(fetchStats, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  if (type === "cv") {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 border border-pink-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">CV Đã Phân Tích</h3>
            <p className="text-sm text-gray-500">Hôm nay</p>
          </div>
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold text-pink-600">{stats.cv_count}</span>
          <span className="text-gray-500 text-lg ml-2">CV</span>
        </div>
      </div>
    );
  }

  if (type === "company") {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">JD Đã Phân Tích</h3>
            <p className="text-sm text-gray-500">Hôm nay</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold text-blue-600">{stats.company_count}</span>
          <span className="text-gray-500 text-lg ml-2">DN</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl shadow-sm p-4 border border-pink-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">CV Đã Phân Tích</h3>
            <p className="text-sm text-gray-500">Hôm nay</p>
          </div>
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold text-pink-600">{stats.cv_count}</span>
          <span className="text-gray-500 text-lg ml-2">CV</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">JD Đã Phân Tích</h3>
            <p className="text-sm text-gray-500">Hôm nay</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold text-blue-600">{stats.company_count}</span>
          <span className="text-gray-500 text-lg ml-2">DN</span>
        </div>
      </div>
    </div>
  );
};

export default DailyStats; 