import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/Button/Button.tsx";
import * as S from "./account.style.ts";
import Link from "../../components/Link/Link.tsx";
import { useAtom, useSetAtom } from "jotai";
import Input from "../../components/Input/Input.tsx";
import ModalComponent from "../../components/Modal/Modal.tsx";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { incomeAtom } from "../../hook/IncomeAtom.ts";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";
import Loading from "../../components/Loading/Loading.tsx";
import {
  cancelUserSub,
  deleteUser,
  removeSharedAccount,
  startReferralPlan,
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
import moment from "moment-business-days";
import ReferralBtn from "../../components/ReferralBtn/ReferralBtn.tsx";

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
  const [isReferralOpen, setIsReferralOpen] = useState<boolean>(false);
  const [isSubActive, setIsSubActive] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
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
  const isTester = getSubscriptionStatus(
    "Tester",
    currentUser?.subscription_id,
  );
  const isReferrals = getSubscriptionStatus(
    "Referral",
    currentUser?.subscription_id,
  );
  const foreverFree = isOriginal || isTester || isReferrals;
  const isFree = !foreverFree && !isStarter && !isPro && !isTester;

  const logOutAccount = () => {
    setIsloading(true);
    setBudget([]);
    setIncome([]);
    setExpense([]);
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const deleteAccount = async () => {
    setDeleteError(false);

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      const result = await deleteUser(accessToken);

      if (result.success) {
        trackEvent("Delete Account");
        logOutAccount();
      } else {
        setDeleteError(true);
      }
    } catch (err) {
      trackError("Account - deleteAccount:", { result: err });
    }
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
          paypal_sub_id: null,
        });

      await cancelUserSub(accessToken, {
        paypal_sub: currentUser?.paypal_sub_id,
      });
      trackEvent("Cancel Subscription");
      setIsCancelOpen(false);
    } catch (err) {
      trackError("Account - cancelSubscription:", { result: err });
    }
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

  const startReferralTrial = async (plan: number) => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      currentUser &&
        setCurrentUser({
          ...currentUser,
          subscription_id: plan,
          subscribed_at: new Date(Date.now()).toISOString(),
        });

      await startReferralPlan(accessToken, {
        plan,
      });
      trackEvent("Start Referral Plan Trial");
      setIsReferralOpen(false);
    } catch (err) {
      trackError("Account - startReferralTrial:", { result: err });
    }
  };

  const handleClick = async () => {
    const codeText = document.querySelector("#referral_code");
    const text = codeText?.getAttribute("value");

    try {
      await navigator.clipboard.writeText(text || "");
      setIsCopied(true);
    } catch (err) {
      trackError("Account - handleClick:", { result: err });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {hasMessage && <SharedAccountMessage setHasMessage={setHasMessage} />}
      {currentUser?.subscription_id === 2 && <ReferralBtn type="account" />}
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
                {isFree && (
                  <S.Section>
                    <Link url="/pricing" label="Upgrade to Subscription">
                      Upgrade to Subscription
                    </Link>
                  </S.Section>
                )}
                <S.Section>
                  <Button
                    handleClick={() => {
                      isStarter || isPro
                        ? setIsSubActive(true)
                        : setIsOpen(true);
                    }}
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
            {selectedOption === "referrals" && (
              <>
                <S.Section>
                  <Input
                    label="referral_code"
                    labelValue="Code:"
                    onChange={() => {}}
                    onClick={handleClick}
                    placeHolder="Referral Code"
                    isReadOnly
                    defaultValue={`https://www.sbudgeting.com?referral=${currentUser?.referral_code || ""}`}
                    inputType="text"
                  />
                </S.Section>
                <S.Section>
                  <Input
                    label="referral_count"
                    labelValue="Count:"
                    onChange={() => {}}
                    placeHolder="Referral Count"
                    isDisabled
                    defaultValue={currentUser?.referral_count || ""}
                    inputType="text"
                  />
                </S.Section>
                <S.Section>
                  <Button
                    handleClick={() => setIsReferralOpen(true)}
                    buttonSize="medium"
                    classType="text"
                  >
                    <span>Choose Referral Plan</span>
                  </Button>
                </S.Section>
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
                    defaultValue={moment(currentUser?.subscribed_at).format(
                      "MM/DD/YYYY",
                    )}
                    inputType="text"
                  />
                </S.Section>
                <S.Section>
                  <Link
                    url="/account/subscription"
                    label="Subscription Details"
                  >
                    Subscription Details
                  </Link>
                </S.Section>
                {!foreverFree && (
                  <S.Section>
                    <Button
                      handleClick={() => setIsCancelOpen(true)}
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
                    handleClick={() => {
                      setIsOpen(false);
                      setDeleteError(false);
                    }}
                  >
                    No
                  </Button>
                </S.ModalBtn>
                {deleteError && (
                  <S.ErrorMsg>
                    Your account cannot be deleted at this time.
                    <br />
                    Please verify whether your subscription is still active.
                  </S.ErrorMsg>
                )}
              </S.ModalWrapper>
            </ModalComponent>
            <ModalComponent isOpen={isSubActive} title={`Active Subscription`}>
              <S.ModalWrapper>
                <span>
                  Your account currently has an active subscription. Please
                  cancel your subscription prior to requesting account deletion.
                </span>
                <S.ModalBtn>
                  <Button
                    buttonSize="small"
                    handleClick={() => {
                      setIsSubActive(false);
                    }}
                  >
                    Close
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
            <ModalComponent
              isOpen={isReferralOpen}
              title={`Choose Referral Plans`}
              size="medium"
            >
              <S.ModalWrapper>
                <span>
                  Which plan would you like to select for the year?
                  <br />
                  Please note that you must meet the required referral count to
                  be eligible for each option.
                </span>
                <S.ModalBtn className="referral">
                  <Button
                    buttonSize="medium"
                    handleClick={() => startReferralTrial(6)}
                    disabled={
                      currentUser && Number(currentUser.referral_count) < 5
                    }
                  >
                    <>
                      <span>Starter Plan</span>
                      <span>for 1 Year</span>
                    </>
                  </Button>
                  <Button
                    buttonSize="medium"
                    handleClick={() => startReferralTrial(7)}
                    disabled={
                      currentUser && Number(currentUser.referral_count) < 10
                    }
                  >
                    <>
                      <span>Pro Plan</span>
                      <span>for 1 Year</span>
                    </>
                  </Button>
                </S.ModalBtn>
                <S.ModalBtn>
                  <Button
                    buttonSize="small"
                    classType="exit"
                    handleClick={() => {
                      setIsReferralOpen(false);
                    }}
                  >
                    Close
                  </Button>
                </S.ModalBtn>
              </S.ModalWrapper>
            </ModalComponent>
            <ModalComponent isOpen={isCopied} title={`Referral Link Copied`}>
              <S.ModalWrapper>
                <span>
                  Your referral link has been copied to your clipboard. Share it
                  to gain more confirmed referrals.
                </span>
                <S.ModalBtn>
                  <Button
                    buttonSize="small"
                    handleClick={() => {
                      setIsCopied(false);
                    }}
                  >
                    Close
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
