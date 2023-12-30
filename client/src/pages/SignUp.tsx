import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

const rolesList = [
  {
    id: 1,
    role: "Администратор",
  },
  {
    id: 2,
    role: "Модератор",
  },
  {
    id: 3,
    role: "Пользователь",
  },
];

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="w-full h-full  flex flex-col justify-center items-center gap-6">
      <h2 className="text-3xl">Создать аккаунт</h2>
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
            minLength: {
              value: 3,
              message: "пароль должен содержать минимум 3 символа",
            },
          })}
          placeholder="Пароль"
          className="w-full py-2 text-center text-lg border-slate-700 border-spacing-2  border-2 rounded-2xl"
        />
        <div className="">
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <select className="w-full  py-2 border-slate-700 border-spacing-2  border-2 rounded-xl text-center text-lg bg-transparent">
          {rolesList.map(({ id, role }) => (
            <option key={id} value={id}>
              {role}
            </option>
          ))}
        </select>
        <button className="w-1/2 py-2 bg-sky-600 text-white text-lg rounded-2xl">
          Создать аккаунт
        </button>
      </form>
    </div>
  );
}

export default SignUp;
