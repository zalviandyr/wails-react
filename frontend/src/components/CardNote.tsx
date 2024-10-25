import React from "react";
import { INote } from "../types/note";

type CardNoteProps = INote;

export const CardNote: React.FC<CardNoteProps> = ({ text, createdAt }) => {
  return (
    <div className="bg-white rounded-md p-2">
      <div className="flex flex-col gap-3">
        <span>{text}</span>

        <span className="text-xs self-end">{createdAt.format("MMMM Do YYYY, h:mm:ss a")}</span>
      </div>
    </div>
  );
};
