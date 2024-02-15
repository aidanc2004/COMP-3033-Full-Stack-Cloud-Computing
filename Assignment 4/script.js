// Aidan Carey, COMP-3033 Assignment 4, Febuary 1 2024

function convertTemperature(temperature, temperatureType) {
    if (temperatureType == "Celcius") {
        return (temperature * 9/5) + 32;
    } else if (temperatureType == "Fahrenheit") {
        return (temperature - 32) * 5/9;
    }
}

console.log(convertTemperature(10, "Celcius"));
console.log(convertTemperature(65, "Fahrenheit"));

function overallGrade(assignments, midterm, finalProject, quizzes) {
    grade = 0;
    grade += assignments * 0.30;
    grade += midterm * 0.25;
    grade += finalProject * 0.30;
    grade += quizzes * 0.15; // Added the extra 5% to quizzes
    return grade;
}

console.log(overallGrade(60, 80, 50, 90));