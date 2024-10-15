import React, { useState } from "react";

function App() {
  const [creditType, setCreditType] = useState(""); // State to manage selected credit type
  const [subjects, setSubjects] = useState({ 4: [], 3: [], 2: [] }); // Combined subjects into a single object
  const [cgpa, setCgpa] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission
  const [isCgpaCalculated, setIsCgpaCalculated] = useState(false); // State to track CGPA calculation

  const gradeToPoints = {
    O: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    P: 5,
    F: 0,
  };

  const addSubject = () => {
    setSubjects((prevSubjects) => ({
      ...prevSubjects,
      [creditType]: [...prevSubjects[creditType], { grade: "" }],
    }));
    setIsCgpaCalculated(false); // Reset CGPA calculation state when a new subject is added
  };

  const handleGradeChange = (e, index) => {
    const newSubjects = [...subjects[creditType]];
    newSubjects[index].grade = e.target.value;
    setSubjects((prevSubjects) => ({
      ...prevSubjects,
      [creditType]: newSubjects,
    }));
    setIsCgpaCalculated(false); // Reset CGPA calculation state on grade change
  };

  const deleteSubject = (index) => {
    const updatedSubjects = subjects[creditType].filter((_, i) => i !== index);
    setSubjects((prevSubjects) => ({
      ...prevSubjects,
      [creditType]: updatedSubjects,
    }));
    setIsCgpaCalculated(false); // Reset CGPA calculation state on subject deletion
  };

  const calculateCgpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    Object.keys(subjects).forEach((credit) => {
      subjects[credit].forEach((sub) => {
        if (sub.grade) {
          totalPoints += gradeToPoints[sub.grade] * credit;
          totalCredits += parseInt(credit);
        }
      });
    });

    if (totalCredits === 0) return setCgpa(0);
    setCgpa((totalPoints / totalCredits).toFixed(2));
    setIsCgpaCalculated(true); // Mark CGPA as calculated
  };

  const handleSubmit = () => {
    // Check if all subjects have grades before submitting
    const allGradesSelected = subjects[creditType].every(
      (subject) => subject.grade !== ""
    );

    if (!allGradesSelected) {
      alert("Please select a grade for all subjects before submitting."); // Alert user if grades are missing
      return;
    }

    setIsSubmitted(true); // Mark as submitted
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">CGPA Calculator</h1>

        {/* Credit Type Selection */}
        <div className="mb-4">
          <label className="mr-2">Select Credit Type:</label>
          <select
            value={creditType}
            onChange={(e) => {
              setCreditType(e.target.value);
              setIsSubmitted(false); // Reset submission state when credit type changes
            }}
            className="border rounded p-2"
          >
            <option value="">Select Credit</option>
            <option value="4">4-Credit</option>
            <option value="3">3-Credit</option>
            <option value="2">2-Credit</option>
          </select>
        </div>

        {/* Subject Input for Selected Credit Type */}
        {creditType && !isSubmitted && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {creditType}-Credit Subjects
            </h2>
            {subjects[creditType].map((subject, index) => (
              <div key={index} className="mb-4 flex items-center">
                <label className="w-20">Grade:</label>
                <select
                  value={subject.grade}
                  onChange={(e) => handleGradeChange(e, index)}
                  className="border rounded p-2 w-full"
                >
                  <option value="">Select Grade</option>
                  <option value="O">O</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="P">P</option>
                  <option value="F">F</option>
                </select>
                <button
                  onClick={() => deleteSubject(index)}
                  className="bg-red-500 text-white px-3 py-1 ml-3 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              onClick={addSubject}
              className="bg-blue-500 text-white px-4 py-1 rounded mb-6"
            >
              Add {creditType}-Credit Subject
            </button>

            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white ml-4 px-6 py-1 rounded"
            >
              Submit {creditType}-Credit Subjects
            </button>
          </>
        )}

        {/* After Submission Options */}
        {isSubmitted && (
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold">
              Choose the credit option to add more subjects!
            </h3>
            <button
              onClick={() => setCreditType("")}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Add More Subjects
            </button>
            <button
              onClick={calculateCgpa}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2 ml-4"
            >
              Calculate CGPA
            </button>
          </div>
        )}

        {/* Display CGPA */}
        {isCgpaCalculated && cgpa !== null && (
          <h3 className="text-2xl font-bold mt-6 text-center">
            Your CGPA is: {cgpa}
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
