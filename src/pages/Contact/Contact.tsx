import React from "react";
import * as S from "./contact.style.ts";
import { emailAddress } from "../../constants.ts";

const Contact = () => {
  return (
    <S.Wrapper>
      <S.Content>
        Have a question, suggestion, or technical issue? We'd love to hear from you.
        <div>Whether you need help using the platform, want to report a bug, or just want to share feedback — we're here to support your budgeting journey.</div>
      </S.Content>
      <S.Section>
        <S.Title>Email Support</S.Title>
        <S.Content>
          <div>Reach us directly at: <a href={`mailto:${emailAddress}`}>{emailAddress}</a></div>
          We aim to respond to all inquiries within 1-2 business days.
        </S.Content>
      </S.Section>

      <S.Section>
        <S.Title>Feedback or Feature Requests?</S.Title>
        <S.Content>
          We're building this platform for real people — and your voice matters.
          <div>If you have ideas for new features or improvements, send them to: <a href={`mailto:${emailAddress}`}>{emailAddress}</a></div>
        </S.Content>
      </S.Section>

      <S.Section>
        <S.Title>Business Hours</S.Title>
        <S.Content>
          Monday - Friday: 9am - 5pm CST
          <div>Saturday & Sunday: Closed (but emails are still monitored)</div>
        </S.Content>
      </S.Section>
    </S.Wrapper>
  );
};

export default Contact;
