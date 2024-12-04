import { useState } from "react";
import { useRecoilState } from "recoil";
import { categoryState, Categories, categoryStates } from "../atoms";
import styled from "styled-components";

const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: row;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column; /* 세로로 정렬 */
    gap: 15px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  background-color: #f8f9fa;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    border-color: #74c0fc;
    box-shadow: 0 0 0 3px rgba(116, 192, 252, 0.5);
  }

  @media (max-width: 768px) {
    width: 100%; /* 모바일에서는 전체 너비로 확장 */
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  background-color: #f8f9fa;
  outline: none;
  margin-right: 10px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #74c0fc;
    box-shadow: 0 0 0 3px rgba(116, 192, 252, 0.5);
  }

  @media (max-width: 768px) {
    width: 100%; /* 모바일에서 입력 필드 너비 확장 */
    margin-right: 0;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #74c0fc;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #5a99e5;
  }

  &:active {
    background-color: #3c78b4;
  }

  @media (max-width: 768px) {
    width: 100%; /* 모바일에서 버튼 너비 확장 */
  }
`;

function CategorySelect() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [newCategory, setNewCategory] = useState<string>("");
  const [categories, setCategories] = useRecoilState(categoryStates);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value as Categories);
  };

  const handleNewCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory as Categories)) {
      const updatedCategories = [...categories, newCategory as Categories];
      setCategories(updatedCategories); // 새 카테고리 추가
      setNewCategory(""); // 입력 필드 초기화
    }
  };

  return (
    <SelectWrapper>
      <Select value={category} onChange={handleCategoryChange}>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </Select>

      <InputWrapper>
        <Input
          type="text"
          value={newCategory}
          onChange={handleNewCategoryChange}
          placeholder="New category"
        />
        <Button type="button" onClick={handleAddCategory}>
          Add
        </Button>
      </InputWrapper>
    </SelectWrapper>
  );
}

export default CategorySelect;
