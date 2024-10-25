import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { CardNote } from "../components/CardNote";
import { useForm } from "react-hook-form";
import { INote, NoteService } from "../api/note";
import { Print } from "../../wailsjs/go/main/App";

export const Home: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const { data, refetch } = NoteService.useAll();
  const { mutate: mutateCreate } = NoteService.useCreate();
  const { mutate: mutateDelete } = NoteService.useDelete();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<INote>();

  useEffect(() => setNotes(data ?? []), [data]);

  const submit = async (data: INote) => {
    mutateCreate(data, {
      onSuccess: () => {
        refetch();

        reset({ text: "" });
        clearErrors("text");
      },
    });
  };

  const deleteAction = async (data: INote) => {
    mutateDelete(data, {
      onSuccess: () => refetch(),
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-5">
        <TextField
          variant="filled"
          multiline
          className="bg-white rounded-md"
          label="Whats your day ?"
          error={errors.text !== undefined}
          helperText={errors.text !== undefined ? "Text required" : ""}
          {...register("text", { required: true })}
        />

        <Button variant="contained" className="self-end" onClick={handleSubmit(submit)}>
          Submit
        </Button>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        {notes
          .sort((a, b) => b.createdAt.unix() - a.createdAt.unix())
          .map((e) => (
            <CardNote key={e.id} note={e} onDelete={deleteAction} />
          ))}
      </div>
    </div>
  );
};
