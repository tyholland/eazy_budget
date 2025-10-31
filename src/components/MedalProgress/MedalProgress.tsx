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
import Link from "../Link/Link.tsx";

const MedalProgress = () => {
  const currentUser = useAtomValue(userAtom);

  const totalPoints = currentUser?.medal_game.total_medal_points || 0;

  return (
    <S.Wrapper>
      <S.Title>Medal Progress Tracker:</S.Title>
      {totalPoints <= 30 && (
        <S.ProgressBar>
          <SadIcon size={30} />
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
              className={totalPoints > 10 || totalPoints >= 15 ? "active" : ""}
            >
              &nbsp;
            </S.Block>
            <S.Block
              className={totalPoints > 15 || totalPoints >= 20 ? "active" : ""}
            >
              &nbsp;
            </S.Block>
            <S.Block
              className={totalPoints > 20 || totalPoints >= 25 ? "active" : ""}
            >
              &nbsp;
            </S.Block>
            <S.Block className={totalPoints === 30 ? "active" : ""}>
              &nbsp;
            </S.Block>
          </S.Meter>
          <MedalOne />
        </S.ProgressBar>
      )}
      {totalPoints > 30 && totalPoints <= 60 && (
        <S.ProgressBar>
          <MedalOne />
          <S.Meter>
            <S.Block
              className={totalPoints > 30 || totalPoints >= 35 ? "active" : ""}
            >
              &nbsp;
            </S.Block>
            <S.Block
              className={totalPoints > 35 || totalPoints >= 40 ? "active" : ""}
            >
              &nbsp;
            </S.Block>
            <S.Block
              className={totalPoints > 40 || totalPoints >= 45 ? "active" : ""}
            >
              &nbsp;
            </S.Block>
            <S.Block
              className={totalPoints > 45 || totalPoints >= 50 ? "active" : ""}
            >
              &nbsp;
            </S.Block>
            <S.Block
              className={totalPoints > 50 || totalPoints >= 55 ? "active" : ""}
            >
              &nbsp;
            </S.Block>
            <S.Block className={totalPoints === 60 ? "active" : ""}>
              &nbsp;
            </S.Block>
          </S.Meter>
          <MedalTwo />
        </S.ProgressBar>
      )}
      {totalPoints > 60 && totalPoints <= 90 && (
        <S.ProgressBar>
          <MedalTwo />
          <S.Meter>
            <S.Block
              className={totalPoints > 60 || totalPoints >= 65 ? "active" : ""}
            >
              &nbsp;
            </S.Block>
            <S.Block
              className={totalPoints > 65 || totalPoints >= 70 ? "active" : ""}
            >
              &nbsp;
            </S.Block>
            <S.Block
              className={totalPoints > 70 || totalPoints >= 75 ? "active" : ""}
            >
              &nbsp;
            </S.Block>
            <S.Block
              className={totalPoints > 75 || totalPoints >= 80 ? "active" : ""}
            >
              &nbsp;
            </S.Block>
            <S.Block
              className={totalPoints > 80 || totalPoints >= 85 ? "active" : ""}
            >
              &nbsp;
            </S.Block>
            <S.Block className={totalPoints === 90 ? "active" : ""}>
              &nbsp;
            </S.Block>
          </S.Meter>
          <MedalThree />
        </S.ProgressBar>
      )}
      {totalPoints > 90 && totalPoints <= 120 && (
        <S.ProgressBar>
          <MedalThree />
          <S.Meter>
            <S.Block
              className={totalPoints > 90 || totalPoints >= 95 ? "active" : ""}
            >
              &nbsp;
            </S.Block>
            <S.Block
              className={totalPoints > 95 || totalPoints >= 100 ? "active" : ""}
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
            <S.Block className={totalPoints === 120 ? "active" : ""}>
              &nbsp;
            </S.Block>
          </S.Meter>
          <MedalFour />
        </S.ProgressBar>
      )}
      {totalPoints > 120 && totalPoints <= 150 && (
        <S.ProgressBar>
          <MedalFour />
          <S.Meter>
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
            <S.Block className={totalPoints === 150 ? "active" : ""}>
              &nbsp;
            </S.Block>
          </S.Meter>
          <MedalFive />
        </S.ProgressBar>
      )}
      {totalPoints > 150 && totalPoints <= 180 && (
        <S.ProgressBar>
          <MedalFive />
          <S.Meter>
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
            <S.Block className={totalPoints === 180 ? "active" : ""}>
              &nbsp;
            </S.Block>
          </S.Meter>
          <MedalSix />
        </S.ProgressBar>
      )}
      <Link url="/account" label="Learn more">
        Learn more
      </Link>
    </S.Wrapper>
  );
};

export default MedalProgress;
