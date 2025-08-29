import React from "react";

export default function HunterList({
  hunters,
  isAdmin,
  isLoggedIn,
  onEdit,
  onDelete,
}) {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Hunters List
      </li>
      {hunters.map((hunter, idx) => (
        <li className="list-row flex items-center gap-3" key={hunter.id}>
          <div className="text-4xl font-thin opacity-30 tabular-nums w-12 text-center">
            {String(idx + 1).padStart(2, "0")}
          </div>
          <div>
            <img
              className="size-10 rounded-box"
              src={
                hunter.avatar ||
                "https://img.daisyui.com/images/profile/demo/1@94.webp"
              }
              alt={hunter.full_name}
            />
          </div>
          <div className="list-col-grow flex-1">
            <div className="font-semibold">{hunter.full_name}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {hunter.rank_display} &mdash; Power: {hunter.power_level} &mdash;
              Raids: {hunter.raid_count}
            </div>
            <div className="text-xs opacity-70">{hunter.email}</div>
          </div>
          {isAdmin && isLoggedIn && (
            <>
              <button
                className="btn btn-square btn-ghost"
                title="Edit"
                onClick={() => onEdit(hunter)}
              >
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M4 20h4l10.5-10.5a2.121 2.121 0 0 0-3-3L5 17v3z"></path>
                  </g>
                </svg>
              </button>
              <button
                className="btn btn-square btn-ghost"
                title="Delete"
                onClick={() => onDelete(hunter.id)}
              >
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5"></path>
                  </g>
                </svg>
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
