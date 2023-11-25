import clsx from "clsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useFormStatus } from "react-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Loading = () => {
  return <ArrowPathIcon className="h-4 w-4 rotate ml-4" color="#ffffff" />;
};

export function Button({ children, className, ...rest }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      {...rest}
      aria-disabled={pending}
      className={clsx(
        "flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className
      )}
    >
      {children}
      {pending && <Loading />}
    </button>
  );
}
