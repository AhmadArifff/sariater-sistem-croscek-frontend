import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Loader } from 'lucide-react';
import api from '../utils/api';

export function TopLatecomersList({ filterType = 'today', startDate, endDate, month, limit = 10, department = null }) {
  const [latecomers, setLatecomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openEmployeeDetail = (latecomer) => {
    const employeeId = latecomer?.id;
    if (employeeId == null || employeeId === '') return;
    window.open(`/employee/${employeeId}`, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const fetchTopLatecomers = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams();
        params.append('limit', limit);
        params.append('filterType', filterType || 'today');
        
        if (filterType === 'range' && startDate && endDate) {
          params.append('startDate', startDate);
          params.append('endDate', endDate);
        } else if (filterType === 'month' && month) {
          params.append('month', month);
        }
        
        if (department) {
          params.append('department', department);
        }
        
        const response = await api.get(`/analytics/top-latecomers?${params.toString()}`);
        console.log('Top latecomers response:', response.data);
        setLatecomers(response.data.latecomers || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Gagal memuat data top latecomers');
        console.error('Top latecomers fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopLatecomers();
  }, [filterType, startDate, endDate, month, limit, department]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader className="w-6 h-6 text-indigo-600 animate-spin mr-2" />
        <p className="text-gray-600">Memuat data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <AlertCircle className="w-5 h-5" />
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  if (!latecomers || latecomers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Tidak ada data karyawan yang terlambat dalam periode ini</p>
        <p className="text-xs text-gray-400 mt-2">
          (Buka console browser: F12 → Console tab untuk melihat debug info)
        </p>
        <p className="text-xs text-gray-300 mt-1">
          Filter: {filterType}
          {filterType === 'range' && ` (${startDate} - ${endDate})`}
          {filterType === 'month' && ` (${month})`}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama Karyawan</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Departemen</th>
            <th className="text-center py-3 px-4 font-semibold text-gray-700">Jumlah Terlambat</th>
            <th className="text-center py-3 px-4 font-semibold text-gray-700">Total Hari Kerja</th>
            <th className="text-center py-3 px-4 font-semibold text-gray-700">Persentase</th>
          </tr>
        </thead>
        <tbody>
          {latecomers.map((latecomer, index) => (
            <tr 
              key={index}
              onClick={() => openEmployeeDetail(latecomer)}
              className={`border-b border-gray-100 hover:bg-indigo-50 transition ${
                latecomer?.id ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'
              } ${
                index < 3 ? 'bg-yellow-50' : ''
              }`}
            >
              <td className="py-3 px-4">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-sm ${
                  index === 0 ? 'bg-yellow-400 text-white' : 
                  index === 1 ? 'bg-gray-400 text-white' : 
                  index === 2 ? 'bg-orange-600 text-white' : 
                  'bg-gray-200 text-gray-700'
                }`}>
                  {index + 1}
                </span>
              </td>
              <td className="py-3 px-4 font-medium text-gray-900">
                {latecomer.name}
              </td>
              <td className="py-3 px-4 text-gray-600">
                {latecomer.department}
              </td>
              <td className="py-3 px-4 text-center">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  {latecomer.late_count}
                </span>
              </td>
              <td className="py-3 px-4 text-center text-gray-600">
                {latecomer.total_records}
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all" 
                      style={{ width: `${latecomer.late_percentage}%` }}
                    />
                  </div>
                  <span className="font-semibold text-red-600 w-10 text-right">
                    {latecomer.late_percentage}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
