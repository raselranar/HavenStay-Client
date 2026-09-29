import Link from "next/link";

export const metadata = {
    title: "About | HavenStay",
    description:
        "Learn about HavenStay, our mission, and the people-driven approach behind smarter rental experiences.",
};

const values = [
    {
        title: "Built on trust",
        description:
            "Every listing is verified and every interaction is designed to make renting safer, clearer, and more confident.",
    },
    {
        title: "Made for modern living",
        description:
            "We combine seamless browsing, responsive dashboards, and transparent communication to simplify the rental journey.",
    },
    {
        title: "Created for every role",
        description:
            "Whether you're a tenant, owner, or admin, HavenStay gives each user a focused, role-aware experience.",
    },
];

const stats = [
    { label: "Active listings", value: "2.4K+" },
    { label: "Happy renters", value: "15K+" },
    { label: "Property owners", value: "1.1K+" },
    { label: "Cities served", value: "38" },
];

export default function AboutPage() {
    return (
        <div className="bg-background text-foreground">
            <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <p className="mb-4 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                            About HavenStay
                        </p>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                            A smarter way to rent, manage, and grow.
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                            HavenStay was created to make property renting more transparent and more human.
                            We bring together renters, owners, and property teams in one modern platform designed
                            to reduce friction and build confidence at every step.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/properties"
                                className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                            >
                                Explore listings
                            </Link>
                            <Link
                                href="/contact"
                                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                            >
                                Talk to us
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl shadow-slate-200">
                        <div className="grid gap-6 sm:grid-cols-2">
                            {stats.map((stat) => (
                                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                                    <div className="mt-2 text-sm text-slate-300">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-slate-200 bg-white/60">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                            Our mission
                        </p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                            To make rental experiences feel easy, secure, and rewarding.
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            We believe renting should be about fit, trust, and clarity—not endless back-and-forth.
                            That conviction drives everything we build, from property discovery to booking and management.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="mb-12 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                        Why people choose us
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        Thoughtful technology for every move.
                    </h2>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {values.map((value) => (
                        <article
                            key={value.title}
                            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-100"
                        >
                            <div className="mb-5 h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-xl text-indigo-700">
                                ✦
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900">{value.title}</h3>
                            <p className="mt-4 text-base leading-7 text-slate-600">{value.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-6 pb-20">
                <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 p-10 text-white shadow-xl shadow-indigo-200">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100">
                                Ready to begin?
                            </p>
                            <h3 className="mt-2 text-3xl font-bold">Find a place that feels like home.</h3>
                        </div>
                        <Link
                            href="/properties"
                            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
                        >
                            Browse properties
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
