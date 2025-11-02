import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../../components/Input/Input.tsx";
import * as S from "./category.style.ts";
import Button from "../../components/Button/Button.tsx";
import {
  checkIsExpiredSession,
  getSubscriptionStatus,
  loggedInHomepage,
} from "../../functions/helper.ts";
import { useAtom } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createCategory, deleteCategory } from "../../requests/category.ts";
import { ExpenseCategory } from "../../types.ts";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { trackError, trackEvent } from "../../functions/mixpanel.ts";
import SessionExpired from "../../components/SessionExpired/SessionExpired.tsx";

const Category = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [categoryName, setCategoryName] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);

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
          label: categoryName,
        };

        if (currentUser) {
          let categoryArr: ExpenseCategory[] = [];
          categoryArr = categoryArr.concat(currentUser.categories);
          categoryArr.push({ ...newCategory });

          setCurrentUser({
            ...currentUser,
            categories: categoryArr,
          });
          trackEvent("Add a Category");
        }
      } else {
        setIsDisabled(false);
      }
    } catch (err) {
      setIsDisabled(false);
      trackError("Category - submitCategory:", { result: err });

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
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
      trackError("Category - removeCategory:", { result: err });

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
    }
  };

  useEffect(() => {
    if (
      currentUser &&
      !getSubscriptionStatus("Pro", currentUser?.subscription_id)
    ) {
      navigate(loggedInHomepage(currentUser));
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
        {currentUser?.categories && currentUser.categories.length > 0 && (
          <S.CategoryList>
            {currentUser.categories?.map((item) => (
              <div key={item.id}>
                <span data-tooltip-id={`category-${item.id}-tooltip`}>
                  <Button
                    handleClick={() => removeCategory(item.id)}
                    classType="register"
                  >
                    <>
                      <div>{item.label}</div>
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
        )}
        {currentUser?.categories && currentUser.categories.length === 0 && (
          <div>There are no existing categories at this time.</div>
        )}
      </S.Content>
      <SessionExpired
        isOpen={isSessionExpired}
        closeModal={setIsSessionExpired}
      />
    </S.Wrapper>
  );
};

export default Category;
