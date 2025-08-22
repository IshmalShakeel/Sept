import React, { useState, useEffect } from "react";
import Topbar from "../../components/Topbar/Topbar";
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, Plus } from "lucide-react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 14));
  const [selectedDate, setSelectedDate] = useState(14);
  const [view, setView] = useState("Monthly");
  const [searchQuery, setSearchQuery] = useState("");

  const events: Record<number, string[]> = {
    10: ["Team Meeting"],
    18: ["Client Meeting"],
    20: ["Project Review"],
    22: ["Event Planning"],
    25: ["Birthday Party"],
  };

  const monthNames = [
    "JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE",
    "JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"
  ];

  const dayNames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;
    const days = [];
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();

    for (let i = adjustedStartDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, isCurrentMonth: true });
    }
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({ day, isCurrentMonth: false });
    }
    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  // Update currentDate if searchQuery is a valid month/year
  // useEffect(() => {
  //   const query = searchQuery.trim().toUpperCase(); // e.g., "MARCH 2021"
  //   const parts = query.split(" ");
  //   if (parts.length === 2) {
  //     const monthIndex = monthNames.indexOf(parts[0]);
  //     const year = parseInt(parts[1]);
  //     if (monthIndex !== -1 && !isNaN(year)) {
  //       setCurrentDate(prev => new Date(year, monthIndex, 1));
  //     }
  //   }
  // }, [searchQuery]);
  useEffect(() => {  //checking that it works it will show any date or yea
  const query = searchQuery.trim().toUpperCase();
  if (!query) return;

  // Map short and full month names to month index
  const monthMap: Record<string, number> = {};
  monthNames.forEach((name, index) => {
    monthMap[name] = index; // Full name
    monthMap[name.slice(0, 3)] = index; // Short name, e.g., JAN
  });

  const parts = query.split(" ");

  let monthIndex: number | null = null;
  let year: number | null = null;

  parts.forEach((part) => {
    if (monthMap[part] !== undefined) monthIndex = monthMap[part];
    const num = parseInt(part);
    if (!isNaN(num) && num > 0) {
      year = num < 100 ? 2000 + num : num; // Convert 2-digit year to 2000s
    }
  });

  if (monthIndex !== null && year !== null) {
    setCurrentDate(new Date(year, monthIndex, 1));
  }
}, [searchQuery]);


  const filterEvents = (day: number) => {
    if (!events[day]) return [];
    if (!searchQuery.trim()) return events[day];

    const query = searchQuery.toLowerCase();
    if (day.toString() === query) return events[day];
    return events[day].filter(event => event.toLowerCase().includes(query));
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-900 flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Manage Calendar</h1>
          <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition cursor-pointer">
            <Plus size={19} />
            Add Event
          </button>
        </div>

        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by date, type, or event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-black-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-black-600 transition">
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigateMonth(-1)} className="p-2 rounded-lg hover:bg-gray-200">
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-xl font-medium">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button onClick={() => navigateMonth(1)} className="p-2 rounded-lg hover:bg-gray-200">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
            {view}
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-7 border-b border-gray-300">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-sm font-semibold bg-gray-100 text-gray-600 text-center">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {days.map((dateObj, index) => {
              const filtered = dateObj.isCurrentMonth ? filterEvents(dateObj.day) : [];
              const isSelected = dateObj.day === selectedDate && dateObj.isCurrentMonth;

              return (
                <div
                  key={index}
                  onClick={() => dateObj.isCurrentMonth && setSelectedDate(dateObj.day)}
                  className={`h-16 border border-gray-200 p-1 cursor-pointer transition 
                    ${!dateObj.isCurrentMonth ? "bg-gray-50 text-gray-400" : "bg-white hover:bg-blue-50"}
                    ${isSelected ? "ring-2 ring-blue-500" : ""}`}
                >
                  <div className="text-sm font-medium mb-1">{dateObj.day}</div>
                  {filtered.length > 0 && (
                    <div className="space-y-1">
                      {filtered.map((event, eventIndex) => (
                        <div key={eventIndex} className="text-xs bg-blue-100 text-blue-700 px-1 py-0.5 rounded truncate">{event}</div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
