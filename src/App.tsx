import "./App.css";
import FinancialInput from "./components/FinancialInput";
import HeroHeader from "./components/HeroHeader";
import { BOND_INPUTS } from "./constants/config";

function App() {
  return (
    <div className="flex flex-col px-40 justify-center items-center gap-8 h-screen text-neutral-50 bg-neutral-900">
      <HeroHeader />
      <div className="flex h-full-screen w-full p-4 gap-4 border-2 border-red-500">
        <div className="column flex flex-col flex-1 p-4 gap-4 rounded-md bg-neutral-800 border-2 border-neutral-700">
          {BOND_INPUTS.map((input) => (
            <FinancialInput
              label={input.label}
              id={input.id}
              unit={input.unit}
              helperText={input.helperText}
              placeholder={input.placeholder}
            />
          ))}
        </div>
        <div className="column flex-3 bg-amber-300 border-2 border-green-300"></div>
        <div className="column flex-2 bg-amber-300 border-2 border-green-300"></div>
      </div>
    </div>
  );
}

export default App;
