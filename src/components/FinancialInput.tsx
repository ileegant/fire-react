interface FinancialInputProps {
  label: string;
  id: string;
  unit: string;
  helperText: string;
  placeholder?: string;
}

export default function FinancialInput({
  label,
  id,
  unit,
  helperText,
  placeholder,
}: FinancialInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="htmlFor={id} font-bold">{label}</label>
      <div>
        <input
          id={id}
          placeholder={placeholder}
          className="text-sm bg-neutral-900 border border-neutral-500 rounded-sm w-30 p-1 focus:border-neutral-100 focus:bg-neutral-800 focus:outline-none"
        />
        <span className="pl-2 text-neutral-400">{unit}</span>
      </div>
      <p className="text-xs text-neutral-400">{helperText}</p>
    </div>
  );
}
