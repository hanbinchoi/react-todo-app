import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atoms";

function ToDo({ text, category, id }: IToDo) {
  // todo set 함수
  const setToDos = useSetRecoilState(toDoState);
  // 카테고리 버튼 처리 이벤트
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 현재 클릭된 버튼이 무엇인지 확인
    const {
      currentTarget: { name },
    } = event;
    // todo를 버튼을 통해 재설정
    setToDos((oldToDos) => {
      // todo list에서 선택된 todo 찾아옴
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // 선택된 todo를 대체할 새로운 todo (카테고리는 선택된 버튼의 name)
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteToDo = () => {
    setToDos((oldToDos) => {
      return oldToDos.filter((todo) => todo.id !== id);
    });
  };
  return (
    <li>
      <span>{text}</span>
      {/* 현재 카테고리에 해당하는 카테고리는 보여주지 않음 */}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      {/* 삭제 버튼 */}
      <button onClick={deleteToDo}>Delete</button>
    </li>
  );
}
export default ToDo;
