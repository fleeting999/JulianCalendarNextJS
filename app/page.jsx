'use client';
import React, { useState } from "react";
import { format, isToday, isBefore, subDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from "date-fns";

const getJulianDate = (date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000));
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${date.getFullYear().toString().slice(2)}${day.toString().padStart(3, '0')}`;
};

const generateCalendar = (year, month) => {
  const startDate = startOfWeek(startOfMonth(new Date(year, month)), { weekStartsOn: 1 });
  const endDate = endOfWeek(endOfMonth(new Date(year, month)), { weekStartsOn: 1 });
  const days = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return days;
};

const JulianCalendar = () => {
  const [currentDate, setCurrentDate] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return new Date();
    }
    return new Date();
  });

  const monthDays = generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
  const currentMonth = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#343541] to-[#1f1f1f] text-white p-3 sm:p-4">
      <div className="flex justify-center items-center gap-8 mb-4">
        <button onClick={handlePrevMonth} className="text-2xl px-2">←</button>
        <h2 className="text-xs font-bold">{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={handleNextMonth} className="text-2xl px-2">→</button>
      </div>

      <div className="text-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
        {monthDays.map((day, index) => {
          const isCurrent = isToday(day);
          const isPast = isBefore(day, new Date());
          const isThisMonth = day.getMonth() === currentMonth;

          if (!isThisMonth) {
            return <div key={index} className="p-4" />;
          }

          const cardStyle = isCurrent
            ? "bg-red-700 ring-2 ring-white ring-offset-2"
            : isPast
            ? "bg-[#3b3b3b] border border-gray-600"
            : "bg-[#4a4a5a]";

          const julian180 = getJulianDate(subDays(day, 180));
          const julian270 = getJulianDate(subDays(day, 270));
          const date180 = format(subDays(day, 180), "dd MMM yy").toUpperCase();
          const date270 = format(subDays(day, 270), "dd MMM yy").toUpperCase();

          return (
            <div
              key={index}
              className={`rounded-2xl ${cardStyle} p-2 gap-1 flex flex-col justify-between items-center aspect-square w-full shadow-md hover:shadow-lg transition hover:scale-[0.98] active:scale-95 duration-200`}
            >
              <div className="flex justify-between w-full text-xs text-gray-100 items-start mb-1">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold mb-1">180</span>
                  <span className="text-sm">{julian180}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold mb-1">270</span>
                  <span className="text-sm">{julian270}</span>
                </div>
              </div>
              <div className="text-sm text-gray-200 mb-1">{format(day, "EEE")}</div>
              <div className="text-sm font-bold text-white mb-1">{format(day, "d")}</div>
              <div className="text-sm text-gray-200 mb-2">{getJulianDate(day)}</div>
              <div className="flex justify-between w-full text-sm text-gray-100 mt-1">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold mb-1">180</span>
                  <span className="text-sm">{date180}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold mb-1">270</span>
                  <span className="text-sm">{date270}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JulianCalendar;