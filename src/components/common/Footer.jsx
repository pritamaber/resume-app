export default function Footer() {
  return (
    <footer className="py-4 bg-white">
      <div className="text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
      </div>
    </footer>
  );
}
