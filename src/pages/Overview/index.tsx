import { Provider } from "jotai";
import { OverviewContent } from "@/pages/Overview/Overview.content";

export function Overview() {
  return (
    <>
      <header className="flex flex-col space-y-1">
        <h1 className="text-3xl font-bold text-black">Overview</h1>
        <span className="text-xs italic text-gray-400">
          You can check bellow the list of children you are in charge and manage
          their checkin and checkout time
        </span>
      </header>
      <Provider>
        <OverviewContent />
      </Provider>
    </>
  );
}
