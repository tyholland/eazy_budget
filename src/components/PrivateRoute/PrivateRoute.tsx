import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading.tsx";
import { useAtom, useSetAtom } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { userAtom } from "../../hook/UserAtom.ts";
import { addUser, getBudgetInfo } from "../../functions/user.ts";

const PrivateRoute = ({ component, ...args }) => {
  const auth = useAuth0();
  const { isLoading, user } = auth;
  const setBudget = useSetAtom(budgetAtom);
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [hasBudget, setHasBudget] = useState<boolean>(false);
  const Component = withAuthenticationRequired(component, args);

  useEffect(() => {
    if (!currentUser) {
      user && addUser(auth, setCurrentUser, setHasBudget);
    }
  }, [user]);

  useEffect(() => {
    if (hasBudget) {
      getBudgetInfo(setBudget, auth);
    }
  }, [hasBudget]);

  return isLoading ? <Loading /> : <Component />;
};

export default PrivateRoute;
