<script setup lang="ts">
/**
 * Cookie policy page — basic notice for a personal portfolio with no tracking stack.
 */
import { COOKIE_SEO, SITE_OG_IMAGE, SITE_PERSON_NAME } from "~/lib/seo";

useSeoMeta({
  title: COOKIE_SEO.title,
  description: COOKIE_SEO.description,
  robots: "noindex, follow",
  ogImage: SITE_OG_IMAGE,
  twitterCard: "summary_large_image",
  twitterImage: SITE_OG_IMAGE,
});

const updated = "12 August 2026";
const operator = SITE_PERSON_NAME;
</script>

<template>
  <LegalDocument title="Cookie Policy" :updated="updated">
    <template #default="{ styles }">
      <section :class="styles.section">
        <h2 :class="styles.heading">Overview</h2>
        <p :class="styles.text">
          This Cookie Policy explains how Mllr26, operated by {{ operator }},
          uses cookies and similar technologies. It should be read together with
          the
          <NuxtLink to="/privacy-policy" :class="styles.link"
            >Privacy Policy</NuxtLink
          >.
        </p>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">What are cookies?</h2>
        <p :class="styles.text">
          Cookies are small text files stored on your device when you visit a
          website. Similar technologies include local storage and pixels. They
          can be essential for the site to work, or used for preferences,
          analytics, or advertising.
        </p>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">How this site uses cookies</h2>
        <p :class="styles.text">
          This portfolio does not set advertising or analytics cookies, and does
          not use third-party marketing trackers.
        </p>
        <p :class="styles.text">
          The site may rely on strictly necessary cookies or equivalent
          technologies that are required for basic operation — for example
          security, load balancing, or remembering a simple preference if one is
          introduced later. Where a cookie is strictly necessary, it may be set
          without a separate consent prompt.
        </p>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">Hosting and third parties</h2>
        <p :class="styles.text">
          The hosting or CDN provider that serves this site may set its own
          essential cookies or process technical logs as part of delivering the
          pages securely. Those tools are governed by the provider’s own
          policies.
        </p>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">Managing cookies</h2>
        <p :class="styles.text">
          You can control or delete cookies through your browser settings. Blocking
          all cookies may affect how some websites work. Help for common browsers
          is usually available from the browser vendor’s support pages.
        </p>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">Updates</h2>
        <p :class="styles.text">
          If analytics, advertising, or other non-essential cookies are added in
          the future, this policy will be updated and any required consent
          mechanism will be put in place before those cookies are used.
        </p>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.heading">Contact</h2>
        <p :class="styles.text">
          Questions about cookies on this site can be directed to
          {{ operator }} via the details available on this website or through
          publicly listed professional channels.
        </p>
      </section>
    </template>
  </LegalDocument>
</template>
