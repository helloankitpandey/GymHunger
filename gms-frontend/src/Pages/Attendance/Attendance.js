import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({});
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [workoutInput, setWorkoutInput] = useState("");
  const [attended, setAttended] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("gymName");
    localStorage.removeItem("gymPic");
    localStorage.removeItem("gymId");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/");
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    // Load attendance data from localStorage
    const savedData = localStorage.getItem("attendanceData");
    if (savedData) {
      setAttendanceData(JSON.parse(savedData));
    }
  }, []);

  const saveAttendanceData = (data) => {
    localStorage.setItem("attendanceData", JSON.stringify(data));
    setAttendanceData(data);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getAttendanceForDate = (day) => {
    if (!day) return null;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateKey = formatDateKey(date);
    return attendanceData[dateKey] || null;
  };

  const handleDateClick = (day) => {
    if (!day) return;
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    const clickedDateOnly = new Date(clickedDate);
    clickedDateOnly.setHours(0, 0, 0, 0);

    // Check if the date is editable (today or future)
    const isEditableDate = clickedDateOnly <= today;
    setIsEditable(isEditableDate);

    const dateKey = formatDateKey(clickedDate);
    const existingAttendance = attendanceData[dateKey];

    setSelectedDate(clickedDate);
    if (existingAttendance) {
      setAttended(existingAttendance.attended);
      setWorkoutInput(existingAttendance.workout || "");
    } else {
      setAttended(false);
      setWorkoutInput("");
    }
    setShowAttendanceModal(true);
  };

  const handleAttendanceSubmit = () => {
    const dateKey = formatDateKey(selectedDate);
    const newAttendanceData = {
      ...attendanceData,
      [dateKey]: {
        attended,
        workout: attended ? workoutInput : "",
        date: selectedDate.toISOString()
      }
    };

    saveAttendanceData(newAttendanceData);
    setShowAttendanceModal(false);
    toast.success(attended ? "Attendance marked successfully!" : "Absence recorded!");
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getRecentWorkouts = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const recentWorkouts = [];

    // Get all attendance records
    Object.entries(attendanceData).forEach(([dateKey, data]) => {
      if (data.attended && data.workout && data.workout.trim() !== "") {
        const workoutDate = new Date(data.date);
        if (workoutDate >= sevenDaysAgo && workoutDate <= today) {
          recentWorkouts.push({
            date: data.date,
            workout: data.workout,
            dateKey: dateKey
          });
        }
      }
    });

    // Sort by date (most recent first)
    recentWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date));

    return recentWorkouts;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar onLogout={handleLogout} />

      <div className="pt-28 pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Gym Attendance Tracker</h1>
            <p className="text-lg text-gray-600 mb-4">Track your gym visits and workouts</p>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to reset all attendance data? This action cannot be undone.")) {
                  saveAttendanceData({});
                  toast.success("All attendance data has been reset!");
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Reset All Data
            </button>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateMonth(-1)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                aria-label="Previous month"
              >
                <span className="sm:hidden text-xl">←</span>
                <span className="hidden sm:inline">← Previous</span>
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                <span className="sm:hidden">
                  {monthNames[currentDate.getMonth()].substring(0, 3)} {currentDate.getFullYear()}
                </span>
                <span className="hidden sm:inline">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
              </h2>
              <button
                onClick={() => navigateMonth(1)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                aria-label="Next month"
              >
                <span className="sm:hidden text-xl">→</span>
                <span className="hidden sm:inline">Next →</span>
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {getDaysInMonth(currentDate).map((day, index) => {
                const attendance = getAttendanceForDate(day);
                const isToday = day === new Date().getDate() &&
                               currentDate.getMonth() === new Date().getMonth() &&
                               currentDate.getFullYear() === new Date().getFullYear();

                return (
                  <div
                    key={index}
                    onClick={() => handleDateClick(day)}
                    className={`
                      h-16 border rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center text-lg font-medium
                      ${!day ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-blue-50 hover:border-blue-300'}
                      ${isToday ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
                      ${attendance?.attended ? 'bg-green-100 border-green-300' : ''}
                      ${attendance && !attendance.attended ? 'bg-red-100 border-red-300' : ''}
                    `}
                  >
                    {day && (
                      <div className="text-center">
                        <div>{day}</div>
                        {attendance && (
                          <div className="text-xs mt-1">
                            {attendance.attended ? '✅' : '❌'}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Attendance Statistics */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Object.values(attendanceData).filter(item => item.attended).length}
              </div>
              <div className="text-gray-600">Days Attended</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {Object.values(attendanceData).filter(item => !item.attended).length}
              </div>
              <div className="text-gray-600">Days Missed</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Object.keys(attendanceData).length}
              </div>
              <div className="text-gray-600">Total Records</div>
            </div>
          </div>

          {/* Recent Workouts (Last 7 Days) */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Workouts (Last 7 Days)</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              {getRecentWorkouts().length > 0 ? (
                <div className="space-y-4">
                  {getRecentWorkouts().map((workout, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {new Date(workout.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </h3>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          ✅ Attended
                        </span>
                      </div>
                      <div className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                        <p className="whitespace-pre-wrap">{workout.workout}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🏋️</div>
                  <p className="text-gray-500 text-lg">No recent workouts logged</p>
                  <p className="text-gray-400 text-sm mt-2">Start marking your attendance to see your workout history here!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Modal */}
      {showAttendanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {selectedDate.toDateString()}
            </h2>

            {!isEditable && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <div className="text-yellow-600 text-sm font-medium">
                    📅 This date has passed. You cannot modify attendance records for past dates.
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Did you attend the gym?
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => isEditable && setAttended(true)}
                    disabled={!isEditable}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                      attended ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } ${!isEditable ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    ✅ Yes
                  </button>
                  <button
                    onClick={() => isEditable && setAttended(false)}
                    disabled={!isEditable}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                      !attended ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } ${!isEditable ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    ❌ No
                  </button>
                </div>
              </div>

              {attended && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What workout did you do?
                  </label>
                  <textarea
                    value={workoutInput}
                    onChange={(e) => isEditable && setWorkoutInput(e.target.value)}
                    disabled={!isEditable}
                    className={`w-full p-4 border-2 border-gray-200 rounded-xl resize-none ${
                      isEditable
                        ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        : 'bg-gray-50 cursor-not-allowed opacity-75'
                    }`}
                    rows="4"
                    placeholder="Describe your workout (e.g., Chest day: Bench press, Push-ups, Chest fly...)"
                  />
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={isEditable ? handleAttendanceSubmit : () => setShowAttendanceModal(false)}
                  disabled={!isEditable}
                  className={`flex-1 py-3 rounded-xl font-bold text-lg transition-colors ${
                    isEditable
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-400 text-white cursor-not-allowed'
                  }`}
                >
                  {isEditable ? 'Save' : 'Close'}
                </button>
                <button
                  onClick={() => setShowAttendanceModal(false)}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Attendance;
