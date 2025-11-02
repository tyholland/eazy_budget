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
import { startTrialPlan } from "../../requests/referral.ts";
import { trackError, trackEvent } from "../../functions/mixpanel.ts";

const AccountMedal = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openDiscountModal, setOpenDiscountModal] = useState<boolean>(false);
  const [openTrialModal, setOpenTrialModal] = useState<boolean>(false);
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);

  if (!currentUser) {
    return <Loading />;
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
  const foreverFree = isOriginal || isTester;
  const isFree = !foreverFree && !isStarter && !isPro && isTrial;
  const isPaid = !foreverFree && (isStarter || isPro);

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

  return (
    <>
      <S.Wrapper>
        <S.Item>
          {totalPoints >= 0 && totalPoints < 30 && (
            <>
              <SadIcon size={40} />
              <S.Title className="medalName">No Medal</S.Title>
            </>
          )}
          {totalPoints >= 30 && totalPoints < 60 && (
            <>
              <MedalOne size={80} />
              <S.Title className="medalName">Bronze Medal</S.Title>
            </>
          )}
          {totalPoints >= 60 && totalPoints < 90 && (
            <>
              <MedalTwo size={40} />
              <S.Title className="medalName">Bronze Elite Medal</S.Title>
            </>
          )}
          {totalPoints >= 90 && totalPoints < 120 && (
            <>
              <MedalThree size={40} />
              <S.Title className="medalName">Silver Medal</S.Title>
            </>
          )}
          {totalPoints >= 120 && totalPoints < 150 && (
            <>
              <MedalFour size={40} />
              <S.Title className="medalName">Silver Elite Medal</S.Title>
            </>
          )}
          {totalPoints >= 150 && totalPoints < 180 && (
            <>
              <MedalFive size={40} />
              <S.Title className="medalName">Gold Medal</S.Title>
            </>
          )}
          {totalPoints >= 180 && (
            <>
              <MedalSix size={40} />
              <S.Title className="medalName">Gold Elite Medal</S.Title>
            </>
          )}
        </S.Item>
        <S.Item>
          <S.Title>Current Points:</S.Title>
          <div className="points">{totalPoints} / 180</div>
          <Button handleClick={() => setIsOpen(true)}>
            See Points per Task
          </Button>
        </S.Item>
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
              automatically applied to your account within 24 hours of claiming
              your prize.
            </div>
            <div>
              Here's how it works: complete the tasks below, earn points, and
              climb your way to 180 points to achieve the ultimate Gold Elite
              Medal status.
            </div>
            <div>Ready to play, save, and win? Let's go!</div>
          </S.Descript>
        )}
        <S.TaskContainer>
          <S.TaskSection>
            <S.Title>One time tasks</S.Title>
            <S.Item className="task">
              <div>Is Pro plan</div>{" "}
              {isPro && !isTrial ? <SaveIcon /> : <DisabledSaveIcon />}
            </S.Item>
            <S.Item className="task">
              <div>Is Starter plan</div>{" "}
              {isStarter && !isPro && !isTrial ? (
                <SaveIcon />
              ) : (
                <DisabledSaveIcon />
              )}
            </S.Item>
            <S.Item className="task">
              <div>Shared account</div>{" "}
              {shared_account ? <SaveIcon /> : <DisabledSaveIcon />}
            </S.Item>
            <S.Item className="task">
              <div>Added budget</div>{" "}
              {currentUser.hasBudget ? <SaveIcon /> : <DisabledSaveIcon />}
            </S.Item>
            <S.Item className="task">
              <div>Created an account</div> <SaveIcon />
            </S.Item>
            <S.Item className="task">
              <div>Add expense to “Non-Discretionary” category</div>{" "}
              {expenses_in_category_1 ? <SaveIcon /> : <DisabledSaveIcon />}
            </S.Item>
            <S.Item className="task">
              <div>Add expense to “Savings” category</div>{" "}
              {expenses_in_category_2 ? <SaveIcon /> : <DisabledSaveIcon />}
            </S.Item>
            <S.Item className="task">
              <div>Add expense to “Fun Money” category</div>{" "}
              {expenses_in_category_3 ? <SaveIcon /> : <DisabledSaveIcon />}
            </S.Item>
          </S.TaskSection>
        </S.TaskContainer>

        <S.TaskContainer>
          <S.TaskSection>
            <S.Title>{currentMonth} tasks</S.Title>
            <S.Item className="task">
              <div>Edit one expense per month</div>
              {edit_expense_in_month ? <SaveIcon /> : <DisabledSaveIcon />}
            </S.Item>
            <S.Item className="task">
              <div>Edit one income per month</div>
              {edit_income_in_month ? <SaveIcon /> : <DisabledSaveIcon />}
            </S.Item>
            <S.Item className="task">
              <div>Add one new category per month</div>
              {add_category_in_month ? <SaveIcon /> : <DisabledSaveIcon />}
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
              handleClick={() => {
                currentUser &&
                  setCurrentUser({
                    ...currentUser,
                    medal_game: {
                      ...currentUser.medal_game,
                      is_claimed: true,
                    },
                  });
                setOpenTrialModal(true);
              }}
            >
              Claim free 1-month trial of the Pro Plan
            </Button>
          </S.ClaimBtn>
        )}
      </S.Wrapper>
      <ModalComponent isOpen={isOpen} title={`Points Per Task`} size="medium">
        <S.ModalWrapper>
          <S.TaskContainer>
            <S.TaskSection>
              <S.Title>One time tasks</S.Title>
              <div className="task">Is Pro plan - 25 pts</div>
              <div className="task">Is Starter plan - 20 pts</div>
              <div className="task">
                Shared account - 15 pts <span>(Pro plan only)</span>
              </div>
              <div className="task">Added budget - 14 pts</div>
              <div className="task">Created an account - 10 pts</div>
              <div className="task">
                Add expense to “Non-Discretionary” category - 4 pts{" "}
                <span>(Pro plan only)</span>
              </div>
              <div className="task">
                Add expense to “Savings” category - 4 pts{" "}
                <span>(Pro plan only)</span>
              </div>
              <div className="task">
                Add expense to “Fun Money” category - 4 pts{" "}
                <span>(Pro plan only)</span>
              </div>
            </S.TaskSection>

            <S.TaskSection>
              <S.Title>{currentMonth} tasks</S.Title>
              <div className="task">Edit one expense per month - 7 pts</div>
              <div className="task">Edit one income per month - 6 pts</div>
              <div className="task">
                Add one new category per month - 3 pts{" "}
                <span>(Pro plan only)</span>
              </div>
            </S.TaskSection>
          </S.TaskContainer>
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
            <Button
              buttonSize="small"
              handleClick={() => setOpenDiscountModal(false)}
            >
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
