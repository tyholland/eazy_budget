import React from "react";
import * as S from "./privacy.style.ts";
import { emailAddress } from "../../constants.ts";

const Privacy = () => {
  return (
    <S.Wrapper>
      <S.Section>
        <div>
          <strong>Effective Date</strong>: July 7, 2025
        </div>
        <div>
          At <strong>Simple Budgeting</strong>, your privacy is important to us.
          This Privacy Policy explains how we collect, use, protect, and share
          your information when you visit or use our website.
        </div>
        <div>
          By using this website, you agree to the terms outlined in this policy.
          If you do not agree, please do not use the site.
        </div>
      </S.Section>
      <S.Section>
        <S.Title>1. Information We Collect</S.Title>
        <div>We collect two types of information:</div>
        <div>
          <strong>a) Personal Information (you provide)</strong>
        </div>
        <ul>
          <li>
            Your email address (if you contact us, sign up for updates, or
            create an account)
          </li>
          <li>Any feedback or inquiries you send us directly</li>
        </ul>
        <div>
          <strong>b) Non-Personal Information (automatically collected)</strong>
        </div>
        <ul>
          <li>IP address, browser type, device type</li>
          <li>Pages visited and time spent on the site</li>
          <li>Referring website (if any)</li>
          <li>Cookies and analytics data</li>
        </ul>
      </S.Section>

      <S.Section>
        <S.Title>2. How We Use Your Information</S.Title>
        <div>We use collected information to:</div>
        <ul>
          <li>Improve the functionality and content of the website</li>
          <li>Respond to questions or feedback</li>
          <li>Analyze usage trends and improve the user experience</li>
          <li>Send occasional updates (only if you opt in)</li>
          <li>Ensure site security and performance</li>
        </ul>
        <div>
          We <strong>do not sell or rent your information</strong> to third
          parties.
        </div>
      </S.Section>

      <S.Section>
        <S.Title>3. Cookies & Analytics</S.Title>
        <div>We may use cookies and similar technologies to:</div>
        <ul>
          <li>Remember your preferences</li>
          <li>Measure site performance</li>
          <li>Provide relevant content</li>
        </ul>
        <div>
          We may use tools like <strong>Google Analytics</strong> to help us
          understand traffic patterns. These tools collect non-personally
          identifiable information.
        </div>
        <div>You can disable cookies in your browser settings at any time.</div>
      </S.Section>

      <S.Section>
        <S.Title>4. Google AdSense (Advertising)</S.Title>
        <div>
          We may display ads via <strong>Google AdSense</strong> or other
          partners. These platforms may use cookies to show personalized ads
          based on your browsing behavior.
        </div>
        <ul>
          <li>
            <strong>
              Google's use of advertising cookies enables it and its partners to
              serve ads based on your visit to our site and/or other sites on
              the internet.
            </strong>
          </li>
        </ul>
        <div>
          You can opt out of personalized advertising by visiting:{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noreferrer"
          >
            https://www.google.com/settings/ads
          </a>
        </div>
      </S.Section>

      <S.Section>
        <S.Title>5. Data Security</S.Title>
        <div>
          We take reasonable steps to protect your data from unauthorized access
          or disclosure. However, no system is completely secure, and we cannot
          guarantee the security of your information.
        </div>
      </S.Section>

      <S.Section>
        <S.Title>6. Your Rights</S.Title>
        <div>Depending on your location, you may have the right to:</div>
        <ul>
          <li>Access, update, or delete your personal information</li>
          <li>Request a copy of the data we hold about you</li>
          <li>Opt out of data collection or marketing communications</li>
        </ul>
        <div>
          To exercise any of these rights, please email us at:{" "}
          <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
        </div>
      </S.Section>

      <S.Section>
        <S.Title>7. Third-Party Links</S.Title>
        <div>
          Our site may contain links to third-party websites. We are not
          responsible for the content or privacy practices of those sites.
        </div>
      </S.Section>

      <S.Section>
        <S.Title>8. Updates to This Policy</S.Title>
        <div>
          We may update this Privacy Policy at any time. Updates will be posted
          on this page with a new effective date.
        </div>
      </S.Section>
    </S.Wrapper>
  );
};

export default Privacy;
