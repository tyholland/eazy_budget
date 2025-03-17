import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/Button/Button.tsx";
import * as S from "./account.style.ts";
import Link from "../../components/Link/Link.tsx";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import Input from "../../components/Input/Input.tsx";

const Account = () => {
  const { logout } = useAuth0();
  const user = useAtomValue(userAtom);

  return (
    <S.Wrapper>
      <div>
        <Input
          label="email"
          labelValue="Email:"
          onChange={() => {}}
          placeHolder="Enter your email"
          isDisabled
          defaultValue={user?.name?.toLowerCase() || ""}
          inputType="text"
        />
      </div>
      <div>
        <Link url="/account/history" label="View Budget History">
          View Budget History
        </Link>
      </div>
      <Button
        handleClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        buttonSize="medium"
      >
        Delete Acoount
      </Button>
      <Button
        handleClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        buttonSize="medium"
      >
        Log Out
      </Button>
    </S.Wrapper>
  );
};

export default Account;
