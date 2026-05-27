"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState, useTransition } from "react";
import {
    FaGithub,
    FaLinkedinIn,
    FaWhatsapp,
    FaXTwitter,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

type Project = {
    title: string;
    category: string;
    year: string;
    summary: string;
    impact: string;
    stack: string[];
    href?: string;
    isPrivate?: boolean;
};

type Social = {
    label: string;
    handle: string;
    href: string;
    Icon: IconType;
};

const projects: Project[] = [
    {
        title: "Paygoat",
        category: "Multi-instance payment collection platform",
        year: "2026",
        summary:
            "Built a payment collection platform that supports POS-style workflows using role-based access control. Admins can configure collection instances and automatically provision operator accounts for immediate use.",
        impact: "Improved payment operations visibility with centralized financial tracking across multiple collection instances.",
        stack: ["Next.js", "PostgreSQL", "Paystack", "Neon"],
        isPrivate: true,
    },
    {
        title: "Certora",
        category: "Contractor certification portal",
        year: "2026",
        summary:
            "Developed a reusable certification portal for organizations that issue contractor certificates after successful completion. Generated certificates are archived in a searchable directory for long-term administrative records.",
        impact: "Standardized contractor certification workflows and improved documentation consistency for enterprise admin teams.",
        stack: ["Next.js", "PostgreSQL"],
        isPrivate: true,
    },
    {
        title: "ScholarHub",
        category: "Blockchain scholarship platform",
        year: "2025",
        summary:
            "Created a decentralized scholarship platform where students apply for funding and receive disbursements through crypto tokens.",
        impact: "Promoted transparent and globally accessible scholarship workflows with auditable fund distribution.",
        stack: ["Next.js", "Web3", "Smart Contracts", "TypeScript"],
        href: "https://scholarshiphub.vercel.app",
    },
    {
        title: "ElechAdmin",
        category: "Inventory and sales operations dashboard",
        year: "2024",
        summary:
            "Built an internal dashboard for Elech to manage inventory, track customer orders, and monitor sales performance from a single operational workspace.",
        impact: "Improved decision-making with clearer revenue trends, stock visibility, and best-selling product insights.",
        stack: ["Reactjs", "Firebase", "Firestore"],
        href: "https://elech.vercel.app",
    },
    {
        title: "Hemsoft",
        category: "Healthcare equipment management system",
        year: "2023",
        summary:
            "Developed a web application that helps hospitals track medical equipment condition, monitor inventory, and receive maintenance alerts.",
        impact: "Increased operational reliability by reducing equipment oversight gaps and supporting preventive maintenance cycles.",
        stack: ["React", "Node.js", "Express", "MongoDB"],
        href: "https://hemsoft.vercel.app",
    }, 
];

const socials: Social[] = [
    {
        label: "X (Twitter)",
        handle: "@TheRealJephthah",
        href: "https://x.com/TheRealJephthah",
        Icon: FaXTwitter,
    },
    {
        label: "LinkedIn",
        handle: "in/Jephthah Dominic",
        href: "https://www.linkedin.com/in/jephthah-dominic-6267591a4",
        Icon: FaLinkedinIn,
    },
    {
        label: "WhatsApp",
        handle: "+234 9151141703",
        href: "https://wa.me/2349151141703",
        Icon: FaWhatsapp,
    },
    {
        label: "GitHub",
        handle: "github.com/jephthahdominic",
        href: "https://github.com/jephthahdominic",
        Icon: FaGithub,
    },
];

const capabilities = [
    "Full-stack web application development",
    "Frontend interfaces that stay clean and intuitive",
    "Backend APIs and third-party integrations",
    "Performance and maintainability improvements",
];

const initialForm = {
    name: "",
    email: "",
    company: "",
    message: "",
    website: "",
};

const cvPdfPath = "/Jephthah%27s%20new%20cv.pdf";

export function PortfolioShell() {
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
    const [formData, setFormData] = useState(initialForm);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    const activeProject = projects[activeProjectIndex];

    const stats = useMemo(
        () => [
            { value: "3+", label: "Years building for the web" },
            { value: "25", label: "Projects delivered" },
            { value: "100%", label: "Focus on practical quality" },
        ],
        [],
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitMessage(null);
        setSubmitError(null);

        startTransition(async () => {
            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const payload = (await response.json()) as { message?: string; error?: string };

                if (!response.ok) {
                    setSubmitError(payload.error ?? "Message could not be sent. Please try again.");
                    return;
                }

                setSubmitMessage(payload.message ?? "Message sent.");
                setFormData(initialForm);
            } catch {
                setSubmitError("The message could not be sent right now. Please try again shortly.");
            }
        });
    };

    return (
        <main className="page-shell flex-1 px-4 py-4 text-foreground sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
                <header className="panel sticky top-4 z-20 rounded-full px-4 py-3 sm:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="display-type text-lg tracking-[0.25em] text-muted uppercase">
                                St-dominic Jephthah
                            </p>
                            <p className="text-sm text-muted">Software developer focused on useful products and clean execution.</p>
                        </div>
                        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
                            <a className="rounded-full px-3 py-2 hover:bg-accent-soft hover:text-foreground" href="#projects">
                                Projects
                            </a>
                            <a className="rounded-full px-3 py-2 hover:bg-accent-soft hover:text-foreground" href="#about">
                                About
                            </a>
                            <a className="rounded-full px-3 py-2 hover:bg-accent-soft hover:text-foreground" href="#socials">
                                Socials
                            </a>
                            <a className="rounded-full px-3 py-2 hover:bg-accent-soft hover:text-foreground" href="#resume">
                                Resume
                            </a>
                            <a className="rounded-full bg-foreground px-4 py-2 text-background hover:opacity-90" href="#contact">
                                Contact
                            </a>
                        </nav>
                    </div>
                </header>

                <section className="hero-mesh panel overflow-hidden rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
                    <div className="grid gap-10 lg:grid-cols-[1.35fr_0.95fr] lg:items-center">
                        <div className="space-y-8">
                            <div className="animate-enter space-y-5">
                                <span className="inline-flex rounded-full border border-line bg-background/80 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-muted uppercase">
                                    Personal developer portfolio
                                </span>
                                <h1 className="display-type max-w-4xl text-5xl leading-none tracking-tight text-balance sm:text-6xl lg:text-7xl">
                                    I build modern web products that are fast, reliable, and easy to use.
                                </h1>
                                <p className="max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                                    I&apos;m St-dominic Jephthah. This portfolio highlights my work across frontend, backend, and product-focused implementation. I care about thoughtful structure, clear user experience, and code that holds up in production.
                                </p>
                            </div>

                            <div className="animate-enter animate-delay-1 flex flex-col gap-3 sm:flex-row">
                                <a
                                    className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:-translate-y-0.5 hover:opacity-90"
                                    href="#projects"
                                >
                                    View projects
                                </a>
                                <a
                                    className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-semibold hover:border-accent/40 hover:bg-accent-soft"
                                    href="#contact"
                                >
                                    Contact me
                                </a>
                            </div>

                            <div className="animate-enter animate-delay-2 grid gap-3 sm:grid-cols-3">
                                {stats.map((item) => (
                                    <div key={item.label} className="rounded-[1.5rem] border border-line bg-background/80 p-4">
                                        <p className="display-type text-3xl">{item.value}</p>
                                        <p className="mt-2 text-sm leading-6 text-muted">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="animate-enter animate-delay-3 avatar-ring">
                            <div className="panel relative rounded-[2rem] border border-line bg-surface p-5 sm:p-6">
                                <div className="flex flex-col gap-8 justify-between rounded-[1.5rem] border border-line bg-[rgba(239,230,218,0.75)] p-5">
                                    <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-full border border-[rgba(24,22,19,0.14)] shadow-[inset_0_0_0_14px_rgba(255,255,255,0.45)] sm:h-64 sm:w-64">
                                        <Image
                                            alt="St-dominic Jephthah avatar"
                                            className="h-[100%] w-[100%] rounded-full object-cover"
                                            height={256}
                                            priority
                                            src="/avatar.svg"
                                            width={256}
                                        />
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {capabilities.map((capability) => (
                                            <div key={capability} className="rounded-2xl border border-line bg-background/75 px-4 py-3 text-sm text-muted">
                                                {capability}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="projects" className="section-anchor grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="panel rounded-[2rem] p-6 sm:p-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted">Featured projects</p>
                        <h2 className="display-type mt-4 text-3xl sm:text-4xl">Selected work that shows how I solve real product and engineering problems.</h2>
                        <p className="mt-4 max-w-xl text-base leading-7 text-muted">
                            Each project can be previewed quickly and opened in a new tab for deeper review. The section is structured for easy scanning without sacrificing detail.
                        </p>
                        <div className="mt-8 space-y-4">
                            {projects.map((project, index) => {
                                const isActive = index === activeProjectIndex;

                                return (
                                    <button
                                        key={project.title}
                                        className={`project-card w-full rounded-[1.5rem] border px-5 py-5 text-left ${isActive
                                                ? "project-card-active border-accent/30 bg-[rgba(154,52,18,0.08)]"
                                                : "border-line bg-background/80 hover:border-accent/20 hover:bg-background"
                                            }`}
                                        onClick={() => setActiveProjectIndex(index)}
                                        type="button"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.22em] text-muted">{project.category}</p>
                                                <h3 className="display-type mt-2 text-2xl">{project.title}</h3>
                                            </div>
                                            <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">{project.year}</span>
                                        </div>
                                        <p className="mt-4 text-sm leading-7 text-muted">{project.summary}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="panel rounded-[2rem] p-6 sm:p-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="text-sm uppercase tracking-[0.22em] text-muted">Project spotlight</p>
                                <h3 className="display-type mt-2 text-3xl sm:text-4xl">{activeProject.title}</h3>
                            </div>
                            {activeProject.href ? (
                                <a
                                    className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background hover:-translate-y-0.5 hover:opacity-90"
                                    href={activeProject.href}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Open project in new tab
                                </a>
                            ) : (
                                <span className="inline-flex items-center justify-center rounded-full border border-line bg-background/80 px-5 py-3 text-sm font-semibold text-muted">
                                    Private project link
                                </span>
                            )}
                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_0.85fr]">
                            <article className="rounded-[1.75rem] border border-line bg-background/85 p-6">
                                <p className="text-sm uppercase tracking-[0.22em] text-muted">Summary</p>
                                <p className="mt-4 text-base leading-8 text-muted">{activeProject.summary}</p>
                                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-muted">Result</p>
                                <p className="mt-3 text-base leading-8">{activeProject.impact}</p>
                            </article>

                            <article className="rounded-[1.75rem] border border-line bg-[rgba(239,230,218,0.72)] p-6">
                                <p className="text-sm uppercase tracking-[0.22em] text-muted">Stack</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {activeProject.stack.map((tool) => (
                                        <span key={tool} className="rounded-full border border-line bg-background/80 px-3 py-2 text-sm text-muted">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-8 rounded-[1.5rem] border border-dashed border-line p-5">
                                    <p className="text-sm uppercase tracking-[0.22em] text-muted">Quick comparison</p>
                                    <p className="mt-3 text-sm leading-7 text-muted">
                                        The project list updates this panel instantly so visitors can compare multiple projects without navigating away or losing context.
                                    </p>
                                    {activeProject.isPrivate ? (
                                        <p className="mt-3 text-sm leading-7 text-muted">
                                            This project is private, so the live link is intentionally hidden.
                                        </p>
                                    ) : null}
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                <section id="about" className="section-anchor grid gap-6 lg:grid-cols-[1fr_1fr]">
                    <div className="panel rounded-[2rem] p-6 sm:p-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted">About me</p>
                        <h2 className="display-type mt-4 text-3xl sm:text-4xl">I approach software development with equal attention to product thinking and engineering quality.</h2>
                        <p className="mt-5 text-base leading-8 text-muted">
                            I build software that is practical to use and maintain. My process combines clear interface design, reliable backend logic, and implementation choices that support long-term growth.
                        </p>
                    </div>

                    <div className="panel rounded-[2rem] p-6 sm:p-8">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[1.5rem] border border-line bg-background/80 p-5">
                                <p className="text-sm uppercase tracking-[0.22em] text-muted">How I work</p>
                                <p className="mt-3 text-base leading-7">Clear planning, practical architecture, and dependable delivery.</p>
                            </div>
                            <div className="rounded-[1.5rem] border border-line bg-background/80 p-5">
                                <p className="text-sm uppercase tracking-[0.22em] text-muted">What I prioritize</p>
                                <p className="mt-3 text-base leading-7">Usable interfaces, scalable systems, and strong performance.</p>
                            </div>
                            <div className="rounded-[1.5rem] border border-line bg-background/80 p-5 sm:col-span-2">
                                <p className="text-sm uppercase tracking-[0.22em] text-muted">Purpose of this portfolio</p>
                                <p className="mt-3 text-base leading-7 text-muted">
                                    This portfolio gives a clear view of my skills, projects, and working style. It is designed so recruiters, teams, and clients can quickly review my work and reach out directly.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="socials" className="section-anchor panel rounded-[2rem] p-6 sm:p-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="w-[60%]">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted">Social handles</p>
                            <h2 className="display-type mt-4 text-3xl sm:text-4xl">Connect with me on the platforms where I share updates, code, and professional work.</h2>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {socials.map((social) => {
                            const Icon = social.Icon;

                            return (
                                <a
                                    key={social.label}
                                    className="social-card rounded-[1.5rem] border border-line bg-background/85 p-5 hover:border-accent/30 hover:bg-background"
                                    href={social.href}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-[rgba(239,230,218,0.7)] text-xl text-foreground">
                                            <Icon aria-hidden="true" />
                                        </span>
                                    </div>
                                    <p className="display-type mt-5 text-2xl text-ellipsis overflow-hidden whitespace-nowrap">{social.handle}</p>
                                    <p className="mt-5 text-sm font-semibold text-accent">Open profile</p>
                                </a>
                            );
                        })}
                    </div>
                </section>

                <section id="resume" className="section-anchor panel rounded-[2rem] p-6 sm:p-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted">Resume</p>
                            <h2 className="display-type mt-4 text-3xl sm:text-4xl">Preview my CV right here, or download it instantly.</h2>
                            <p className="mt-4 text-base leading-7 text-muted">
                                This embedded PDF viewer lets recruiters and collaborators scan my experience without leaving the portfolio, or you can just download it directly.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-semibold hover:border-accent/40 hover:bg-accent-soft"
                                onClick={() => setIsResumeOpen(true)}
                                type="button"
                            >
                                Preview CV
                            </button>
                            {/* <a
                                className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-semibold hover:border-accent/40 hover:bg-accent-soft"
                                href={cvPdfPath}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Open in new tab
                            </a> */}
                            <a
                                className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:-translate-y-0.5 hover:opacity-90"
                                download
                                href={cvPdfPath}
                            >
                                Download CV
                            </a>
                        </div>
                    </div>
                </section>

                <section id="contact" className="section-anchor grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="panel rounded-[2rem] p-6 sm:p-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted">Contact</p>
                        <h2 className="display-type mt-4 text-3xl sm:text-4xl">If you have a role, project, or collaboration in mind, I would love to hear from you.</h2>
                        <p className="mt-5 text-base leading-8 text-muted">
                            You can send a message directly from this page. Every valid form submission goes straight to my inbox.
                        </p>
                        <div className="mt-8 space-y-4 rounded-[1.5rem] border border-line bg-background/80 p-5">
                            <p className="text-sm uppercase tracking-[0.22em] text-muted">Mailbox delivery</p>
                            <p className="text-sm leading-7 text-muted">
                                Your message includes your contact details and reply-to address so I can respond quickly.
                            </p>
                        </div>
                    </div>

                    <form className="panel rounded-[2rem] p-6 sm:p-8" onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="space-y-2 text-sm font-medium">
                                <span>Name</span>
                                <input
                                    className="contact-field w-full rounded-2xl border border-line bg-background/85 px-4 py-3"
                                    name="name"
                                    onChange={(event) =>
                                        setFormData((current) => ({ ...current, name: event.target.value }))
                                    }
                                    placeholder="Your name"
                                    required
                                    value={formData.name}
                                />
                            </label>

                            <label className="space-y-2 text-sm font-medium">
                                <span>Email</span>
                                <input
                                    className="contact-field w-full rounded-2xl border border-line bg-background/85 px-4 py-3"
                                    name="email"
                                    onChange={(event) =>
                                        setFormData((current) => ({ ...current, email: event.target.value }))
                                    }
                                    placeholder="you@example.com"
                                    required
                                    type="email"
                                    value={formData.email}
                                />
                            </label>

                            <label className="space-y-2 text-sm font-medium sm:col-span-2">
                                <span>Company or role</span>
                                <input
                                    className="contact-field w-full rounded-2xl border border-line bg-background/85 px-4 py-3"
                                    name="company"
                                    onChange={(event) =>
                                        setFormData((current) => ({ ...current, company: event.target.value }))
                                    }
                                    placeholder="Optional"
                                    value={formData.company}
                                />
                            </label>

                            <label className="hidden" aria-hidden="true">
                                <span>Website</span>
                                <input
                                    autoComplete="off"
                                    name="website"
                                    onChange={(event) =>
                                        setFormData((current) => ({ ...current, website: event.target.value }))
                                    }
                                    tabIndex={-1}
                                    value={formData.website}
                                />
                            </label>

                            <label className="space-y-2 text-sm font-medium sm:col-span-2">
                                <span>Message</span>
                                <textarea
                                    className="contact-field min-h-40 w-full rounded-[1.5rem] border border-line bg-background/85 px-4 py-3"
                                    name="message"
                                    onChange={(event) =>
                                        setFormData((current) => ({ ...current, message: event.target.value }))
                                    }
                                    placeholder="Tell me about the opportunity, project, or collaboration you have in mind."
                                    required
                                    value={formData.message}
                                />
                            </label>
                        </div>

                        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background disabled:cursor-not-allowed disabled:opacity-60"
                                disabled={isPending}
                                type="submit"
                            >
                                {isPending ? "Sending..." : "Send message"}
                            </button>
                            <p className="text-sm leading-6 text-muted">
                                {submitMessage ? <span className="text-accent">{submitMessage}</span> : null}
                                {submitError ? <span className="text-[rgb(145,45,45)]">{submitError}</span> : null}
                                {!submitMessage && !submitError ? "I will reply to the email address you provide." : null}
                            </p>
                        </div>
                    </form>
                </section>
            </div>

            {isResumeOpen ? (
                <div
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4"
                    role="dialog"
                >
                    <div className="panel relative flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.5rem] border border-line bg-background">
                        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
                            <p className="display-type text-lg">Resume Preview</p>
                            <button
                                aria-label="Close resume preview"
                                className="rounded-full border border-line px-3 py-1 text-sm font-semibold hover:bg-accent-soft"
                                onClick={() => setIsResumeOpen(false)}
                                type="button"
                            >
                                Close
                            </button>
                        </div>
                        <iframe
                            className="h-full w-full"
                            src={`${cvPdfPath}#view=FitH`}
                            title="St-dominic Jephthah CV"
                        />
                    </div>
                </div>
            ) : null}
        </main>
    );
}