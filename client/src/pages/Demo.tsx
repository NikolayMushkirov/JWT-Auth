import { useContext } from "react";
import Button from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";

function Demo() {
  const { data, handleFetchProtected } = useContext(AuthContext);

  return (
    <div className=" h-full flex flex-col gap-4 justify-center items-center">
      <p>{JSON.stringify(data)}</p>
      <Button onClick={handleFetchProtected}>Запрос данных</Button>
      <Button>Выйти</Button>
    </div>
  );
}

export default Demo;
