import { atom, selector } from "recoil";

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

// LocalStorage에서 To-Do 리스트 가져오기
const savedToDos = localStorage.getItem("toDoState");
const initialToDos = savedToDos ? JSON.parse(savedToDos) : [];

// LocalStorage에서 카테고리 가져오기
const savedCategories = localStorage.getItem("categoryStates");
const initialCategories = savedCategories
  ? JSON.parse(savedCategories)
  : [Categories.TO_DO, Categories.DOING, Categories.DONE];

const createUniqueKey = (key: string) =>
  `${key}_${Math.random().toString(36).substring(2, 9)}`;

export const toDoState = atom<IToDo[]>({
  key: createUniqueKey("toDoState"),
  default: initialToDos,
});

export const categoryState = atom<Categories>({
  key: createUniqueKey("category"),
  default: Categories.TO_DO,
});

export const categoryStates = atom<string[]>({
  key: createUniqueKey("categoryStates"),
  default: initialCategories,
});

export const toDoSelector = selector({
  key: createUniqueKey("toDoSelector"),
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
