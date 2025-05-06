import { useState } from "react";
import { useResumeData } from "../../hooks/useResumeData";

export default function CustomSectionForm() {
  const { resumeData, setResumeData } = useResumeData();

  const [title, setTitle] = useState("");
  const [itemInput, setItemInput] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (itemInput.trim()) {
      setItems([...items, itemInput.trim()]);
      setItemInput("");
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleAddSection = () => {
    if (!title.trim() || items.length === 0) return;

    const newSection = {
      title: title.trim(),
      items,
    };

    setResumeData({
      ...resumeData,
      customSections: [...resumeData.customSections, newSection],
    });

    // reset local state
    setTitle("");
    setItems([]);
    setItemInput("");
  };

  return (
    <div className="border p-4 rounded shadow-sm space-y-4">
      <h2 className="text-lg font-semibold">➕ Add Custom Section</h2>

      <input
        type="text"
        placeholder="Section title (e.g. Awards, Languages)"
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Item (e.g. Fluent in Hindi)"
          className="flex-1 border p-2 rounded"
          value={itemInput}
          onChange={(e) => setItemInput(e.target.value)}
        />
        <button
          onClick={addItem}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul className="list-disc list-inside space-y-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center">
            {item}
            <button
              onClick={() => removeItem(idx)}
              className="text-red-500 text-sm"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleAddSection}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        ✅ Save Custom Section
      </button>
    </div>
  );
}
