// src/hooks/useAiEnhancer.js

export const useAiEnhancer = () => {
  const enhance = async ({ type, input, context }) => {
    try {
      const res = await fetch("/api/ai-enhancer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, input, context }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "AI Enhancement failed");
      }

      return data.output;
    } catch (err) {
      console.error("AI Error:", err.message);
      return null;
    }
  };

  return { enhance };
};
