import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { toDoSelector } from "../atoms";
import ToDoman from "./ToDoman";
import styled from "styled-components";
import CategorySelect from "./category";

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;

function ToDoList() {
  //const [toDo, doing, done] = useRecoilValue(toDoSelector);
  const toDos = useRecoilValue(toDoSelector);

  return (
    <div>
      <Header>To Dos</Header>
      <hr />

      <CategorySelect />
      <CreateToDo />

      {toDos?.map((toDo) => (
        <ToDoman key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
