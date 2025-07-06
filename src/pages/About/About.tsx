import React from "react";
import * as S from "./about.style.ts";

const About = () => {
  return (
    <S.Wrapper>
      <div>
        At <strong>Simple Budgeting</strong>, we believe managing your money
        shouldn't be overwhelming. That's why we built a platform that makes
        budgeting <strong>simple, visual, and stress-free</strong> — so you can
        focus on what matters most in your life.
      </div>
      <S.Section>
        <S.Title>How It Started</S.Title>
        <div>
          We were tired of juggling spreadsheets, apps that overcomplicate
          things, and subscription traps that promise simplicity but deliver
          frustration. So we decided to create something different:
        </div>
        <ul>
          <li>
            A budgeting tool that's <strong>clear and easy to use</strong>
          </li>
          <li>
            A visual-first design that helps you actually see where your money
            goes
          </li>
          <li>
            A system that doesn't require you to be a financial expert to stay
            on track
          </li>
        </ul>
        <div>
          Whether you're a student, freelancer, parent, or just tired of
          budgeting with pen and paper every month — Simple Budgeting is built
          for <strong>you</strong>.
        </div>
      </S.Section>

      <S.Section>
        <S.Title>Mission Statement</S.Title>
        <div>
          To empower individuals and families to take control of their finances
          through <strong>intuitive tools, smart forecasts</strong>, and{" "}
          <strong>no-nonsense budgeting</strong>.
        </div>
        <div>We aim to:</div>
        <ul>
          <li>Help you build better habits — without the guesswork</li>
          <li>Offer tools that grow with you — no hidden complexity</li>
          <li>
            Keep your data private and your experience ad-free (unless you
            choose otherwise)
          </li>
        </ul>
      </S.Section>

      <S.Section>
        <S.Title>What Makes Simple Budgeting Different?</S.Title>
        <ul>
          <li>No confusing dashboards</li>
          <li>No forced budgeting "systems"</li>
          <li>Just you, your numbers, and a clear plan</li>
          <li>Free version that's actually useful — not just a trial</li>
        </ul>
        <div>
          We're committed to keeping things simple, honest, and focused on
          helping people thrive — not just survive.
        </div>
      </S.Section>
    </S.Wrapper>
  );
};

export default About;
