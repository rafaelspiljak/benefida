import { memo } from "react";

const options = [
  "Never or not at all",
  "Sometimes or somewhat",
  "Often or much",
  "Very often or very much",
];

export const Section = memo(({ section, responses, handleChange }) => {
  return (
    <div className="bg-[#D7EAD6] rounded shadow p-[30px] md:p-6 w-full">
      <h2 className="md:hidden text-[32px] text-[#41553E] text-left font-semibold mb-6">
        {section.label}
      </h2>

      {/* Desktop / tablet matrix */}
      <table className="hidden md:table w-full border-collapse border-spacing-y-2">
        <thead>
          <tr>
            <th className="text-left text-[44px] text-[#41553E] pb-6 leading-[100%] tracking-[1.5%]">
              {section.label}
            </th>
            {options.map((opt) => (
              <th
                key={opt}
                className="text-center text-[18px] font-medium text-gray-700 px-[5px] max-w-[180px] w-[180px] pb-6 leading-[23px] tracking-[1.5%]"
              >
                {opt}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.questions.map((question, qIdx) => (
            <tr key={question} className="border-t border-[#41553E80]">
              <td className="py-6 pr-4 text-[18px] font-medium text-gray-800 text-left leading-[23px] tracking-[1.5%]">
                {question}
              </td>
              {options.map((_, optIdx) => (
                <td key={optIdx} className="text-center w-[180px]">
                  <input
                    type="radio"
                    name={`q-${section.label}-${qIdx}`}
                    value={optIdx}
                    checked={responses[section.label]?.[qIdx] === optIdx}
                    onChange={() => handleChange(section.label, qIdx, optIdx)}
                    className="accent-[#41553E] checked:bg-[#41553E] appearance-none w-[20px] h-[20px] border-[1px] border-[#41553E] rounded-full checked:bg-[#41553E] checked:border-[#41553E] focus:ring-[1px] focus:ring-[#41553E] transition duration-200"
                  />
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-[#41553E80]"></tr>
        </tbody>
      </table>

      {/* Mobile stacked version */}
      <div className="md:hidden space-y-6 text-black">
        <hr className="md:hidden border-[#41553E80] mt-6" />
        {section.questions.map((question, qIdx) => (
          <div key={question}>
            <p className="text-[18px] text-left font-medium text-[#41553E] mb-6 leading-[23px] tracking-[1.5%]">
              {question}
            </p>
            <div className="space-y-3">
              {options.map((opt, optIdx) => (
                <label
                  key={opt}
                  className="flex items-center justify-between border border-[#41553E80] rounded p-3"
                >
                  <span className="text-[14px] font-medium text-left leading-[18px] tracking-[1.5%]">
                    {opt}
                  </span>
                  <input
                    type="radio"
                    name={`q-m-${section.label}-${qIdx}`}
                    value={optIdx}
                    checked={responses[section.label]?.[qIdx] === optIdx}
                    onChange={() => handleChange(section.label, qIdx, optIdx)}
                    className="accent-[#41553E] checked:bg-[#41553E] appearance-none w-[20px] h-[20px] border-[1px] border-[#41553E] rounded-full checked:bg-[#41553E] checked:border-[#41553E] focus:ring-[1px] focus:ring-[#41553E] transition duration-200"
                  />
                </label>
              ))}
            </div>
            <hr className="border-[#41553E80] mt-6" />
          </div>
        ))}
      </div>
    </div>
  );
});
