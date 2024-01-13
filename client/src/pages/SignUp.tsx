import { useContext } from "react";
import { useForm, UseFormRegister, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthContext } from "../contexts/AuthContext";

import { signUpSchema } from "../validators/validationSchema";

import InputFIeld from "../components/InputFIeld";
import Button from "../components/Button";
import Select from "../components/Select";

const defaultValues = {
  userName: "",
  password: "",
  role: 1,
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

export type Register = UseFormRegister<FieldValues>;

function SignUp() {
  const { handleSignUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(signUpSchema) });

  return (
    <div className="w-full h-full  flex flex-col justify-center items-center gap-6">
      <h2 className="text-3xl">Создать аккаунт</h2>
      <form
        onSubmit={handleSubmit(handleSignUp ?? (() => {}))}
        className="w-1/4 flex flex-col items-center gap-2 "
      >
        <InputFIeld
          name="userName"
          placeholder="Имя пользователя"
          register={register}
          error={Boolean(errors.userName)}
          errorMessage={errors.userName?.message}
        />
        <InputFIeld
          name="password"
          placeholder="Пароль"
          register={register}
          error={Boolean(errors.password)}
          errorMessage={errors.password?.message}
        />
        <Select rolesList={rolesList} />
        <Button type="submit" disabled={isSubmitting}>
          Создать аккаунт
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
