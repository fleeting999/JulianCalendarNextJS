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
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthDays = generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
  const currentMonth = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div className="min-h-screen bg-[#343541] text-white p-4">
      <div className="flex justify-center items-center gap-8 mb-4">
        <button onClick={handlePrevMonth} className="text-2xl px-2">←</button>
        <h2 className="text-xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={handleNextMonth} className="text-2xl px-2">→</button>
      </div>

      <div className="text-center grid grid-cols-3 sm:grid-cols-3 md:grid-cols-7 gap-4">
        {monthDays.map((day, index) => {
          const isCurrent = isToday(day);
          const isPast = isBefore(day, new Date());
          const isThisMonth = day.getMonth() === currentMonth;

          if (!isThisMonth) {
            return <div key={index} className="p-4" />;
          }

          const cardStyle = isCurrent
            ? "bg-red-700"
            : isPast
            ? "bg-[#1f2022] border border-gray-600 shadow-inner"
            : "bg-[#444654]";

          const julian180 = getJulianDate(subDays(day, 180));
          const julian270 = getJulianDate(subDays(day, 270));
          const date180 = format(subDays(day, 180), "dd MMM yy").toUpperCase();
          const date270 = format(subDays(day, 270), "dd MMM yy").toUpperCase();

          return (
            <div
              key={index}
              className={`rounded-2xl ${cardStyle} p-4 flex flex-col justify-center items-center h-full`}
            >
              <div className="flex justify-between w-full text-base text-gray-100 items-start mb-2">
                <div className="flex flex-col items-start">
                  <span className="text-base font-semibold mb-1">180</span>
                  <span className="text-base">{julian180}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-base font-semibold mb-1">270</span>
                  <span className="text-base">{julian270}</span>
                </div>
              </div>
              <div className="text-base text-gray-200 mb-1">{format(day, "EEE")}</div>
              <div className="text-xl font-extrabold text-white mb-1">{format(day, "d")}</div>
              <div className="text-base text-gray-200 mb-2">{getJulianDate(day)}</div>
              <div className="flex justify-between w-full text-base text-gray-100 mt-2">
                <div className="flex flex-col items-start">
                  <span className="text-base font-semibold mb-1">180</span>
                  <span className="text-base">{date180}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-base font-semibold mb-1">270</span>
                  <span className="text-base">{date270}</span>
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
