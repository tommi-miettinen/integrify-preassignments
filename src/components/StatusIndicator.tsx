import { TodoStatusOptions } from "../types";

interface StatusIndicatorOption {
  status: TodoStatusOptions;
}

const StatusIndicator = ({ status }: StatusIndicatorOption) => {
  if (status === "done") return <span className="w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />;
  if (status === "not started") return <span className="w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full" />;
  if (status === "started") return <span className="w-3.5 h-3.5 bg-yellow-500 border-2 border-white dark:border-gray-800 rounded-full" />;
};

export default StatusIndicator;
