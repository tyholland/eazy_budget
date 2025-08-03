import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/Button/Button.tsx";
import * as S from "./account.style.ts";
import Link from "../../components/Link/Link.tsx";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Input from "../../components/Input/Input.tsx";
import ModalComponent from "../../components/Modal/Modal.tsx";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { incomeAtom } from "../../hook/IncomeAtom.ts";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";
import Loading from "../../components/Loading/Loading.tsx";
import {
  deleteUser,
  removeSharedAccount,
  updateUserSub,
} from "../../requests/users.ts";
import AccountNav from "../../views/AccountNav/AccountNav.tsx";
import {
  getDateInfo,
  getSubscriptionName,
  getSubscriptionStatus,
} from "../../functions/helper.ts";
import { userAtom } from "../../hook/UserAtom.ts";
import ChartIcon from "../../svg/ChartIcon.tsx";
import ViewIcon from "../../svg/ViewIcon.tsx";
import RemoveAccountIcon from "../../svg/RemoveAccountIcon.tsx";
import HistoryIcon from "../../svg/HistoryIcon.tsx";
import ShareAccountIcon from "../../svg/ShareAccountIcon.tsx";
import SharedAccountMessage from "../../components/SharedAccountMessage/SharedAccountMessage.tsx";
import { trackError, trackEvent } from "../../functions/mixpanel.ts";

const Account = () => {
  const { logout, getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const setBudget = useSetAtom(budgetAtom);
  const setIncome = useSetAtom(incomeAtom);
  const setExpense = useSetAtom(expenseAtom);
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSharedOpen, setIsSharedOpen] = useState<boolean>(false);
  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("settings");
  const [hasMessage, setHasMessage] = useState<boolean | undefined>(
    currentUser?.connected_message,
  );
  const { currentYear, currentMonth } = getDateInfo();
  const isPro = getSubscriptionStatus("Pro", currentUser?.subscription_id);
  const isStarter = getSubscriptionStatus(
    "Starter",
    currentUser?.subscription_id,
  );
  const isOriginal = getSubscriptionStatus("OG", currentUser?.subscription_id);

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
      trackEvent("Delete Account");
    } catch (err) {
      trackError("Account - deleteAccount:", { result: err });
    }

    logOutAccount();
  };

  const cancelSubscription = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      currentUser &&
        setCurrentUser({
          ...currentUser,
          paid_sub: false,
          subscription_id: 2,
        });

      await updateUserSub(accessToken, {
        plan: 2,
        paid: false,
      });
      trackEvent("Cancel Subscription");
    } catch (err) {
      trackError("Account - cancelSubscription:", { result: err });
    }

    logOutAccount();
  };

  const removeSharedAccess = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      await removeSharedAccount(accessToken);
      trackEvent("Remove Shared Account Access");
    } catch (err) {
      trackError("Account - removeSharedAccess:", { result: err });
    }

    logOutAccount();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {hasMessage && <SharedAccountMessage setHasMessage={setHasMessage} />}
      <S.Wrapper>
        <AccountNav
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
        <S.ContentWrapper>
          <>
            {selectedOption === "settings" && (
              <>
                <S.Section>
                  <Input
                    label="email"
                    labelValue="Email:"
                    onChange={() => {}}
                    placeHolder="Enter your email"
                    isDisabled
                    defaultValue={currentUser?.email || ""}
                    inputType="text"
                  />
                </S.Section>
                {isPro &&
                  !currentUser?.connected_id &&
                  !currentUser?.is_connected && (
                    <S.Section>
                      <Link url="/account/share" label="Share Account">
                        <span>
                          Share Account <ShareAccountIcon />
                        </span>
                      </Link>
                    </S.Section>
                  )}
                {isPro && currentUser?.is_connected && (
                  <S.Section>
                    <Button
                      handleClick={() => setIsSharedOpen(true)}
                      buttonSize="medium"
                      classType="text"
                    >
                      <span>
                        Remove Shared Account <RemoveAccountIcon />
                      </span>
                    </Button>
                  </S.Section>
                )}
                <S.Section>
                  <Button
                    handleClick={() => setIsOpen(true)}
                    buttonSize="medium"
                    classType="text"
                  >
                    <span>
                      Delete Account <RemoveAccountIcon />
                    </span>
                  </Button>
                </S.Section>
                <S.Section>
                  <Button classType="text" handleClick={logOutAccount}>
                    Logout
                  </Button>
                </S.Section>
              </>
            )}
            {selectedOption === "budget" && (
              <>
                {isPro && (
                  <S.Section>
                    <Link
                      url="/account/categories"
                      label={`Add Expense Categories`}
                    >
                      <span>Add Expense Categories</span>
                    </Link>
                  </S.Section>
                )}
                <S.Section>
                  <Link
                    url={`/yearly/income/${currentYear}`}
                    label={`${currentYear} Overview`}
                  >
                    <span>
                      {currentYear} Overview <ViewIcon />
                    </span>
                  </Link>
                </S.Section>
                <S.Section>
                  <Link
                    url={`/monthly/income/${currentMonth}/${currentYear}`}
                    label={`${currentMonth} Overview`}
                  >
                    <span>
                      {currentMonth} Overview <ViewIcon />
                    </span>
                  </Link>
                </S.Section>
                <S.Section>
                  <Link url="/account/history" label="Overall Budget History">
                    <span>
                      Overall Budget History <HistoryIcon />
                    </span>
                  </Link>
                </S.Section>
                <S.Section>
                  <Link url="/account/predict" label="3 Year Prediction">
                    <span>
                      3 Year Prediction <ChartIcon />
                    </span>
                  </Link>
                </S.Section>
                {isStarter && (
                  <S.Section>
                    <Link
                      url="/account/past-months"
                      label={`Review ${currentYear} Past Months`}
                    >
                      <span>
                        Review {currentYear} Past Months <HistoryIcon />
                      </span>
                    </Link>
                  </S.Section>
                )}
              </>
            )}
            {selectedOption === "subscription" && (
              <>
                <S.Section>
                  <Input
                    label="plan"
                    labelValue="Plan:"
                    onChange={() => {}}
                    placeHolder="Enter subscription plan"
                    isDisabled
                    defaultValue={getSubscriptionName(
                      currentUser?.subscription_id,
                    )}
                    inputType="text"
                  />
                </S.Section>
                <S.Section className="date">
                  <Input
                    label="date"
                    labelValue="Date Subscribed:"
                    onChange={() => {}}
                    placeHolder="Enter date subscribed"
                    isDisabled
                    defaultValue={"10/12/2025"}
                    inputType="text"
                  />
                </S.Section>
                {!isOriginal && (
                  <S.Section>
                    <Link url="/pricing" label="Change Subscription">
                      Change Subscription
                    </Link>
                  </S.Section>
                )}
                <S.Section>
                  <Link
                    url="/account/subscription"
                    label="Subscription Details"
                  >
                    Subscription Details
                  </Link>
                </S.Section>
                {!isOriginal && (
                  <S.Section>
                    <Button
                      handleClick={() => setIsSharedOpen(true)}
                      buttonSize="medium"
                      classType="text"
                    >
                      <span>
                        Cancel Subscription <RemoveAccountIcon />
                      </span>
                    </Button>
                  </S.Section>
                )}
              </>
            )}
            <ModalComponent isOpen={isOpen} title={`Confirm Account Deletion`}>
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
                  <Button
                    buttonSize="small"
                    handleClick={() => setIsOpen(false)}
                  >
                    No
                  </Button>
                </S.ModalBtn>
              </S.ModalWrapper>
            </ModalComponent>
            <ModalComponent
              isOpen={isSharedOpen}
              title={`Confirm Remove Shared Account Access`}
            >
              <S.ModalWrapper>
                <span>
                  Are you sure you want to remove shared account access from
                  {currentUser?.shared_account_email}?
                </span>
                <S.ModalBtn>
                  <Button
                    buttonSize="small"
                    handleClick={removeSharedAccess}
                    classType="register"
                  >
                    Yes
                  </Button>
                  <Button
                    buttonSize="small"
                    handleClick={() => setIsSharedOpen(false)}
                  >
                    No
                  </Button>
                </S.ModalBtn>
              </S.ModalWrapper>
            </ModalComponent>
            <ModalComponent
              isOpen={isCancelOpen}
              title={`Confirm Cancel Subscription`}
            >
              <S.ModalWrapper>
                <span>Are you sure you want to cancel your subscription?</span>
                <S.ModalBtn>
                  <Button
                    buttonSize="small"
                    handleClick={cancelSubscription}
                    classType="register"
                  >
                    Yes
                  </Button>
                  <Button
                    buttonSize="small"
                    handleClick={() => setIsCancelOpen(false)}
                  >
                    No
                  </Button>
                </S.ModalBtn>
              </S.ModalWrapper>
            </ModalComponent>
          </>
        </S.ContentWrapper>
        <img
          src="/images/account.jpg"
          width="250px"
          height="auto"
          alt="account settings and details"
        />
      </S.Wrapper>
    </>
  );
};

export default Account;
