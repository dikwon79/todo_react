import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryStates, IToDo, toDoState } from "../atoms";

// 스타일 정의
const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Text = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #74c0fc;
  border-radius: 6px;
  background-color: #74c0fc;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a99e5;
  }

  &:active {
    background-color: #3c78b4;
  }
`;

function ToDoman({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categoryList = useRecoilValue(categoryStates);

  // 카테고리 변경 함수
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const updatedToDo = {
        ...oldToDos[targetIndex],
        category: name as Categories,
      };

      return [
        ...oldToDos.slice(0, targetIndex),
        updatedToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <ListItem>
      <Text>{text}</Text>
      <ButtonGroup>
        {categoryList
          .filter((cat) => cat !== category) // 현재 카테고리 제외
          .map((cat) => (
            <Button key={cat} name={cat} onClick={onClick}>
              {cat}
            </Button>
          ))}
      </ButtonGroup>
    </ListItem>
  );
}

export default ToDoman;
