import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../../components/Input/Input.tsx";
import * as S from "./category.style.ts";
import Button from "../../components/Button/Button.tsx";
import { getSubscriptionStatus } from "../../functions/helper.ts";
import { useAtom } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createCategory } from "../../requests/category.ts";
import { ExpenseCategory } from "../../types.ts";

const Category = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [categoryName, setCategoryName] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const submitCategory = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      const results = await createCategory(accessToken, categoryName);

      if (results.success) {
        const newCategory: ExpenseCategory = {
          id: Number(results.category_id),
          name: categoryName,
        };

        if (currentUser) {
          let categoryArr: ExpenseCategory[] = [];
          categoryArr = categoryArr.concat(currentUser.categories);
          categoryArr.push({ ...newCategory });

          setCurrentUser({
            ...currentUser,
            categories: categoryArr,
          });
        }
      } else {
        setIsDisabled(false);
      }
    } catch (err) {
      setIsDisabled(false);
      console.error("Category - submitCategory:", err);
    }
  };

  useEffect(() => {
    if (
      currentUser &&
      !getSubscriptionStatus("Pro", currentUser?.subscription_id)
    ) {
      navigate("/overview");
    }
  }, []);

  useEffect(() => {
    setIsDisabled(!categoryName);
  }, [categoryName]);

  return (
    <S.Wrapper>
      <S.Content>
        Organize your expenses more efficiently by adding custom categories for
        easy filtering and tracking.
      </S.Content>
      <S.InputWrapper>
        <Input
          label="email"
          labelValue="Category name:"
          onChange={handleChange}
          placeHolder="Enter category"
          inputType="text"
        />
        <Button
          buttonSize="medium"
          handleClick={submitCategory}
          disabled={isDisabled}
        >
          Add Category
        </Button>
      </S.InputWrapper>
      <S.Content>
        <S.Header>List of Categories</S.Header>
        {currentUser?.categories?.map((item) => <div>{item.name}</div>)}
        {!currentUser?.categories && (
          <div>There are no existing categories at this time.</div>
        )}
      </S.Content>
    </S.Wrapper>
  );
};

export default Category;
