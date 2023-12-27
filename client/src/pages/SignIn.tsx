import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  login: string;
  password: string;
};

function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="w-full h-full  flex flex-col justify-center items-center gap-6">
      <h2 className="text-3xl">Create Account</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/4 flex flex-col items-center gap-4 "
      >
        <input
          {...register("login", { required: true })}
          placeholder="Login"
          className="w-full py-2 text-center border-slate-700 border-spacing-2  border-2 rounded-xl"
        />
        <input
          {...register("password", { required: true })}
          placeholder="Password"
          className="w-full py-2 text-center border-slate-700 border-spacing-2  border-2 rounded-xl"
        />
        <button className="w-1/2 py-2 bg-sky-600 text-white rounded-xl">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
