"use client";
import { useState } from "react";
import { SectionLayout } from "../components/section-layout";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";
import Bezel from "@/shared/components/bezel";
import PillLink from "@/shared/components/pill-link";
import ScrollReveal, { MaskLines } from "@/shared/components/scroll-reveal";
import { ProfileBase, SocialBase } from "@/shared/content/base";
import { cn } from "@/shared/lib/utils";

export default function Contact() {
  const t = useTranslations("ContactPage");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sendEmail = async () => {
    try {
      setIsLoading(true);
      if (!name || !email || !message) {
        toast.error(t("errorMessage"));
        setIsLoading(false);
        return;
      }
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      if (response.ok) {
        toast.success(t("successMessage", { name }));
      } else {
        toast.error(t("errorMessage"));
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fields = [
    { id: "name", label: "Your name", type: "text", set: setName, value: name },
    { id: "email", label: "Email address", type: "email", set: setEmail, value: email },
  ] as const;

  return (
    <SectionLayout
      leftContent={t("title.leftContent")}
      rightContent={t("title.rightContent")}
      id="contact"
    >
      <div className="mx-auto mt-16 grid w-11/12 max-w-7xl gap-14 md:mt-24 md:grid-cols-12 md:gap-10">
        <div className="flex flex-col justify-between gap-12 md:col-span-6">
          <h3 className="font-sans text-[clamp(3rem,7vw,6.5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.05em]">
            <MaskLines
              lines={[
                "Together.",
                "Create.",
                <span key="s" className="font-serif font-normal normal-case italic tracking-[-0.02em] text-muted-foreground">
                  something.
                </span>,
              ]}
            />
          </h3>

          <ScrollReveal delay={0.2} className="space-y-8">
            <PillLink href={`mailto:${ProfileBase.email}`} cursorText="MAIL">
              <span className="flex items-center gap-3">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {ProfileBase.email}
              </span>
            </PillLink>

            <dl className="grid grid-cols-2 gap-6 border-t border-foreground/10 pt-6 font-mono text-[10px] uppercase tracking-[0.22em]">
              <div className="space-y-2">
                <dt className="text-muted-foreground">Based in</dt>
                <dd className="text-foreground">Taichung, Taiwan</dd>
              </div>
              <div className="space-y-2">
                <dt className="text-muted-foreground">Elsewhere</dt>
                <dd className="flex flex-wrap gap-x-4 gap-y-1">
                  {Object.entries(SocialBase).map(([key, value]) => (
                    <a
                      key={key}
                      href={value.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-700 after:ease-fluid hover:after:origin-left hover:after:scale-x-100"
                    >
                      {key}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1} y={64} className="md:col-span-6">
          <Bezel innerClassName="bg-background p-6 md:p-10">
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                sendEmail();
              }}
            >
              {fields.map((field) => (
                <div key={field.id} className="relative">
                  <input
                    id={`contact-${field.id}`}
                    type={field.type}
                    required
                    placeholder=" "
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    className="peer h-16 w-full rounded-2xl bg-foreground/[0.03] px-5 pt-5 text-base outline-none ring-1 ring-foreground/[0.08] transition-[box-shadow,background-color] duration-500 ease-fluid focus:bg-transparent focus:ring-2 focus:ring-foreground/60 dark:bg-white/[0.03]"
                  />
                  <label
                    htmlFor={`contact-${field.id}`}
                    className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-500 ease-fluid peer-focus:top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]"
                  >
                    {field.label}
                  </label>
                </div>
              ))}
              <div className="relative">
                <textarea
                  id="contact-message"
                  required
                  placeholder=" "
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="peer h-40 w-full resize-none rounded-2xl bg-foreground/[0.03] px-5 pt-8 text-base outline-none ring-1 ring-foreground/[0.08] transition-[box-shadow,background-color] duration-500 ease-fluid focus:bg-transparent focus:ring-2 focus:ring-foreground/60 dark:bg-white/[0.03]"
                />
                <label
                  htmlFor="contact-message"
                  className="pointer-events-none absolute left-5 top-6 text-sm text-muted-foreground transition-all duration-500 ease-fluid peer-focus:top-3.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]"
                >
                  Tell me about the project
                </label>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "group mt-2 flex min-h-14 items-center justify-between rounded-full bg-foreground py-2 pl-7 pr-2 text-base font-medium text-background transition-[transform,opacity] duration-700 ease-fluid active:scale-[0.98]",
                  isLoading && "cursor-not-allowed opacity-60",
                )}
              >
                Send message
                <span className="flex size-10 items-center justify-center rounded-full bg-background/15 transition-transform duration-700 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  {isLoading ? (
                    <Loader2 aria-hidden strokeWidth={1.5} className="size-4 animate-spin" />
                  ) : (
                    <ArrowUpRight aria-hidden strokeWidth={1.25} className="size-4 transition-transform duration-700 ease-fluid group-hover:rotate-45" />
                  )}
                </span>
              </button>
            </form>
          </Bezel>
        </ScrollReveal>
      </div>
    </SectionLayout>
  );
}
