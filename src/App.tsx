import { useMemo, useState } from "react";
import "./App.css";
import FinancialInput from "./components/FinancialInput";
import HeroHeader from "./components/HeroHeader";
import { BOND_INPUTS } from "./constants/config";

function App() {
  const [formData, setFormData] = useState<Record<string, string>>({
    bond_price: "",
    bond_quantity: "",
    annual_yield: "",
    start_date: "",
    maturity_date: "",
  });

  const { bond_price, bond_quantity, annual_yield, start_date, maturity_date } =
    formData;

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const calculateTerm = () => {
    if (!start_date || !maturity_date) return 0;

    const startDate = new Date(start_date);
    const endDate = new Date(maturity_date);

    const diffInMs = endDate.getTime() - startDate.getTime();

    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays > 0 ? diffInDays / 365.25 : 0;
  };

  const totalInvestment = useMemo(() => {
    const price = Number(bond_price) || 0;
    const quantity = Number(bond_quantity) || 0;

    return price * quantity;
  }, [bond_price, bond_quantity]);

  const projectedCapital = useMemo(() => {
    const quantity = Number(bond_quantity) || 0;
    const yieldPercent = Number(annual_yield) / 100 || 0;
    const termMonths = calculateTerm() || 0;
    const faceValue = 1000;

    const totalInterest = faceValue * quantity * yieldPercent * termMonths;

    const netInterest = totalInterest * 0.985;

    return faceValue * quantity + netInterest;
  }, [formData]);

  return (
    <div className="flex flex-col px-40 py-10 justify-center items-center gap-8 h-screen text-neutral-50 bg-neutral-900">
      <HeroHeader />
      <div className="flex h-screen w-full p-4 gap-4 border-2 border-red-500">
        <div className="column flex flex-col flex-1 p-4 gap-4 rounded-md bg-neutral-800 border-2 border-neutral-700">
          {BOND_INPUTS.map((input) => (
            <FinancialInput
              label={input.label}
              id={input.id}
              unit={input.unit}
              helperText={input.helperText}
              value={formData[input.id as keyof typeof formData]}
              onChange={(e) => handleChange(input.id, e.target.value)}
              placeholder={input.placeholder}
            />
          ))}

          <div className="flex flex-col gap-2">
            <label className="font-bold">Investment Term</label>
            <div>
              <input
                type="date"
                value={formData["start-date"]}
                onChange={(e) => handleChange("start-date", e.target.value)}
                className="text-sm bg-neutral-900 border border-neutral-500 rounded-sm p-1 focus:border-neutral-100 focus:bg-neutral-800 focus:outline-none"
              />
              <span className="pl-2 text-neutral-400">from</span>
            </div>
            <div>
              <input
                type="date"
                value={formData["maturity-date"]}
                onChange={(e) => handleChange("maturity-date", e.target.value)}
                className="text-sm bg-neutral-900 border border-neutral-500 rounded-sm p-1 focus:border-neutral-100 focus:bg-neutral-800 focus:outline-none"
              />
              <span className="pl-2 text-neutral-400">to</span>
            </div>
            <p className="text-xs text-neutral-400">
              Specify the date of purchase and the maturity date to calculate
              the exact holding period.
            </p>
          </div>
        </div>
        <div className="column flex flex-col flex-2 p-4 gap-4 rounded-md bg-neutral-800 border-2 border-neutral-700"></div>
        <div className="column flex flex-col flex-1 p-4 gap-4 rounded-md bg-neutral-800 border-2 border-neutral-700">
          <pre>{JSON.stringify(formData, null, 2)}</pre>
          <div className="flex flex-col gap-1">
            <h4 className="font-bold">Total Investment</h4>
            <h5 className="text-3xl font-black">{totalInvestment} ₴</h5>
            <p className="text-xs text-neutral-400">
              Amount spent to buy {bond_quantity || 0} bonds
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-bold">Projected Capital</h4>
            <h5 className="text-3xl font-black">{projectedCapital} ₴</h5>
            <p className="text-xs text-neutral-400">
              Your total portfolio value at the end of the term.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-bold">Total Earnings</h4>
            <h5 className="text-3xl font-black">
              {projectedCapital - totalInvestment} ₴
            </h5>
            <p className="text-xs text-neutral-400">
              Pure profit after the 1.5% military tax deduction.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-bold">Tax Savings</h4>
            <h5 className="text-3xl font-black">₴</h5>
            <p className="text-xs text-neutral-400">
              Extra money kept in your pocket compared to a bank deposit (0%
              Income Tax vs 18%).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
