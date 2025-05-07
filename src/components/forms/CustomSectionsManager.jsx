import { Trash2, PlusCircle, Move, Plus } from "lucide-react";
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
        className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md"
      >
        <PlusCircle className="w-5 h-5" />
        <span>Add Custom Section</span>
      </button>

      {resumeData.customSections.map((section, sIdx) => (
        <div
          key={sIdx}
          className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 space-y-4 relative"
        >
          {/* Section controls */}
          <div className="absolute top-3 right-3 flex space-x-2">
            <button
              onClick={() => deleteCustomSection(sIdx)}
              className="text-red-500 hover:text-red-600"
              title="Remove section"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="text-gray-400 cursor-move" title="Drag to reorder">
              <Move className="w-5 h-5" />
            </div>
          </div>

          {/* Section Title */}
          <input
            type="text"
            value={section.title}
            onChange={(e) => handleTitleChange(sIdx, e.target.value)}
            className="w-full text-xl font-semibold border-b-2 border-gray-300 focus:border-blue-500 pb-1"
            placeholder="Section Title"
          />

          {/* Section Items */}
          <div className="space-y-2">
            {section.items.map((item, iIdx) => (
              <div key={iIdx} className="flex items-center space-x-2">
                <div
                  className="text-gray-400 cursor-move"
                  title="Drag to reorder"
                >
                  <Move className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(sIdx, iIdx, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-1 focus:border-blue-500"
                  placeholder={`Item ${iIdx + 1}`}
                />
                <button
                  onClick={() => removeItem(sIdx, iIdx)}
                  className="text-red-500 hover:text-red-600"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              onClick={() => addItem(sIdx)}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
