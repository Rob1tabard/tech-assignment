import { useMemo } from "react";

//types
import { ChildrenDataType } from "@/utils/swr/useGetChildrenData/type";

//utils
import { useGetChildrenData } from "@/utils/swr/useGetChildrenData";
import { splitArray } from "@/utils/helper/splitArray";

//lib
import { pageItemsNumber } from "@/lib/paginateConfig/pageItemsNumber";
import { classNames } from "@/utils/helper/classNames";

type PaginateProps = {
  cursor: number;
  setCursor: React.Dispatch<React.SetStateAction<number>>;
};

export function Paginate({ cursor, setCursor }: PaginateProps) {
  const { childrenData } = useGetChildrenData();

  const pages = useMemo(() => {
    return splitArray(childrenData as ChildrenDataType, pageItemsNumber).length;
  }, [childrenData]);

  return (
    <div className="flex border border-gray-300 max-w-min rounded text-sm p-2 gap-2 font-medium text-gray-500">
      <button
        onClick={() => setCursor(0)}
        disabled={cursor === 0}
        className="disabled:cursor-not-allowed disabled:opacity-30"
      >
        {"<<"}
      </button>
      <button
        onClick={() => setCursor((prev) => prev - 1)}
        disabled={cursor === 0}
        className="disabled:cursor-not-allowed disabled:opacity-30"
      >
        {"<"}
      </button>
      {[...Array(pages)].map((_, index) => (
        <button
          key={index}
          className={classNames({
            "font-bold text-black": cursor === index,
          })}
          type="button"
          onClick={() => setCursor(index)}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => setCursor((prev) => prev + 1)}
        disabled={cursor === pages - 1}
        className="disabled:cursor-not-allowed disabled:opacity-30"
      >
        {">"}
      </button>
      <button
        onClick={() => setCursor(pages - 1)}
        disabled={cursor === pages - 1}
        className="disabled:cursor-not-allowed disabled:opacity-30"
      >
        {">>"}
      </button>
    </div>
  );
}
