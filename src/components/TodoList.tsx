import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CreateToDo from "./CreateToDo";
import {
  Categories,
  IToDo,
  categoryState,
  toDoSelector,
  toDoState,
} from "./atoms";
import ToDo from "./ToDo";
import { recoilPersist } from "recoil-persist";

function ToDoList() {
  // selector로 현재 보고있는 toDoList 가져옴
  const toDos = useRecoilValue(toDoSelector);
  // category 값 가져오기 -> defatul 값은 TO_DO
  const [category, setCategory] = useRecoilState(categoryState);
  // onInput 처리 함수
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    // 현재 카테고리를 옵션 값으로 설정
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((aToDo: IToDo) => (
        <ToDo key={aToDo.id} {...aToDo} />
      ))}
    </div>
  );
}

export default ToDoList;
