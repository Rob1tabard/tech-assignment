//components
import { Loader } from "@/components/Loader";

//utils
import { classNames } from "@/utils/helper/classNames";

type ButtonType = React.ComponentPropsWithoutRef<"button"> & {
  isLoading?: boolean;
};

export function Button({
  className,
  children,
  isLoading,
  ...restProps
}: ButtonType) {
  return (
    <button
      className={classNames(
        "flex items-center justify-center gap-2.5 focus:outline-none focus:ring-1 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...restProps}
    >
      {isLoading ? <Loader className="h-4 w-4 text-white" /> : null}
      {children}
    </button>
  );
}
