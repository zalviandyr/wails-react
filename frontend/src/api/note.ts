import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateNote, DeleteNote, GetNotes } from "../../wailsjs/go/main/App";
import moment from "moment";

export type INote = {
  id: number;
  text: string;
  createdAt: moment.Moment;
};

export const NoteService = {
  useAll: () =>
    useQuery<INote[]>({
      queryKey: ["note", "all"],
      queryFn: async () => {
        const result = await GetNotes();

        return result.map((e) => ({ id: e.ID, text: e.Text, createdAt: moment(e.CreatedAt) }));
      },
    }),

  useCreate: () =>
    useMutation({
      mutationFn: (data: INote) => {
        return CreateNote(data.text);
      },
    }),

  useDelete: () =>
    useMutation({
      mutationFn: (data: INote) => {
        return DeleteNote(data.id);
      },
    }),
};
