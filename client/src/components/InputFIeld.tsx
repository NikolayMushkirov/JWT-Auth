import { Register } from "../pages/SignUp";

type Props = {
  name: string;
  placeholder: string;
  error: boolean;
  errorMessage: string | undefined;
  register: Register;
};

function InputFIeld({
  name,
  placeholder,
  register,
  error,
  errorMessage,
}: Props) {
  return (
    <div className="w-full text-center">
      <input
        {...register(name)}
        placeholder={placeholder}
        className="w-full py-2 text-center text-lg border-slate-700 border-spacing-2  border-2 rounded-2xl"
      />
      {error && <span className="text-lg">{errorMessage}</span>}
    </div>
  );
}
export default InputFIeld;
