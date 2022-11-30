function Alert({ msg, color, state }) {
  return <p className={`${!state && "invisible"}  max-w-full ${color === "red" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"} font-semibold p-1 rounded-sm text-xs h-6`}>{msg}</p>;
}
export default Alert;
