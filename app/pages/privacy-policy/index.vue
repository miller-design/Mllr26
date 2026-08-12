<script setup lang="ts">
/**
 * Privacy policy page — basic UK GDPR–oriented notice for a personal portfolio.
 */
import { PRIVACY_SEO, SITE_OG_IMAGE, SITE_PERSON_NAME } from "~/lib/seo";

useSeoMeta({
  title: PRIVACY_SEO.title,
  description: PRIVACY_SEO.description,
  robots: "noindex, follow",
  ogImage: SITE_OG_IMAGE,
  twitterCard: "summary_large_image",
  twitterImage: SITE_OG_IMAGE,
});

const updated = "12 August 2026";
const operator = SITE_PERSON_NAME;
</script>

<template>
  <LegalDocument title="Privacy Policy" :updated="updated">
    <template #default="{ styles }">
      <section :class="styles.section">
        <h2 :class="styles.heading">Who we are</h2>
        <p :class="styles.text">
          This website (Mllr26) is operated by {{ operator }}, a creative
          developer based in the East Midlands, United Kingdom. This policy
          explains how personal information is handled when you visit the site.
        </p>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">What this site collects</h2>
        <p :class="styles.text">
          This is a portfolio site. It does not ask you to create an account,
          submit a contact form, or sign up to a newsletter.
        </p>
        <p :class="styles.text">
          Like most websites, the hosting provider may automatically process
          limited technical data when you visit — for example IP address,
          browser type, referring page, and timestamps. That information is used
          only to operate, secure, and troubleshoot the site.
        </p>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">Cookies and similar technologies</h2>
        <p :class="styles.text">
          Details of cookies (if any) are set out in the
          <NuxtLink to="/cookie-policy" :class="styles.link"
            >Cookie Policy</NuxtLink
          >.
        </p>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">Analytics and marketing</h2>
        <p :class="styles.text">
          This site does not use advertising cookies, remarketing tags, or
          third-party analytics tools to track you across the web.
        </p>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">How information is used</h2>
        <p :class="styles.text">
          Any technical data processed in connection with this site is used to:
        </p>
        <ul :class="styles.list">
          <li :class="styles.listItem">Deliver and maintain the website</li>
          <li :class="styles.listItem">
            Keep the site secure and investigate abuse or errors
          </li>
          <li :class="styles.listItem">
            Meet legal obligations where they apply
          </li>
        </ul>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">Sharing</h2>
        <p :class="styles.text">
          Personal information is not sold. Hosting and infrastructure providers
          may process technical data solely to provide their services under their
          own terms.
        </p>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">How long data is kept</h2>
        <p :class="styles.text">
          Server or hosting logs are retained only as long as needed for
          operation, security, and troubleshooting — typically a short period set
          by the hosting provider — unless a longer period is required by law.
        </p>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">Your rights</h2>
        <p :class="styles.text">
          If UK data protection law applies to you, you may have rights to
          access, correct, delete, or restrict processing of your personal data,
          and to object to certain processing. You can also complain to the
          Information Commissioner’s Office (ICO) in the UK.
        </p>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">Contact</h2>
        <p :class="styles.text">
          For questions about this privacy policy, contact {{ operator }} using
          the details available on this website or through publicly listed
          professional channels.
        </p>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">Changes</h2>
        <p :class="styles.text">
          This policy may be updated from time to time. The “Last updated” date
          at the top of this page will change when it does.
        </p>
      </section>
    </template>
  </LegalDocument>
</template>
