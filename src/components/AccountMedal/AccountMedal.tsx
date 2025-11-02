import React, { useState } from "react";
import MedalOne from "../../svg/MedalOne.tsx";
import * as S from "./accountMedal.style.ts";
import MedalTwo from "../../svg/MedalTwo.tsx";
import MedalSix from "../../svg/MedalSix.tsx";
import MedalFive from "../../svg/MedalFive.tsx";
import MedalFour from "../../svg/MedalFour.tsx";
import MedalThree from "../../svg/MedalThree.tsx";
import SadIcon from "../../svg/SadIcon.tsx";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { getDateInfo, getSubscriptionStatus } from "../../functions/helper.ts";
import DisabledSaveIcon from "../../svg/DisabledSaveIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import Button from "../Button/Button.tsx";
import Loading from "../Loading/Loading.tsx";
import ModalComponent from "../Modal/Modal.tsx";

const AccountMedal = () => {
  const currentUser = useAtomValue(userAtom);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!currentUser) {
    return <Loading />;
  }

  const {
    total_medal_points,
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
  const foreverFree = isOriginal || isTester;
  const isFree = !foreverFree && !isStarter && !isPro;
  const isPaid = !foreverFree && (isStarter || isPro);

  const totalPoints = total_medal_points || 0;

  return (
    <>
      <S.Wrapper>
        <S.Item>
          {totalPoints >= 0 && totalPoints < 30 && (
            <>
              <SadIcon />
              <S.Title>No Medal</S.Title>
            </>
          )}
          {totalPoints >= 30 && totalPoints < 60 && (
            <>
              <MedalOne />
              <S.Title>Bronze</S.Title>
            </>
          )}
          {totalPoints >= 60 && totalPoints < 90 && (
            <>
              <MedalTwo />
              <S.Title>Bronze Elite</S.Title>
            </>
          )}
          {totalPoints >= 90 && totalPoints < 120 && (
            <>
              <MedalThree />
              <S.Title>Silver</S.Title>
            </>
          )}
          {totalPoints >= 120 && totalPoints < 150 && (
            <>
              <MedalFour />
              <S.Title>Silver Elite</S.Title>
            </>
          )}
          {totalPoints >= 150 && totalPoints < 180 && (
            <>
              <MedalFive />
              <S.Title>Gold</S.Title>
            </>
          )}
          {totalPoints >= 180 && (
            <>
              <MedalSix />
              <S.Title>Gold Elite</S.Title>
            </>
          )}
        </S.Item>
        <S.Item>
          <S.Title>Current Points:</S.Title>
          <div>{totalPoints} / 180</div>
        </S.Item>
        <Button handleClick={() => setIsOpen(true)}>See Points per Task</Button>
        {isFree && (
          <>
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
          </>
        )}
        {isPaid && (
          <>
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
          </>
        )}
        <S.Title>One time tasks</S.Title>
        <div>
          <S.Item>
            <div>Is Pro plan</div> {isPro ? <SaveIcon /> : <DisabledSaveIcon />}
          </S.Item>
          <S.Item>
            <div>Is Starter plan</div>{" "}
            {isStarter && !isPro ? <SaveIcon /> : <DisabledSaveIcon />}
          </S.Item>
          <S.Item>
            <div>Shared account</div>{" "}
            {shared_account ? <SaveIcon /> : <DisabledSaveIcon />}
          </S.Item>
          <S.Item>
            <div>Added budget</div>{" "}
            {currentUser.hasBudget ? <SaveIcon /> : <DisabledSaveIcon />}
          </S.Item>
          <S.Item>
            <div>Created an account</div> <SaveIcon />
          </S.Item>
          <S.Item>
            <div>Add expense to “Non-Discretionary” category</div>{" "}
            {expenses_in_category_1 ? <SaveIcon /> : <DisabledSaveIcon />}
          </S.Item>
          <S.Item>
            <div>Add expense to “Savings” category</div>{" "}
            {expenses_in_category_2 ? <SaveIcon /> : <DisabledSaveIcon />}
          </S.Item>
          <S.Item>
            <div>Add expense to “Fun Money” category</div>{" "}
            {expenses_in_category_3 ? <SaveIcon /> : <DisabledSaveIcon />}
          </S.Item>
        </div>

        <S.Title>{currentMonth} tasks</S.Title>
        <div>
          <S.Item>
            <div>Edit one expense per month</div>
            {edit_expense_in_month ? <SaveIcon /> : <DisabledSaveIcon />}
          </S.Item>
          <S.Item>
            <div>Edit one income per month</div>
            {edit_income_in_month ? <SaveIcon /> : <DisabledSaveIcon />}
          </S.Item>
          <S.Item>
            <div>Add one new category per month</div>
            {add_category_in_month ? <SaveIcon /> : <DisabledSaveIcon />}
          </S.Item>
        </div>

        {isPaid && totalPoints >= 180 && (
          <Button>Claim free 1-month discount</Button>
        )}
        {isFree && totalPoints >= 180 && (
          <Button>Claim free 1-month trial of the Pro Plan</Button>
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
    </>
  );
};

export default AccountMedal;
