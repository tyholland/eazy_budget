import React, { useState } from "react";
import MedalOne from "../../svg/MedalOne.tsx";
import * as S from "./accountMedal.style.ts";
import MedalTwo from "../../svg/MedalTwo.tsx";
import MedalSix from "../../svg/MedalSix.tsx";
import MedalFive from "../../svg/MedalFive.tsx";
import MedalFour from "../../svg/MedalFour.tsx";
import MedalThree from "../../svg/MedalThree.tsx";
import SadIcon from "../../svg/SadIcon.tsx";
import { useAtom } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import {
  checkIsExpiredSession,
  getDateInfo,
  getSubscriptionStatus,
} from "../../functions/helper.ts";
import DisabledSaveIcon from "../../svg/DisabledSaveIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import Button from "../Button/Button.tsx";
import Loading from "../Loading/Loading.tsx";
import ModalComponent from "../Modal/Modal.tsx";
import SessionExpired from "../SessionExpired/SessionExpired.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { startTrialPlan, updateMedalGame } from "../../requests/referral.ts";
import { trackError, trackEvent } from "../../functions/mixpanel.ts";
import ViewIcon from "../../svg/ViewIcon.tsx";

const AccountMedal = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openDiscountModal, setOpenDiscountModal] = useState<boolean>(false);
  const [openTrialModal, setOpenTrialModal] = useState<boolean>(false);
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);

  if (!currentUser) {
    return <Loading isText />;
  }

  const {
    total_medal_points,
    is_claimed,
    shared_account,
    expenses_in_category_1,
    expenses_in_category_2,
    expenses_in_category_3,
    edit_expense_in_month,
    edit_income_in_month,
    add_category_in_month,
  } = currentUser.medal_game;

  const { currentMonth } = getDateInfo();
  const isPro = getSubscriptionStatus("Pro", currentUser.subscription_id);
  const isStarter = getSubscriptionStatus(
    "Starter",
    currentUser.subscription_id,
  );
  const isOriginal = getSubscriptionStatus("OG", currentUser.subscription_id);
  const isTester = getSubscriptionStatus("Tester", currentUser.subscription_id);
  const isTrial = getSubscriptionStatus("Trial", currentUser.subscription_id);
  const isClient = getSubscriptionStatus("Client", currentUser.subscription_id);
  const foreverFree = isOriginal || isTester;
  const isFree = !foreverFree && !isStarter && !isPro && isTrial;
  const isPaid = !foreverFree && (isStarter || isPro || isClient);

  const totalPoints = total_medal_points || 0;

  const setupTrialPlan = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      currentUser &&
        setCurrentUser({
          ...currentUser,
          subscription_id: 10,
          subscribed_at: new Date(Date.now()).toISOString(),
          medal_game: {
            ...currentUser.medal_game,
            is_claimed: true,
          },
        });

      setOpenTrialModal(false);

      await startTrialPlan(accessToken, { plan: 10 });
      trackEvent("Start Medal Game Trial Pro Plan");
    } catch (err) {
      trackError("AccountMedal - setupTrialPlan:", { result: err });

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
    }
  };

  const discountAccount = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      currentUser &&
        setCurrentUser({
          ...currentUser,
          medal_game: {
            ...currentUser.medal_game,
            is_claimed: true,
          },
        });

      setOpenDiscountModal(false);

      await updateMedalGame(accessToken, { is_claimed: true });
      trackEvent("Discount Paid Account");
    } catch (err) {
      trackError("AccountMedal - discountAccount:", { result: err });

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
    }
  };

  const levels = [
    {
      isActive: totalPoints <= 30,
      endTotal: 30,
      icon: <SadIcon size={100} />,
      name: "No Medal",
      next: "Bronze Medal",
      phrase: "Every great budget starts with one step.",
    },
    {
      isActive: totalPoints > 30 && totalPoints <= 60,
      endTotal: 60,
      icon: <MedalOne size={100} />,
      name: "Bronze Medal",
      next: "Bronze Elite Medal",
      phrase: "You're building momentum — keep going.",
    },
    {
      isActive: totalPoints > 60 && totalPoints <= 90,
      endTotal: 90,
      icon: <MedalTwo size={100} />,
      name: "Bronze Elite Medal",
      next: "Silver Medal",
      phrase: "Progress looks good on you.",
    },
    {
      isActive: totalPoints > 90 && totalPoints <= 120,
      endTotal: 120,
      icon: <MedalThree size={100} />,
      name: "Silver Medal",
      next: "Silver Elite Medal",
      phrase: "You're turning habits into confidence.",
    },
    {
      isActive: totalPoints > 120 && totalPoints <= 150,
      endTotal: 150,
      icon: <MedalFour size={100} />,
      name: "Silver Elite Medal",
      next: "Gold Medal",
      phrase: "This is consistency paying off.",
    },
    {
      isActive: totalPoints > 150,
      endTotal: 180,
      icon: <MedalFive size={100} />,
      name: "Gold Medal",
      next: "Gold Elite Medal",
      phrase: "You're in control now — finish strong.",
    },
    {
      isActive: totalPoints >= 180,
      endTotal: 180,
      icon: <MedalSix size={100} />,
      name: "Gold Elite Medal",
      next: null,
      phrase: "Budget complete. Confidence unlocked.",
    },
  ];

  const activeLevel = levels.find((level) => level.isActive);
  let oneCount: number = 2;
  let monthCount: number = 0;

  oneCount = edit_expense_in_month ? oneCount + 1 : oneCount;
  oneCount = is_claimed ? oneCount + 1 : oneCount;
  oneCount = shared_account ? oneCount + 1 : oneCount;
  oneCount = expenses_in_category_1 ? oneCount + 1 : oneCount;
  oneCount = expenses_in_category_2 ? oneCount + 1 : oneCount;
  oneCount = expenses_in_category_3 ? oneCount + 1 : oneCount;

  monthCount = edit_expense_in_month ? monthCount + 1 : monthCount;
  monthCount = edit_income_in_month ? monthCount + 1 : monthCount;
  monthCount = add_category_in_month ? monthCount + 1 : monthCount;

  return (
    <>
      <S.Wrapper>
        <S.Item className="header">
          {activeLevel?.icon}
          <div className="wrapper">
            <S.Title className="medalName">{activeLevel?.name}</S.Title>
            <div className="pointWrapper">
              <S.Title>Current Points:</S.Title>
              <div className="points">{totalPoints} / 180</div>
            </div>
            <div className="pointWrapper">
              <S.Title>Next Medal:</S.Title>
              <div className="points">{activeLevel?.next}</div>
            </div>
          </div>
          <Button handleClick={() => setIsOpen(true)}>
            <>
              <ViewIcon /> Game Details
            </>
          </Button>
        </S.Item>

        <S.TaskContainer>
          <S.TaskSection>
            <S.Title>
              <div>One time tasks</div>
              <div className="complete">{oneCount} of 8 complete</div>
            </S.Title>
            <S.Item>
              <div className="task">
                {(isPro || isClient) && !isTrial ? (
                  <SaveIcon />
                ) : (
                  <DisabledSaveIcon />
                )}
                <div>Is Pro plan</div>
              </div>
              <div className="points">+25 points</div>
            </S.Item>
            <S.Item>
              <div className="task">
                {isStarter && !isPro && !isTrial ? (
                  <SaveIcon />
                ) : (
                  <DisabledSaveIcon />
                )}
                <div>Is Starter plan</div>
              </div>
              <div className="points">+20 points</div>
            </S.Item>
            <S.Item>
              <div className="task">
                {shared_account ? <SaveIcon /> : <DisabledSaveIcon />}
                <div>Shared account</div>
              </div>
              <div className="points">
                +15 points<span>(Pro plan only)</span>
              </div>
            </S.Item>
            <S.Item>
              <div className="task">
                {currentUser.hasBudget ? <SaveIcon /> : <DisabledSaveIcon />}
                <div>Added budget</div>
              </div>
              <div className="points">+14 points</div>
            </S.Item>
            <S.Item>
              <div className="task">
                <SaveIcon /> <div>Created an account</div>
              </div>
              <div className="points">+10 points</div>
            </S.Item>
            <S.Item>
              <div className="task">
                {expenses_in_category_1 ? <SaveIcon /> : <DisabledSaveIcon />}
                <div>Add expense to “Non-Discretionary” category</div>
              </div>
              <div className="points">
                +4 points<span>(Pro plan only)</span>
              </div>
            </S.Item>
            <S.Item>
              <div className="task">
                {expenses_in_category_2 ? <SaveIcon /> : <DisabledSaveIcon />}
                <div>Add expense to “Savings” category</div>
              </div>
              <div className="points">
                +4 points<span>(Pro plan only)</span>
              </div>
            </S.Item>
            <S.Item>
              <div className="task">
                {expenses_in_category_3 ? <SaveIcon /> : <DisabledSaveIcon />}
                <div>Add expense to “Fun Money” category</div>
              </div>
              <div className="points">
                +4 points<span>(Pro plan only)</span>
              </div>
            </S.Item>
          </S.TaskSection>
        </S.TaskContainer>

        <S.TaskContainer>
          <S.TaskSection>
            <S.Title>
              <div>Monthly tasks - {currentMonth}</div>
              <div className="complete">{monthCount} of 3 complete</div>
            </S.Title>
            <S.Item>
              <div className="task">
                {edit_expense_in_month ? <SaveIcon /> : <DisabledSaveIcon />}
                <div>Edit one expense per month</div>
              </div>
              <div className="points">+7 points</div>
            </S.Item>
            <S.Item>
              <div className="task">
                {edit_income_in_month ? <SaveIcon /> : <DisabledSaveIcon />}
                <div>Edit one income per month</div>
              </div>
              <div className="points">+6 points</div>
            </S.Item>
            <S.Item>
              <div className="task">
                {add_category_in_month ? <SaveIcon /> : <DisabledSaveIcon />}
                <div>Add one new category per month</div>
              </div>
              <div className="points">
                +3 points<span>(Pro plan only)</span>
              </div>
            </S.Item>
          </S.TaskSection>
        </S.TaskContainer>

        {isPaid && totalPoints >= 180 && !is_claimed && (
          <S.ClaimBtn>
            <Button
              buttonSize="large"
              handleClick={() => setOpenDiscountModal(true)}
            >
              Claim free 1-month discount
            </Button>
          </S.ClaimBtn>
        )}
        {isFree && totalPoints >= 180 && !is_claimed && (
          <S.ClaimBtn>
            <Button
              buttonSize="large"
              handleClick={() => setOpenTrialModal(true)}
            >
              Claim free 1-month trial of the Pro Plan
            </Button>
          </S.ClaimBtn>
        )}
      </S.Wrapper>
      <ModalComponent isOpen={isOpen} title={`Game Details`} size="medium">
        <S.ModalWrapper>
          {isFree && (
            <S.Descript>
              <div>
                Take part in the Medal Game and earn a free 1-month trial of the
                Pro Plan, applied to your account once you claim your prize.
              </div>
              <div>
                Complete the tasks below, rack up points, and aim for 180 points
                to achieve the ultimate Gold Elite Medal.
              </div>
              <div>
                Ready to level up your budgeting skills and claim your reward?
                Let's play smart and win big!
              </div>
            </S.Descript>
          )}
          {isPaid && (
            <S.Descript>
              <div>
                Join the Medal Challenge and unlock a free 1-month discount —
                automatically applied to your account within 24 hours of
                claiming your prize.
              </div>
              <div>
                Here's how it works: complete the tasks below, earn points, and
                climb your way to 180 points to achieve the ultimate Gold Elite
                Medal status.
              </div>
              <div>Ready to play, save, and win? Let's go!</div>
            </S.Descript>
          )}
          <S.ModalBtn>
            <Button
              buttonSize="small"
              handleClick={() => {
                setIsOpen(false);
              }}
            >
              Close
            </Button>
          </S.ModalBtn>
        </S.ModalWrapper>
      </ModalComponent>
      <ModalComponent
        isOpen={openDiscountModal}
        title={`Free 1-month discount`}
      >
        <S.ModalWrapper>
          <span>Discount will be applied within 24 hours</span>
          <S.ModalBtn>
            <Button buttonSize="small" handleClick={discountAccount}>
              Close
            </Button>
          </S.ModalBtn>
        </S.ModalWrapper>
      </ModalComponent>
      <ModalComponent
        isOpen={openTrialModal}
        title={`Free 1-month trial of Pro Plan`}
      >
        <S.ModalWrapper>
          <span>Claim your Pro Plan - 1 Month Trial</span>
          <S.ModalBtn>
            <Button buttonSize="small" handleClick={setupTrialPlan}>
              Claim
            </Button>
          </S.ModalBtn>
        </S.ModalWrapper>
      </ModalComponent>
      <SessionExpired
        isOpen={isSessionExpired}
        closeModal={setIsSessionExpired}
      />
    </>
  );
};

export default AccountMedal;
