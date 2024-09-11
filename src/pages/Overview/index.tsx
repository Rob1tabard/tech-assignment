import { OverviewContent } from "@/pages/Overview/Overview.content";

export function Overview() {
  return (
    <>
      <header className="flex flex-col space-y-1">
        <h1 className="font-semibold text-3xl text-black">Children overview</h1>
        <span className="text-xs italic text-gray-400">
          You can check bellow the list of children you are in charge and manage
          their checkin and checkout time
        </span>
      </header>
      <OverviewContent />
    </>
  );
}
