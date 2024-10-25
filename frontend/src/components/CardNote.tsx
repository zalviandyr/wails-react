import React from "react";
import { INote } from "../api/note";
import DeleteIcon from "@mui/icons-material/Delete";

type CardNoteProps = {
  note: INote;
  onDelete: (note: INote) => void;
};

export const CardNote: React.FC<CardNoteProps> = ({ note, onDelete }) => {
  return (
    <div className="bg-white rounded-md p-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-start">
          <span>{note.text}</span>

          <button type="button" onClick={() => onDelete(note)}>
            <DeleteIcon className="text-red-400" />
          </button>
        </div>

        <span className="text-xs self-end">{note.createdAt.format("MMMM Do YYYY, h:mm:ss a")}</span>
      </div>
    </div>
  );
};
