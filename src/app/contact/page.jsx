import Link from "next/link";

export const metadata = {
    title: "Contact | HavenStay",
    description:
        "Contact HavenStay for property inquiries, support, or partnership opportunities.",
};

const contactInfo = [
    { label: "Email", value: "hello@havenstay.com", helper: "For general inquiries and support" },
    { label: "Phone", value: "+1 (415) 555-0148", helper: "Mon–Fri, 9:00 AM – 6:00 PM" },
    { label: "Office", value: "128 Harbour Lane, San Francisco, CA", helper: "Visit us for in-person bookings" },
];

export default function ContactPage() {
    return (
        <div className="bg-background text-foreground">
            <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                        Contact us
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                        We’re here to help you move forward.
                    </h1>
                    <p className="mt-5 text-lg leading-8 text-slate-600">
                        Whether you’re looking for a new home, managing a property, or planning a partnership,
                        the HavenStay team is ready to help.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-20">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr]">
                    <div className="space-y-5">
                        {contactInfo.map((item) => (
                            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    {item.label}
                                </p>
                                <p className="mt-3 text-xl font-semibold text-slate-900">{item.value}</p>
                                <p className="mt-2 text-sm text-slate-600">{item.helper}</p>
                            </div>
                        ))}

                        <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
                            <h2 className="text-xl font-semibold">Need fast support?</h2>
                            <p className="mt-3 text-sm leading-7 text-slate-300">
                                Our customer success team can help with booking questions, listing support, or account access issues.
                            </p>
                            <Link
                                href="/properties"
                                className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                            >
                                Explore listings
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                        <h2 className="text-2xl font-bold text-slate-900">Send a message</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Share a few details and we’ll reach out as soon as possible.
                        </p>

                        <form className="mt-8 space-y-5">
                            <div className="grid gap-5 md:grid-cols-2">
                                <label className="block text-sm font-medium text-slate-700">
                                    Full name
                                    <input
                                        type="text"
                                        placeholder="Jane Doe"
                                        className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white"
                                    />
                                </label>

                                <label className="block text-sm font-medium text-slate-700">
                                    Email address
                                    <input
                                        type="email"
                                        placeholder="jane@example.com"
                                        className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white"
                                    />
                                </label>
                            </div>

                            <label className="block text-sm font-medium text-slate-700">
                                Subject
                                <input
                                    type="text"
                                    placeholder="Property inquiry"
                                    className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white"
                                />
                            </label>

                            <label className="block text-sm font-medium text-slate-700">
                                Message
                                <textarea
                                    rows="6"
                                    placeholder="Tell us how we can help..."
                                    className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white"
                                />
                            </label>

                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                            >
                                Send message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
