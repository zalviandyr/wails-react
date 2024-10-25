import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { CardNote } from "../components/CardNote";
import { useForm } from "react-hook-form";
import { INote, NoteService } from "../api/note";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { file2Base64 } from "../utils/file";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
    setError,
    formState: { errors },
  } = useForm<INote>();

  useEffect(() => setNotes(data ?? []), [data]);

  const submit = async (data: INote) => {
    const file = (data.image as any)[0] as File;
    if (file) {
      const type = file.type;
      if (!type.includes("image/")) {
        setError("text", { message: "Invalid type file" });
        return;
      }

      // to base 64
      data.image = await file2Base64(file);
    } else {
      data.image = "";
    }

    mutateCreate(data, {
      onSuccess: () => {
        refetch();

        reset({ text: "", image: "" });
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
        <div className="flex flex-row bg-white rounded-md">
          <TextField
            variant="filled"
            multiline
            className="bg-white rounded-md flex-grow"
            label="Whats your day ?"
            error={errors.text !== undefined}
            helperText={errors.text?.message}
            {...register("text", { required: "Text required" })}
          />
        </div>

        <div className="flex flex-row gap-2 justify-end">
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" {...register("image")} />
          </Button>

          <Button variant="contained" className="self-end" onClick={handleSubmit(submit)}>
            Submit
          </Button>
        </div>
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
