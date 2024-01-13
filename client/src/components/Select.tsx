type Props = {
  rolesList: { id: number; role: string }[];
  value: number;
  onChange: (...events: []) => void;
};

function Select({ rolesList, ...rest }: Props) {
  return (
    <select
      {...rest}
      className="w-full  py-2 border-slate-700 border-spacing-2  border-2 rounded-xl text-center text-lg bg-transparent"
    >
      {rolesList.map(({ id, role }) => (
        <option key={id} value={id}>
          {role}
        </option>
      ))}
    </select>
  );
}

export default Select;
