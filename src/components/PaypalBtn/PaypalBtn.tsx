import React from "react";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { trackError, trackEvent } from "../../functions/mixpanel.ts";

interface PaypalBtnProps {
  sub: string;
  addSub: (plan: number, paid: boolean, sub_id?: string | null) => void;
  planNum: number;
}

const PaypalBtn = ({ sub, addSub, planNum }: PaypalBtnProps) => {
  const initialOptions: ReactPayPalScriptOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || "",
    vault: true,
    intent: "subscription",
    environment:
      process.env.NODE_ENV === "development" ? "sandbox" : "production",
  };

  const styles: PayPalButtonsComponentProps["style"] = {
    color: "gold",
    label: "subscribe",
    layout: "horizontal",
    shape: "pill",
    height: 35,
  };

  const createSubscription = (data, actions) => {
    return actions.subscription.create({
      plan_id: sub,
    });
  };

  const onApprove = async (data, actions) => {
    try {
      trackEvent("Selected Subscription", {
        subscription_id: planNum,
      });
      await addSub(planNum, true, data.subscriptionID);
    } catch (err) {
      trackError("PaypalBtn - onApprove:", { result: err });
    }
  };

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={styles}
          createSubscription={createSubscription}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaypalBtn;
