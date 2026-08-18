<script setup lang="ts">
import styles from "./styles.module.css";
import { submissionErrorMessage } from "../../utils/getFormErrors";
import type { ContactFormProps } from "./types";
import { contactSchema } from "#shared/schemas/contact";

const { className } = defineProps<ContactFormProps>();
const contactPanelOpen = useState("contact-panel-open", () => false);
const contactPanelHeight = useState("contact-panel-height", () => 0);
const panel = useTemplateRef<HTMLDivElement>("panel");

let resizeObserver: ResizeObserver | undefined;

onMounted(() => {
  const updateHeight = () => {
    contactPanelHeight.value = panel.value?.offsetHeight ?? 0;
  };

  updateHeight();
  resizeObserver = new ResizeObserver(updateHeight);
  resizeObserver.observe(panel.value!);
});

onBeforeUnmount(() => resizeObserver?.disconnect());

const formFields = [
  {
    label: "Name",
    name: "name",
    type: "text",
    required: true,
    autocomplete: "name",
  },
  {
    label: "Company",
    name: "company",
    type: "text",
    required: false,
    autocomplete: "organization",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
    autocomplete: "email",
  },
  {
    label: "Message",
    name: "message",
    type: "textarea",
    required: true,
    autocomplete: "off",
  },
] as const;

type FieldName = (typeof formFields)[number]["name"];

const form = reactive({
  name: "",
  company: "",
  email: "",
  message: "",
});

const submitting = ref(false);
const error = ref<string | null>(null);
const fieldErrors = ref<Partial<Record<FieldName, string>>>({});
const sent = ref(false);

/**
 * Clears form-level and field-level validation messages.
 *
 * @example
 * clearErrors()
 */
function clearErrors() {
  error.value = null;
  fieldErrors.value = {};
}

/**
 * Validates the form with the shared schema and stores field-level messages.
 *
 * @returns Whether the current form values pass validation.
 * @example
 * if (!validateForm()) return
 */
function validateForm(): boolean {
  const result = contactSchema.safeParse(form);

  if (result.success) {
    fieldErrors.value = {};
    return true;
  }

  const nextFieldErrors: Partial<Record<FieldName, string>> = {};

  for (const issue of result.error.issues) {
    const field = issue.path[0];

    if (
      typeof field === "string" &&
      field in form &&
      !nextFieldErrors[field as FieldName]
    ) {
      nextFieldErrors[field as FieldName] = issue.message;
    }
  }

  fieldErrors.value = nextFieldErrors;
  error.value = "Please fix the highlighted fields before submitting.";
  return false;
}

/**
 * Submits the contact form to the Nitro API.
 *
 * @param event Native submit event from the form element.
 * @example
 * <form @submit.prevent="onSubmit">
 */
async function onSubmit(event: Event) {
  event.preventDefault();
  clearErrors();

  if (!validateForm()) {
    return;
  }

  submitting.value = true;

  try {
    await $fetch("/api/contact", { method: "POST", body: form });
    sent.value = true;
  } catch (submitError) {
    error.value = submissionErrorMessage(submitError);
  } finally {
    submitting.value = false;
  }
}

function onClose() {
  contactPanelOpen.value = false;
}
</script>

<template>
  <div
    ref="panel"
    :class="[styles.root, contactPanelOpen && styles.isOpen, className]"
  >
    <h2 :class="styles.title">
      Have a question? Leave me a message and I'll get back to you after the
      beep.
    </h2>

    <form :class="styles.form" novalidate @submit="onSubmit">
      <div
        v-for="field in formFields"
        :key="field.name"
        :class="[styles.field, fieldErrors[field.name] && styles.fieldInvalid]"
      >
        <input
          v-if="field.type === 'text' || field.type === 'email'"
          :id="field.name"
          v-model="form[field.name]"
          :disabled="sent"
          :class="styles.input"
          :type="field.type"
          :name="field.name"
          :required="field.required"
          :autocomplete="field.autocomplete"
          :aria-invalid="fieldErrors[field.name] ? 'true' : undefined"
          :aria-describedby="
            fieldErrors[field.name] ? `${field.name}-error` : undefined
          "
        />
        <textarea
          v-else
          :id="field.name"
          v-model="form[field.name]"
          :disabled="sent"
          :class="styles.textarea"
          :name="field.name"
          :required="field.required"
          :autocomplete="field.autocomplete"
          :aria-invalid="fieldErrors[field.name] ? 'true' : undefined"
          :aria-describedby="
            fieldErrors[field.name] ? `${field.name}-error` : undefined
          "
        />
        <div :class="styles.fieldContent">
          <label :class="styles.label" :for="field.name">
            {{ field.label }}
          </label>
          <p
            v-if="fieldErrors[field.name]"
            :id="`${field.name}-error`"
            :class="styles.fieldError"
            role="alert"
          >
            {{ fieldErrors[field.name] }}
          </p>
        </div>
      </div>

      <div :class="styles.controls">
        <button
          :class="styles.button"
          type="submit"
          :disabled="submitting || sent"
        >
          {{ submitting ? "Sending..." : "Submit" }}
        </button>
        <p v-if="error" :class="styles.error" role="alert">
          {{ error }}
        </p>

        <p
          v-if="sent"
          :class="styles.successMessage"
          role="status"
          aria-live="polite"
        >
          Thanks, {{ form.name.trim() || "friend" }}. for leaving me a message,
          some whitty message here.
        </p>
      </div>
    </form>
  </div>
  <div :class="styles.overlay" @click="onClose"></div>
</template>
