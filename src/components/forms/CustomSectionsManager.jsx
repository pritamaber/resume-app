import { useResumeData } from "../../hooks/useResumeData";

export default function CustomSectionsManager() {
  const {
    resumeData,
    addCustomSection,
    updateCustomSection,
    deleteCustomSection,
  } = useResumeData();

  const handleTitleChange = (sectionIndex, value) => {
    const updated = [...resumeData.customSections];
    updated[sectionIndex].title = value;
    updateCustomSection(sectionIndex, updated[sectionIndex]);
  };

  const handleItemChange = (sectionIndex, itemIndex, value) => {
    const updated = [...resumeData.customSections];
    updated[sectionIndex].items[itemIndex] = value;
    updateCustomSection(sectionIndex, updated[sectionIndex]);
  };

  const addItem = (sectionIndex) => {
    const updated = [...resumeData.customSections];
    updated[sectionIndex].items.push("");
    updateCustomSection(sectionIndex, updated[sectionIndex]);
  };

  const removeItem = (sectionIndex, itemIndex) => {
    const updated = [...resumeData.customSections];
    updated[sectionIndex].items.splice(itemIndex, 1);
    updateCustomSection(sectionIndex, updated[sectionIndex]);
  };

  const addNewSection = () => {
    addCustomSection({ title: "New Section", items: [""] });
  };

  return (
    <div className="space-y-6">
      <button
        onClick={addNewSection}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Add Custom Section
      </button>

      {resumeData.customSections.map((section, sIdx) => (
        <div key={sIdx} className="border p-4 rounded shadow space-y-2">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={section.title}
              onChange={(e) => handleTitleChange(sIdx, e.target.value)}
              className="w-full text-lg font-semibold border-b pb-1"
              placeholder="Section Title"
            />
            <button
              onClick={() => deleteCustomSection(sIdx)}
              className="text-red-600 text-sm ml-4"
            >
              ❌ Remove Section
            </button>
          </div>

          {section.items.map((item, iIdx) => (
            <div key={iIdx} className="flex gap-2 items-center">
              <input
                type="text"
                value={item}
                onChange={(e) => handleItemChange(sIdx, iIdx, e.target.value)}
                className="w-full border p-1 rounded"
                placeholder={`Item ${iIdx + 1}`}
              />
              <button
                onClick={() => removeItem(sIdx, iIdx)}
                className="text-red-600"
              >
                ❌
              </button>
            </div>
          ))}

          <button
            onClick={() => addItem(sIdx)}
            className="text-blue-600 text-sm"
          >
            ➕ Add Item
          </button>
        </div>
      ))}
    </div>
  );
}
