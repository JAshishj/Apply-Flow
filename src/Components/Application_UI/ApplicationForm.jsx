import { useId, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { useApplications } from "../../Context/Application_Context";
import { cn } from "../../lib/cn";
import { isHttpUrl, toISODate } from "../../lib/format";
import { STATUSES } from "../../lib/status";
import { inputClass, textareaClass } from "../../lib/inputStyles";
import Button from "../UI/Button";
import Dialog from "../UI/Dialog";
import Field from "../UI/Field";

function initialForm(application) {
  if (!application) {
    return {
      company: "",
      title: "",
      status: "Applied",
      appliedDate: toISODate(),
      description: "",
      link: "",
      notes: "",
    };
  }

  return {
    company: application.company ?? "",
    title: application.title ?? "",
    status: application.status ?? "Applied",
    appliedDate: application.appliedDate ?? "",
    description: application.description ?? "",
    link: application.link ?? "",
    notes: application.notes ?? "",
  };
}

function validate(values) {
  const errors = {};

  if (!values.company.trim()) errors.company = "Add the company name.";
  if (!values.title.trim()) errors.title = "Add the role title.";
  if (!values.appliedDate) errors.appliedDate = "Pick the date you applied.";
  if (values.link.trim() && !isHttpUrl(values.link.trim())) {
    errors.link = "Use a full link starting with https://";
  }

  return errors;
}

export default function ApplicationForm({ application, onClose }) {
  const { addApplication, updateApplication } = useApplications();
  const uid = useId();
  const fieldId = (name) => `${uid}-${name}`;

  const [form, setForm] = useState(() => initialForm(application));
  const [errors, setErrors] = useState({});

  const update = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    const firstInvalid = ["company", "title", "appliedDate", "link"].find(
      (name) => nextErrors[name],
    );

    if (firstInvalid) {
      requestAnimationFrame(() => {
        document.getElementById(fieldId(firstInvalid))?.focus();
      });
      return;
    }

    const now = new Date().toISOString();
    const payload = {
      company: form.company.trim(),
      title: form.title.trim(),
      status: form.status,
      appliedDate: form.appliedDate,
      description: form.description.trim(),
      link: form.link.trim(),
      notes: form.notes.trim(),
    };

    if (application) {
      updateApplication({ ...application, ...payload, updatedAt: now });
    } else {
      addApplication({
        ...payload,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      });
    }

    onClose();
  };

  const heading = application ? "Edit application" : "New application";

  return (
    <Dialog onClose={onClose} title={heading} size="lg">
      <div className="px-5 pt-5 pb-4 pr-14 sm:px-6 sm:pt-6">
        <h2 className="font-display text-[21px] font-semibold tracking-[-0.03em] text-ink">
          {heading}
        </h2>
        <p className="mt-1 text-[13px] text-muted">
          {application
            ? "Update the details and save your changes."
            : "Track a role from the day you apply."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex min-h-0 flex-1 flex-col"
      >
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id={fieldId("company")}
              label="Company"
              required
              error={errors.company}
            >
              <input
                id={fieldId("company")}
                name="company"
                value={form.company}
                onChange={(event) => update("company", event.target.value)}
                placeholder="e.g. Monzo"
                autoComplete="organization"
                aria-invalid={Boolean(errors.company)}
                aria-describedby={
                  errors.company ? `${fieldId("company")}-error` : undefined
                }
                data-autofocus
                className={inputClass}
              />
            </Field>

            <Field
              id={fieldId("title")}
              label="Position"
              required
              error={errors.title}
            >
              <input
                id={fieldId("title")}
                name="title"
                value={form.title}
                onChange={(event) => update("title", event.target.value)}
                placeholder="e.g. Product designer"
                autoComplete="organization-title"
                aria-invalid={Boolean(errors.title)}
                aria-describedby={
                  errors.title ? `${fieldId("title")}-error` : undefined
                }
                className={inputClass}
              />
            </Field>

            <Field id={fieldId("status")} label="Status">
              <div className="relative">
                <select
                  id={fieldId("status")}
                  name="status"
                  value={form.status}
                  onChange={(event) => update("status", event.target.value)}
                  className={cn(inputClass, "appearance-none pr-9")}
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <CaretDown
                  size={14}
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-faint"
                />
              </div>
            </Field>

            <Field
              id={fieldId("appliedDate")}
              label="Applied on"
              required
              error={errors.appliedDate}
            >
              <input
                id={fieldId("appliedDate")}
                type="date"
                name="appliedDate"
                value={form.appliedDate}
                max={toISODate()}
                onChange={(event) => update("appliedDate", event.target.value)}
                aria-invalid={Boolean(errors.appliedDate)}
                aria-describedby={
                  errors.appliedDate
                    ? `${fieldId("appliedDate")}-error`
                    : undefined
                }
                className={inputClass}
              />
            </Field>

            <Field
              id={fieldId("description")}
              label="Role summary"
              hint="Optional. A line or two about the role."
              className="sm:col-span-2"
            >
              <textarea
                id={fieldId("description")}
                name="description"
                rows={3}
                value={form.description}
                onChange={(event) => update("description", event.target.value)}
                placeholder="What the team is building, and where you would fit."
                className={textareaClass}
              />
            </Field>

            <Field
              id={fieldId("link")}
              label="Job posting"
              hint="Optional. Include the full URL, starting with https://"
              error={errors.link}
              className="sm:col-span-2"
            >
              <input
                id={fieldId("link")}
                type="url"
                inputMode="url"
                name="link"
                value={form.link}
                onChange={(event) => update("link", event.target.value)}
                placeholder="https://"
                aria-invalid={Boolean(errors.link)}
                aria-describedby={
                  errors.link
                    ? `${fieldId("link")}-error`
                    : `${fieldId("link")}-hint`
                }
                className={inputClass}
              />
            </Field>

            <Field
              id={fieldId("notes")}
              label="Notes"
              hint="Optional. Recruiter names, next steps, anything worth keeping."
              className="sm:col-span-2"
            >
              <textarea
                id={fieldId("notes")}
                name="notes"
                rows={2}
                value={form.notes}
                onChange={(event) => update("notes", event.target.value)}
                placeholder="Next step, contact, or something to remember."
                className={textareaClass}
              />
            </Field>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-4 sm:px-6">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {application ? "Save changes" : "Add application"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
