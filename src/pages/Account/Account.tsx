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
  updateUserCurrency,
} from "../../requests/users.ts";
import AccountNav from "../../views/AccountNav/AccountNav.tsx";
import {
  checkIsExpiredSession,
  getDateInfo,
  getSubscriptionName,
  getSubscriptionStatus,
} from "../../functions/helper.ts";
import { userAtom } from "../../hook/UserAtom.ts";
import ViewIcon from "../../svg/ViewIcon.tsx";
import RemoveAccountIcon from "../../svg/RemoveAccountIcon.tsx";
import HistoryIcon from "../../svg/HistoryIcon.tsx";
import ShareAccountIcon from "../../svg/ShareAccountIcon.tsx";
import SharedAccountMessage from "../../components/SharedAccountMessage/SharedAccountMessage.tsx";
import { trackError, trackEvent } from "../../functions/mixpanel.ts";
import moment from "moment-business-days";
import SelectComponent from "../../components/Select/Select.tsx";
import { currencyList } from "../../constants.ts";
import SessionExpired from "../../components/SessionExpired/SessionExpired.tsx";
import { ClientReferrals } from "../../types.ts";
import { Tooltip as ReactTooltip } from "react-tooltip";
import EditIcon from "../../svg/EditIcon.tsx";
import { updateReferralName } from "../../requests/referral.ts";

const Account = () => {
  const { logout, getAccessTokenSilently } = useAuth0();
  const params = new URLSearchParams(window.location.search);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const setBudget = useSetAtom(budgetAtom);
  const setIncome = useSetAtom(incomeAtom);
  const setExpense = useSetAtom(expenseAtom);
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSharedOpen, setIsSharedOpen] = useState<boolean>(false);
  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);
  const [isSubActive, setIsSubActive] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isClientNameOpen, setIsClientNameOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    params.get("nav") || "settings",
  );
  const [clientFirstName, setClientFirstName] = useState<string>("");
  const [clientLastName, setClientLastName] = useState<string>("");
  const [currentClient, setCurrentClient] = useState<ClientReferrals | null>(
    null,
  );
  const [hasMessage, setHasMessage] = useState<boolean | undefined>(
    currentUser?.connected_message,
  );
  const [currencyModal, setCurrencyModal] = useState<boolean>(false);
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
  const defaultCurrency = currencyList.filter(
    (item) => item.label === currentUser?.currency,
  )[0];
  const [userCurrency, setUserCurrency] = useState<string>(
    defaultCurrency?.label,
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
  const isPartnerAdmin = getSubscriptionStatus(
    "Admin",
    currentUser?.subscription_id,
  );
  const foreverFree = isOriginal || isTester;
  const isFree = !foreverFree && !isStarter && !isPro;
  const plan = params.get("plan");

  plan && localStorage.setItem("plan", plan);

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

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
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

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
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

      logOutAccount();
    } catch (err) {
      trackError("Account - removeSharedAccess:", { result: err });

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
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

  const updateCurrency = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      currentUser &&
        setCurrentUser({
          ...currentUser,
          currency: userCurrency,
        });

      await updateUserCurrency(accessToken, { currency: userCurrency });
      trackEvent("Update User Currency");
    } catch (err) {
      trackError("Account - updateCurrency:", { result: err });

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
    }
  };

  const updateClientName = async (user_id: number | undefined) => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      currentUser &&
        setCurrentUser({
          ...currentUser,
          all_referrals: currentUser.all_referrals.map((item) => {
            if (item.id === user_id) {
              item.first_name = clientFirstName;
              item.last_name = clientLastName;
            }

            return item;
          }),
        });

      const data = {
        first_name: clientFirstName,
        last_name: clientLastName,
        user_id,
        referral_code: currentUser?.referral_code,
      };

      await updateReferralName(accessToken, data);
      trackEvent("Update Client Name");
    } catch (err) {
      trackError("Account - updateClientName:", { result: err });

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
    }
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
                {!isPartnerAdmin &&
                  isPro &&
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
                {isPro && (
                  <S.Section>
                    <Button
                      handleClick={() => setCurrencyModal(true)}
                      buttonSize="medium"
                      classType="text"
                    >
                      <span>Change Currency</span>
                    </Button>
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
            {selectedOption === "admin" && (
              <>
                <S.Section>
                  <Input
                    label="referral_code"
                    labelValue="Referral Link:"
                    onChange={() => {}}
                    onClick={handleClick}
                    placeHolder="Referral Code"
                    isReadOnly
                    defaultValue={`https://www.sbudgeting.com/client?referral=${currentUser?.referral_code || ""}`}
                    inputType="text"
                  />
                </S.Section>
                {currentUser && (
                  <>
                    {currentUser.all_referrals.length === 0 && (
                      <div>
                        You currently don't have any clients connected to your
                        account. Click the referral link above to copy it and
                        share it with your clients to get them started.
                      </div>
                    )}
                    {currentUser.all_referrals.length > 0 &&
                      currentUser.all_referrals.map((item: ClientReferrals) => {
                        if (!!item.first_name) {
                          return (
                            <S.AdminSection key={item.email}>
                              {item.first_name} {item.last_name}
                              <span data-tooltip-id="client-account">
                                <Link
                                  url={`/account/partner/client/${item.id}`}
                                  label="view client account"
                                >
                                  <ViewIcon />
                                </Link>
                              </span>
                            </S.AdminSection>
                          );
                        }

                        return (
                          <S.AdminSection key={item.email}>
                            <div>{item.email}</div>
                            <span data-tooltip-id="client-account">
                              <Link
                                url={`/account/partner/client/${item.id}`}
                                label="view client account"
                              >
                                <ViewIcon />
                              </Link>
                            </span>
                            <span data-tooltip-id="client-detail">
                              <Button
                                classType="text"
                                handleClick={() => {
                                  setIsClientNameOpen(true);
                                  setCurrentClient(item);
                                }}
                              >
                                <EditIcon />
                              </Button>
                            </span>
                          </S.AdminSection>
                        );
                      })}
                  </>
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
                {!isOriginal && !isTester && (
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
            <ModalComponent isOpen={isCopied} title={`Referral Link Copied`}>
              <S.ModalWrapper>
                <span>
                  Your unique referral link has been copied to your clipboard.
                  Share it with your clients so they can use it to sign up
                  directly under your partnership account.
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
            <ModalComponent
              isOpen={currencyModal}
              title={`Change Your Currency`}
            >
              <S.ModalWrapper>
                <SelectComponent
                  options={currencyList}
                  placeHolder="Currency"
                  defaultValue={defaultCurrency?.label}
                  setOption={(val) => setUserCurrency(val)}
                />
                <S.ModalBtn>
                  <Button
                    buttonSize="small"
                    handleClick={() => setCurrencyModal(false)}
                    classType="register"
                  >
                    Cancel
                  </Button>
                  <Button buttonSize="small" handleClick={updateCurrency}>
                    Submit
                  </Button>
                </S.ModalBtn>
              </S.ModalWrapper>
            </ModalComponent>
            <ModalComponent
              isOpen={isClientNameOpen}
              title={`Add Client's first & last name`}
            >
              <S.ModalWrapper>
                <Input
                  label="first_name"
                  labelValue="First Name:"
                  onChange={(e) => setClientFirstName(e.target.value)}
                  placeHolder="First Name"
                  inputType="text"
                />
                <Input
                  label="last_name"
                  labelValue="Last Name:"
                  onChange={(e) => setClientLastName(e.target.value)}
                  placeHolder="Last Name"
                  inputType="text"
                />
                <S.ModalBtn>
                  <Button
                    buttonSize="small"
                    handleClick={() => setIsClientNameOpen(false)}
                    classType="exit"
                  >
                    Cancel
                  </Button>
                  <Button
                    buttonSize="small"
                    handleClick={() => {
                      updateClientName(currentClient?.id);
                      setCurrentClient(null);
                      setIsClientNameOpen(false);
                    }}
                    disabled={
                      clientFirstName.length === 0 ||
                      clientLastName.length === 0
                    }
                  >
                    Save
                  </Button>
                </S.ModalBtn>
              </S.ModalWrapper>
            </ModalComponent>
            <ReactTooltip
              id="client-account"
              place="top"
              variant="info"
              content={`View client's monthly budget`}
              className="tooltip"
            />
            <ReactTooltip
              id="client-detail"
              place="top"
              variant="info"
              content={`Add client's first and last name`}
              className="tooltip"
            />
          </>
        </S.ContentWrapper>
        <img
          src="/images/account.jpg"
          width="250px"
          height="auto"
          alt="account settings and details"
        />
        <SessionExpired
          isOpen={isSessionExpired}
          closeModal={setIsSessionExpired}
        />
      </S.Wrapper>
    </>
  );
};

export default Account;
