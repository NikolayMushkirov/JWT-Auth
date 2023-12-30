import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="w-full h-full  flex flex-col justify-center items-center gap-6">
      <h2 className="text-3xl">Войти в аккаунт</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/4 flex flex-col items-center gap-2 "
      >
        <input
          {...register("username", {
            required: "Это поле обязательно к заполнению",
          })}
          placeholder="Имя пользователя"
          className="w-full py-2 text-center text-lg border-slate-700 border-spacing-2  border-2 rounded-2xl"
        />
        <div className="">
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <input
          {...register("password", {
            required: "Это поле обязательно к заполнению",

          })}
          placeholder="Пароль"
          className="w-full py-2 text-center text-lg border-slate-700 border-spacing-2  border-2 rounded-2xl"
        />
        <div className="">
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button className="w-1/2 py-2 bg-sky-600 text-white text-lg rounded-2xl">
          Войти
        </button>
      </form>
    </div>
  );
}

export default SignIn;
