import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, TextField } from "@mui/material";
import { CardNote } from "../components/CardNote";
import { INote } from "../types/note";
import { useForm } from "react-hook-form";
import { CreateNote, GetNotes, Print } from "../../wailsjs/go/main/App";

export const Home: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<INote>();

  useEffect(() => {
    GetNotes().then((result) =>
      setNotes(result.map((e) => ({ text: e.Text, createdAt: moment(e.CreatedAt) })))
    );
  }, []);

  const submit = (data: INote) => {
    CreateNote(data.text).then((result) => {
      setNotes((prev) => [...prev, { text: result.Text, createdAt: moment(result.CreatedAt) }]);

      reset({ text: "" });
      clearErrors("text");
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
            <CardNote {...e} />
          ))}
      </div>
    </div>
  );
};
