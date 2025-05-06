export default function StepIndicator({ currentStep, setStep }) {
  const steps = [
    "Contact",
    "Summary",
    "Education",
    "Experience",
    "Skills",
    "Projects",
    "Certificates",
    "Custom Fields",
    "Review",
  ];

  return (
    <div className="w-full px-4 py-6 bg-indigo-50 rounded-lg shadow">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex-1">
            <div className="flex items-center">
              <button
                onClick={() => setStep(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all
                  ${
                    currentStep === index
                      ? "bg-indigo-500 text-white"
                      : currentStep > index
                      ? "bg-teal-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
              >
                {index + 1}
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-all
                  ${currentStep > index ? "bg-teal-500" : "bg-gray-300"}`}
                ></div>
              )}
            </div>
            <p className="text-center text-xs mt-2 text-gray-600">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
