import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../../components/Input/Input.tsx";
import * as S from "./category.style.ts";
import Button from "../../components/Button/Button.tsx";
import { getSubscriptionStatus } from "../../functions/helper.ts";
import { useAtom } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createCategory, deleteCategory } from "../../requests/category.ts";
import { ExpenseCategory } from "../../types.ts";
import { Tooltip as ReactTooltip } from "react-tooltip";

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

  const removeCategory = async (category_id: number) => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      const results = await deleteCategory(accessToken, category_id);

      if (results.success) {
        if (currentUser) {
          let categoryArr: ExpenseCategory[] = [];
          categoryArr = categoryArr.concat(currentUser.categories);
          let index = categoryArr.findIndex((item) => item.id === category_id);

          if (index !== -1) {
            categoryArr.splice(index, 1);
          }

          setCurrentUser({
            ...currentUser,
            categories: categoryArr,
          });
        }
      }
    } catch (err) {
      setIsDisabled(false);
      console.error("Category - removeCategory:", err);
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
          labelValue="Expense category:"
          onChange={handleChange}
          placeHolder="Enter category name"
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
        <S.Header>List of Expense Categories</S.Header>
        <S.CategoryList>
          {currentUser?.categories?.map((item) => (
            <div key={item.id}>
              <span data-tooltip-id={`category-${item.id}-tooltip`}>
                <Button
                  handleClick={() => removeCategory(item.id)}
                  classType="register"
                >
                  <>
                    <div>{item.name}</div>
                    <div>X</div>
                  </>
                </Button>
              </span>
              <ReactTooltip
                id={`category-${item.id}-tooltip`}
                place="top"
                variant="info"
                content="Delete this category"
                className="tooltip"
              />
            </div>
          ))}
        </S.CategoryList>
        {!currentUser?.categories.length && (
          <div>There are no existing categories at this time.</div>
        )}
      </S.Content>
    </S.Wrapper>
  );
};

export default Category;
