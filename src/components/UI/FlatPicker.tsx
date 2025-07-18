import "flatpickr/dist/themes/material_blue.css";

import Flatpickr from "react-flatpickr";

export default function FlatPicker({
  date,
  setDate,
  time,
  setTime,
}: {
  date: Date | null;
  setDate: (d: Date | null) => void;
  time: Date | null;
  setTime: (t: Date | null) => void;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row dark:text-white">
      {/* Date picker */}
      <div className="relative w-full">
        <Flatpickr
          value={date || ""}
          onChange={([selected]) => setDate(selected)}
          options={{
            dateFormat: "Y-m-d",
            noCalendar: false,
            enableTime: false,
            minDate: "today",
            allowInput: false,
          }}
          placeholder="optional: due date"
          className="w-full cursor-pointer rounded border px-3 py-2 pr-10 text-sm"
        />
        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
          📅
        </span>
      </div>

      {/* Time picker */}
      <div className="relative w-full">
        <Flatpickr
          disabled={!date}
          value={time || ""}
          onChange={([selected]) => setTime(selected)}
          options={{
            noCalendar: true,
            enableTime: true,
            dateFormat: "h:i K",
            time_24hr: false,
            allowInput: false,
            minuteIncrement: 1,
            static: true,
            closeOnSelect: false,
          }}
          placeholder="requires due date"
          className="w-full rounded border px-3 py-2 pr-10 text-sm disabled:border-black/60"
        />
        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
          🕒
        </span>
      </div>
    </div>
  );
}
