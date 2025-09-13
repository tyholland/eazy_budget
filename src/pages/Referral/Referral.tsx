import React from "react";
import * as S from "./referral.style.ts";
import Link from "../../components/Link/Link.tsx";

const Referral = () => {
  return (
    <S.Wrapper>
      <S.Section>
        <S.Title>Simple Budgeting's Referral Program Game</S.Title>
        <strong>Game Duration: October 1-31, 2025</strong>
        <div>
          This October, Simple Budgeting is turning referrals into rewards! Join
          the <strong>Referral Program Game</strong> and earn premium
          access—just by helping others start budgeting.
        </div>
      </S.Section>
      <S.Section>
        <S.SubTitle>How to Participate</S.SubTitle>
        <div>
          <ol>
            <li>
              <Link url="/pricing" label="Sign Up for Free">
                Sign Up for Free
              </Link>
              <ul>
                <li>Anyone can join at no cost.</li>
                <li>
                  After{" "}
                  <Link url="/pricing" label="signing up">
                    signing up
                  </Link>
                  , enter your income and expenses to create your{" "}
                  <strong>budgeting profile</strong>.
                </li>
              </ul>
            </li>
            <li>
              <strong>Get Your Referral Code</strong>
              <ul>
                <li>
                  Your unique referral code will be available on your{" "}
                  <strong>account page</strong>.
                </li>
              </ul>
            </li>
            <li>
              <strong>Invite Friends & Family</strong>
              <ul>
                <li>Share your code with others.</li>
                <li>
                  For referrals to count, they must:
                  <ul>
                    <li>Create their own free account</li>
                    <li>
                      Enter their budgeting data to complete their profile
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <strong>Track Your Progress</strong>
              <ul>
                <li>
                  Monitor your referral count in real time as new participants
                  are confirmed.
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </S.Section>
      <S.Section>
        <S.SubTitle>Rewards</S.SubTitle>
        <div>
          <ul>
            <li>
              <strong>10 Confirmed Referrals</strong> → Unlock the{" "}
              <Link url="/privacy" label="Starter Plan FREE for 1 Year">
                Starter Plan FREE for 1 Year
              </Link>
            </li>
            <li>
              <strong>20 Confirmed Referrals</strong> → Unlock the{" "}
              <Link url="/privacy" label="Pro Plan FREE for 1 Year">
                Pro Plan FREE for 1 Year
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <strong>Note</strong>: After the one-year reward period ends, your
          account will automatically transition to the{" "}
          <strong>free plan</strong>.
        </div>
      </S.Section>
      <S.Section>
        <S.SubTitle>Why Join?</S.SubTitle>
        <div>
          <ul>
            <li>
              <strong>It's free</strong> to play.
            </li>
            <li>
              <strong>Help others</strong> take control of their finances.
            </li>
            <li>
              Earn <strong>premium Simple Budgeting access</strong> just by
              sharing.
            </li>
          </ul>
        </div>
      </S.Section>
      <S.Section className="disclaimer">
        Don't miss your chance—
        <Link url="/pricing" label="sign up">
          sign up
        </Link>
        <strong>
          , share your code, and win premium rewards this October!
        </strong>
      </S.Section>
    </S.Wrapper>
  );
};

export default Referral;
