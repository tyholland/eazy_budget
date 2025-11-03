import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as S from "./login.style.ts";
import Loading from "../../components/Loading/Loading.tsx";
import { useNavigate } from "react-router-dom";
import Link from "../../components/Link/Link.tsx";
import { loggedInHomepage } from "../../functions/helper.ts";

const Login = () => {
  const { isLoading, user } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    navigate(loggedInHomepage(undefined));
  }

  return (
    <S.Wrapper>
      <S.Section>
        <img
          src="/images/login.jpg"
          width="500px"
          height="auto"
          alt="account settings and details"
        />
        <S.Catchphrase>
          <h1>
            Tired of using pen and paper to track your monthly expenses every
            single month?
          </h1>
          <Link
            url="/pricing"
            classType="button"
            label="Get Started"
            linkSize="large"
          >
            Get Started
          </Link>
        </S.Catchphrase>
      </S.Section>
      <S.Section className="title">
        <h2>
          Simple Budgeting makes budgeting effortless—just enter your expenses
          once, and they'll be automatically applied to each month of the year.
        </h2>
      </S.Section>
      <S.Videos>
        <h2>
          Simply enter your income and expenses during setup, and let the system
          automatically apply them across the entire year—saving you time and
          ensuring consistent financial planning.
        </h2>
        <video width="650" height="auto" muted loop controls>
          <source src="/videos/create-budget.mp4" type="video/mp4" />
          <img
            src="/images/homepage-create.png"
            width="650px"
            height="453px"
            alt="create your entire budget strategy"
          />
        </video>
      </S.Videos>
      <S.Videos className="reverse">
        <h2>
          Easily customize your budget—edit existing items or add new expenses
          to keep your financial plan accurate and up to date.
        </h2>
        <video width="650" height="auto" muted loop controls>
          <source src="/videos/add-edit-budget.mp4" type="video/mp4" />
          <img
            src="/images/homepage-add-edit.png"
            width="650px"
            height="453px"
            alt="add and/or edit specific budget item"
          />
        </video>
      </S.Videos>
      <S.Pitch>
        <h2>
          Ready to take control of your finances and build a smarter financial
          future?
        </h2>
        <Link
          url="/pricing"
          classType="button"
          label="Get Started Now"
          linkSize="large"
        >
          Get Started Now
        </Link>
      </S.Pitch>
    </S.Wrapper>
  );
};

export default Login;
