exports.calculateBMI = (weight, height) => {
  const h = height / 100;
  return weight / (h * h);
};

exports.getBMICategory = (bmi) => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

exports.recommendWorkout = (bmiCategory, equipment) => {
  if (bmiCategory === "Overweight" || bmiCategory === "Obese") {
    return ["Kardio", "Perut"];
  }
  if (equipment === "No Equipment") {
    return ["Push Up", "Squat", "Plank"];
  }
  return ["Chest Press", "Deadlift", "Shoulder Press"];
};