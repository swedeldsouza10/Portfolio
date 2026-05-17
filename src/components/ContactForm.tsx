"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";
import type { ContactFormData, FormStatus } from "@/types";
import { useI18n } from "@/i18n/LanguageProvider";

const empty: ContactFormData = { name: "", email: "", message: "" };

export default function ContactForm() {
  const { t } = useI18n();
  const [form, setForm] = useState<ContactFormData>(empty);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const update =
    (field: keyof ContactFormData) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    // Never let the button spin forever — bail out after 20s with a
    // helpful message if the server is unreachable or stalled.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error("request-failed");
      setStatus("success");
      setFeedback(t("contact.form.success"));
      setForm(empty);
    } catch (err) {
      setStatus("error");
      if (err instanceof DOMException && err.name === "AbortError") {
        setFeedback(t("contact.form.timeout"));
      } else {
        setFeedback(t("contact.form.error"));
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-bg-soft px-4 py-3 font-body text-sm text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-fg-subtle">
            {t("contact.form.name")}
          </label>
          <input
            type="text"
            required
            maxLength={100}
            value={form.name}
            onChange={update("name")}
            placeholder={t("contact.form.namePlaceholder")}
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-fg-subtle">
            {t("contact.form.email")}
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder={t("contact.form.emailPlaceholder")}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-fg-subtle">
          {t("contact.form.message")}
        </label>
        <textarea
          required
          maxLength={2000}
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder={t("contact.form.messagePlaceholder")}
          className={`${inputCls} resize-none`}
        />
      </div>

      <AnimatePresence>
        {status !== "idle" && status !== "loading" && feedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 font-body text-sm ${
              status === "success"
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-red-500/40 bg-red-500/10 text-red-400"
            }`}
          >
            {status === "success" ? (
              <FiCheckCircle size={16} />
            ) : (
              <FiAlertCircle size={16} />
            )}
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <FiLoader size={15} className="animate-spin" />
            {t("contact.form.sending")}
          </>
        ) : (
          <>
            {t("contact.form.send")}
            <FiSend size={15} />
          </>
        )}
      </button>
    </form>
  );
}
