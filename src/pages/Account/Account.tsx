import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/Button/Button.tsx";
import * as S from "./account.style.ts";
import Link from "../../components/Link/Link.tsx";
import { useSetAtom } from "jotai";
import Input from "../../components/Input/Input.tsx";
import ModalComponent from "../../components/Modal/Modal.tsx";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { incomeAtom } from "../../hook/IncomeAtom.ts";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";
import Loading from "../../components/Loading/Loading.tsx";
import { deleteUser } from "../../requests/users.ts";

const Account = () => {
  const { logout, user, getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const setBudget = useSetAtom(budgetAtom);
  const setIncome = useSetAtom(incomeAtom);
  const setExpense = useSetAtom(expenseAtom);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logOutAccount = () => {
    setIsloading(true);
    setBudget([]);
    setIncome([]);
    setExpense([]);
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const deleteAccount = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      await deleteUser(accessToken);
    } catch (err) {
      console.error(err);
    }

    logOutAccount();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Wrapper>
      <S.Section>
        <Input
          label="email"
          labelValue="Email:"
          onChange={() => {}}
          placeHolder="Enter your email"
          isDisabled
          defaultValue={user?.email || ""}
          inputType="text"
        />
      </S.Section>
      <S.Section>
        <Link url="/account/history" label="View Budget History">
          View Budget History
        </Link>
      </S.Section>
      <S.Section>
        <Button
          handleClick={() => setIsOpen(true)}
          buttonSize="medium"
          classType="text"
        >
          Delete Account
        </Button>
      </S.Section>
      <S.Section>
        <Button
          handleClick={logOutAccount}
          buttonSize="medium"
          classType="text"
        >
          Log Out
        </Button>
      </S.Section>
      <ModalComponent
        isOpen={isOpen}
        title={`Confirm Account Deletion`}
        handleClose={() => setIsOpen(false)}
      >
        <S.ModalWrapper>
          <span>Are you sure you want to delete your account?</span>
          <S.ModalBtn>
            <Button
              buttonSize="small"
              handleClick={deleteAccount}
              classType="register"
            >
              Yes
            </Button>
            <Button buttonSize="small" handleClick={() => setIsOpen(false)}>
              No
            </Button>
          </S.ModalBtn>
        </S.ModalWrapper>
      </ModalComponent>
    </S.Wrapper>
  );
};

export default Account;
