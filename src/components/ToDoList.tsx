import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector } from "../atoms";
import ToDoman from "./ToDoman";
import styled from "styled-components";
import CategorySelect from "./category";

const SelectWrapper = styled.div`
  display: flex;
  justify-content: center; /* 가로 방향 중앙 정렬 */
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;
const Select = styled.select`
  appearance: none;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 16px;
  color: #495057;
  width: 50%;
  max-width: 800px;
  min-width: 400px;

  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e9ecef;
  }

  &:focus {
    border-color: #74c0fc;
    box-shadow: 0 0 0 3px rgba(116, 192, 252, 0.5);
  }
`;

const ArrowIcon = styled.div`
  position: relative;

  select {
    width: 100%;
    padding-right: 35px;
  }

  &::after {
    content: "▼";
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #495057;
  }
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
