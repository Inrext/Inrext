import React from "react";

type InterestModalProps = {
  show: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  submitted: boolean;
  form: { name: string; phone: string; email: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; phone: string; email: string }>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const InterestModal: React.FC<InterestModalProps> = ({ show, onClose, isDarkMode, submitted, form, setForm, onSubmit }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center mt-20 items-start backdrop-blur-md bg-opacity-40">
      <div className={`mt-10 rounded-2xl shadow-2xl p-8 w-[90vw] max-w-md relative border-2 transition-colors duration-300 ${isDarkMode ? "bg-black text-white border-blue-900" : "bg-white text-black border-blue-200"}`}>
        <button className={`absolute top-4 right-6 text-1xl font-bold transition-colors duration-200 ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-700"}`} onClick={onClose} aria-label="Close">×</button>
        <h2 className={`text-2xl font-bold mb-6 text-center transition-colors duration-200 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}>Show Interest</h2>
        {submitted ? (
          <div className="text-green-600 font-semibold py-16 text-center text-lg">Thank you for your interest!</div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className={`font-semibold text-base transition-colors duration-200 ${isDarkMode ? "text-white" : "text-black"}`}>Name:</label>
              <input id="name" type="text" placeholder="Enter your name" className={`rounded-lg px-4 py-2 text-lg focus:outline-none transition-colors duration-200 ${isDarkMode ? "bg-gray-800 border-blue-900 text-white placeholder-gray-400 focus:border-blue-400" : "bg-white border-blue-200 text-black placeholder-gray-500 focus:border-blue-500"} border-2`} required value={form.name} onChange={e => setForm((f: { name: string; phone: string; email: string }) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className={`font-semibold text-base transition-colors duration-200 ${isDarkMode ? "text-white" : "text-black"}`}>Phone Number:</label>
              <input id="phone" type="tel" placeholder="Enter your phone number" className={`rounded-lg px-4 py-2 text-lg focus:outline-none transition-colors duration-200 ${isDarkMode ? "bg-gray-800 border-blue-900 text-white placeholder-gray-400 focus:border-blue-400" : "bg-white border-blue-200 text-black placeholder-gray-500 focus:border-blue-500"} border-2`} required value={form.phone} onChange={e => setForm((f: { name: string; phone: string; email: string }) => ({ ...f, phone: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={`font-semibold text-base transition-colors duration-200 ${isDarkMode ? "text-white" : "text-black"}`}>Email:</label>
              <input id="email" type="email" placeholder="Enter your email" className={`rounded-lg px-4 py-2 text-lg focus:outline-none transition-colors duration-200 ${isDarkMode ? "bg-gray-800 border-blue-900 text-white placeholder-gray-400 focus:border-blue-400" : "bg-white border-blue-200 text-black placeholder-gray-500 focus:border-blue-500"} border-2`} required value={form.email} onChange={e => setForm((f: { name: string; phone: string; email: string }) => ({ ...f, email: e.target.value }))} />
            </div>
            <button type="submit" className={`rounded-lg px-1 py-3 mt-4 font-semibold text-lg transition ${isDarkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InterestModal;
