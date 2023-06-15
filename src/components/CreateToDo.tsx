import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atoms";

interface IForm {
  toDo: string;
}
function CreateToDo() {
  // todo set 함수 가져옴
  const setToDos = useSetRecoilState(toDoState);
  // 카테고리 값 가져옴
  const category = useRecoilValue(categoryState);

  // use form hook
  const { register, handleSubmit, setValue } = useForm<IForm>();
  // submit validation
  const handleValid = ({ toDo }: IForm) => {
    // 이전 todo에 새로운 todo 추가
    const newToDo = { text: toDo, id: Date.now(), category };
    setToDos((oldToDos) => [newToDo, ...oldToDos]);
    // 현재 인풋 값은 빈칸으로 초기화
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
