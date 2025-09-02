import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const UserHome = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showBMICalculator, setShowBMICalculator] = useState(false);
  const [showTrainingPlan, setShowTrainingPlan] = useState(false);
  const [trainingPlan, setTrainingPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bmiResult, setBmiResult] = useState(null);
  const [gyms, setGyms] = useState([]);
  const [showGymsList, setShowGymsList] = useState(false);
  const [userData, setUserData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    goal: 'weight_loss',
    bodyPart: 'full_body',
    exerciseType: 'calisthenics',
    experience: 'beginner'
  });

  const handleLogout = () => {
    // Clear all authentication-related localStorage items
    localStorage.removeItem("gymName");
    localStorage.removeItem("gymPic");
    localStorage.removeItem("gymId");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");

    // Navigate to home page
    navigate("/");
    toast.success("Logged out successfully!");
  };

  const fetchGyms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth');
      if (response.data.success) {
        setGyms(response.data.data);
        setShowGymsList(true);
      } else {
        toast.error("Failed to fetch gyms");
      }
    } catch (error) {
      console.error("Error fetching gyms:", error);
      toast.error("Error fetching gyms");
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateBMI = () => {
    const { weight, height } = userData;
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmiResult(bmi);
    } else {
      toast.error("Please enter both weight and height");
    }
  };

  const generateTrainingPlan = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-training-plan', userData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTrainingPlan(response.data);
      setShowTrainingPlan(false);
      toast.success("Training plan generated successfully!");
    } catch (error) {
      console.error('Error generating training plan:', error);
      toast.error("Failed to generate training plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const gymBenefits = [
    {
      title: "Strength Training",
      description: "Build muscle mass and increase overall strength",
      icon: "💪",
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Cardiovascular Health",
      description: "Improve heart health and endurance",
      icon: "❤️",
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Flexibility",
      description: "Enhance mobility and prevent injuries",
      icon: "🧘",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Mental Health",
      description: "Reduce stress and boost mood",
      icon: "😊",
      color: "from-yellow-500 to-amber-500"
    }
  ];

  const workoutTips = [
    "Always warm up before exercising",
    "Stay hydrated throughout your workout",
    "Focus on proper form over heavy weights",
    "Get adequate rest between workouts",
    "Combine strength and cardio for best results",
    "Track your progress regularly"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div className="text-white max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-pulse">
              TRANSFORM YOUR LIFE
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Start your fitness journey today and achieve the body you've always wanted
            </p>
            <div className="space-x-4">
              <button
                onClick={() => setShowStartModal(true)}
                className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-110 shadow-2xl"
              >
                Start Your Journey
              </button>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <span className="text-2xl">🏋️</span>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose Our Fitness Community?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {gymBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${benefit.color} p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/90">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workout Tips Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Pro Workout Tips
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-white text-lg leading-relaxed">
                  {tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Start Journey Modal */}
      {showStartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome to Your Fitness Journey!</h2>
            <p className="text-gray-600 mb-6 text-center">
              You're now ready to start transforming your life. Explore our gym facilities and begin your fitness journey today!
            </p>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setShowStartModal(false);
                  setShowBMICalculator(true);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
              >
                Calculate BMI 📏
              </button>
              <button
                onClick={() => {
                  setShowStartModal(false);
                  setShowTrainingPlan(true);
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
              >
                Generate Training Plan 💪
              </button>
              <button
                onClick={() => {
                  setShowStartModal(false);
                  fetchGyms();
                }}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
              >
                Explore Gym Facilities 🏋️
              </button>
            </div>
            <button
              onClick={() => setShowStartModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Gyms List Modal */}
      {showGymsList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Registered Gyms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gyms.length === 0 && (
                <p className="text-center text-gray-600 col-span-full">No gyms registered yet.</p>
              )}
              {gyms.map((gym) => (
                <div key={gym._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
                  <img
                    src={gym.profilePic || "/default-gym.jpg"}
                    alt={gym.gymName}
                    className="w-full h-48 object-cover rounded-md mb-4"
                    onError={(e) => {
                      e.target.src = "/default-gym.jpg";
                    }}
                  />
                  <h3 className="text-xl font-semibold mb-2">{gym.gymName}</h3>
                  <p className="text-gray-700 mb-1"><strong>Description:</strong> {gym.description || "Vacant"}</p>
                  <p className="text-gray-700 mb-1"><strong>Functionality:</strong> {gym.functionality || "Vacant"}</p>
                  <p className="text-gray-700 mb-1"><strong>Contact Number:</strong> {gym.contactNumber || "Vacant"}</p>
                  <p className="text-gray-700 mb-1"><strong>Email:</strong> {gym.email || "Vacant"}</p>
                  <p className="text-gray-700"><strong>Address:</strong> {gym.address || "Vacant"}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowGymsList(false)}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-lg transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* BMI Calculator Modal */}
      {showBMICalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">BMI Calculator</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={userData.weight}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your weight"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={userData.height}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your height"
                />
              </div>
              <button
                onClick={calculateBMI}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                Calculate BMI
              </button>
              {bmiResult && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800">Your BMI: {bmiResult}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {bmiResult < 18.5 ? "Underweight" :
                     bmiResult < 25 ? "Normal weight" :
                     bmiResult < 30 ? "Overweight" : "Obese"}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowBMICalculator(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Training Plan Modal */}
      {showTrainingPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Personalized Training Plan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={userData.weight}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your weight"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={userData.height}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your height"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={userData.age}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Goal</label>
                <select
                  name="goal"
                  value={userData.goal}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="weight_loss">Weight Loss</option>
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="endurance">Endurance</option>
                  <option value="general_fitness">General Fitness</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Focus Area</label>
                <select
                  name="bodyPart"
                  value={userData.bodyPart}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="full_body">Full Body</option>
                  <option value="chest">Chest</option>
                  <option value="back">Back</option>
                  <option value="legs">Legs</option>
                  <option value="arms">Arms</option>
                  <option value="shoulders">Shoulders</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Type</label>
                <select
                  name="exerciseType"
                  value={userData.exerciseType}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="calisthenics">Calisthenics</option>
                  <option value="weight_training">Weight Training</option>
                  <option value="cardio">Cardio</option>
                  <option value="aesthetic">Aesthetic</option>
                  <option value="functional">Functional</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select
                  name="experience"
                  value={userData.experience}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <button
                onClick={generateTrainingPlan}
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {loading ? "Generating Plan..." : "Generate Training Plan"}
              </button>
            </div>
            <button
              onClick={() => setShowTrainingPlan(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Training Plan Display */}
      {trainingPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Personalized Training Plan</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Plan Details</h3>
                <div className="space-y-3">
                  <p><span className="font-medium">Duration:</span> {trainingPlan.duration}</p>
                  <p><span className="font-medium">Frequency:</span> {trainingPlan.frequency}</p>
                  <p><span className="font-medium">Intensity:</span> {trainingPlan.intensity}</p>
                  <p><span className="font-medium">Focus Area:</span> {trainingPlan.focus}</p>
                  <p><span className="font-medium">Goal:</span> {trainingPlan.goal.replace('_', ' ')}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Recommended Exercises</h3>
                <div className="space-y-4">
                  {trainingPlan.exercises.map((exercise, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-4">
                        <img
                          src={exercise.photoUrl}
                          alt={exercise.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{exercise.name}</h4>
                          <p className="text-sm text-gray-600">{exercise.description}</p>
                          <p className="text-sm text-blue-600 font-medium">{exercise.duration}</p>
                          <p className="text-xs text-gray-500">Type: {exercise.type.replace('_', ' ')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {trainingPlan.recommendations.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Recommendations</h3>
                <ul className="list-disc list-inside space-y-2">
                  {trainingPlan.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-600 text-lg">{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => setTrainingPlan(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of members who have already transformed their lives with our personalized fitness programs.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => setShowStartModal(true)}
              className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-110"
            >
              Start Your Transformation
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default UserHome;
