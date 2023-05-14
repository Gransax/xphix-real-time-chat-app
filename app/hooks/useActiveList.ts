import { create } from "zustand";

interface ActiveListStore {
  members: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
}

const useActiveList = create<ActiveListStore>((set) => ({
  members: [],
  add: (id: string) =>
    set((state) => {
      console.log("SET FUNCTION USER ID : ", id);

      return {
        members: [...state.members, id],
      };
    }),
  remove: (id: string) =>
    set((state) => ({
      members: state.members.filter((memberId) => memberId !== id),
    })),
  set: (ids) =>
    set((state) => ({
      members: ids,
    })),
}));

export default useActiveList;
