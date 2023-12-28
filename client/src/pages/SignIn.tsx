import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

function SignIn() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="w-full h-full  flex flex-col justify-center items-center gap-6">
      <h2 className="text-3xl">Log in</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/4 flex flex-col items-center gap-4 "
      >
        <input
          {...register("username", { required: true })}
          placeholder="Username"
          className="w-full py-2 text-center text-lg border-slate-700 border-spacing-2  border-2 rounded-2xl"
        />
        <input
          {...register("password", { required: true })}
          placeholder="Password"
          className="w-full py-2 text-center text-lg border-slate-700 border-spacing-2  border-2 rounded-2xl"
        />
        <button className="w-1/2 py-2 bg-sky-600 text-white text-lg rounded-2xl">
          Log In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
