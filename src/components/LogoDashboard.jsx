import { Link } from "react-router-dom";

const LogoDashboard = () => {
  return (
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      <Link to={"/"} className="flex items-center gap-2 font-semibold">
        <span className="text-xl font-bold">Jelajah Cakrawala</span>
      </Link>
    </div>
  );
};

export default LogoDashboard;
