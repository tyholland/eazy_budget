import React from "react";
import MedalOne from "../../svg/MedalOne.tsx";
import * as S from "./medalProgress.style.ts";
import MedalTwo from "../../svg/MedalTwo.tsx";
import MedalSix from "../../svg/MedalSix.tsx";
import MedalFive from "../../svg/MedalFive.tsx";
import MedalFour from "../../svg/MedalFour.tsx";
import MedalThree from "../../svg/MedalThree.tsx";
import SadIcon from "../../svg/SadIcon.tsx";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";

const MedalProgress = () => {
  const currentUser = useAtomValue(userAtom);

  const totalPoints = currentUser?.medal_game.total_medal_points || 0;

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
  const percent = Math.ceil((totalPoints / 180) * 100);

  return (
    <>
      <S.Wrapper>
        <S.BudgetContent>
          <S.Section>
            <div>{activeLevel?.icon}</div>
            <div className="name">
              <S.Title>{activeLevel?.name}</S.Title>
              <div>{activeLevel?.phrase}</div>
            </div>
          </S.Section>
          <S.ProgressBar>
            <S.Meter>
              <S.Block
                className={totalPoints > 0 || totalPoints >= 5 ? "active" : ""}
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={totalPoints > 5 || totalPoints >= 10 ? "active" : ""}
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 10 || totalPoints >= 15 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 15 || totalPoints >= 20 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 20 || totalPoints >= 25 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 25 || totalPoints >= 30 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 30 || totalPoints >= 35 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 35 || totalPoints >= 40 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 40 || totalPoints >= 45 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 45 || totalPoints >= 50 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 50 || totalPoints >= 55 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 55 || totalPoints >= 60 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 60 || totalPoints >= 65 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 65 || totalPoints >= 70 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 70 || totalPoints >= 75 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 75 || totalPoints >= 80 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 80 || totalPoints >= 85 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 85 || totalPoints >= 90 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 90 || totalPoints >= 95 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 95 || totalPoints >= 100 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 100 || totalPoints >= 105 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 105 || totalPoints >= 110 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 110 || totalPoints >= 115 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 115 || totalPoints >= 120 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 120 || totalPoints >= 125 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 125 || totalPoints >= 130 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 130 || totalPoints >= 135 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 135 || totalPoints >= 140 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 140 || totalPoints >= 145 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 145 || totalPoints >= 150 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 150 || totalPoints >= 155 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 155 || totalPoints >= 160 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 160 || totalPoints >= 165 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 165 || totalPoints >= 170 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block
                className={
                  totalPoints > 170 || totalPoints >= 175 ? "active" : ""
                }
              >
                &nbsp;
              </S.Block>
              <S.Block className={totalPoints >= 180 ? "active" : ""}>
                &nbsp;
              </S.Block>
            </S.Meter>
          </S.ProgressBar>
          <div className="points">{totalPoints} / 180 points</div>
        </S.BudgetContent>
        <div>
          <S.PercentWrapper>
            <div className="percent">
              {percent}%<span>complete</span>
            </div>
          </S.PercentWrapper>
        </div>
      </S.Wrapper>
      {activeLevel?.next && (
        <S.Next>
          <div>
            Next Medal: <span>{activeLevel.next}</span>
          </div>
          <div className="unlock">Unlocks at {activeLevel.endTotal} points</div>
        </S.Next>
      )}
    </>
  );
};

export default MedalProgress;
