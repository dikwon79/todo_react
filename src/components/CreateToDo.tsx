import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";

interface IForm {
  toDo: string;
}

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column; /* 입력 필드와 버튼을 세로로 배치 */
  align-items: center;
  background-color: #f8f9fa;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px; /* 원하는 너비 설정 */
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  margin-bottom: 15px; /* 버튼과의 간격 */
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #74c0fc;
  }

  &::placeholder {
    color: #a3a3a3;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #74c0fc;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a99e5;
  }

  &:active {
    background-color: #3c78b4;
  }
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(handleValid)}>
        <Input
          {...register("toDo", { required: "please write a To Do" })}
          placeholder="write a to do"
        />
        <Button type="submit">Add</Button>
      </Form>
    </FormWrapper>
  );
}
export default CreateToDo;
