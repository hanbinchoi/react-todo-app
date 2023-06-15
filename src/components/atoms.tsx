import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

const { persistAtom } = recoilPersist({
  key: "localToDo",
  storage: localStorage,
});

// todo atom
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// category atom
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

// todo 셀렉터
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    // 호출되면 todo와 category값을 가져와 해당하는 요소 리턴
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
