import { caseStudies } from "../data/casestudies";
import CaseStudyCard from "../components/CaseStudyCard";

export const metadata = {
    title: "Case Study",
};

export default function CaseStudies() {
    return (
        <>
            {/* HERO SECTION */}
            <section className="text-center py-24">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Our Case Studies
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
            </section>

            {/* INTRO / DESCRIPTION */}
            <section className="max-w-4xl mx-auto mb-20 text-center">
                <p className="text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                    habitant morbi tristique senectus et netus et malesuada fames ac turpis
                    egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
                    tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
                </p>
            </section>

            {/* CASE STUDIES GRID */}
            <section>
                <div className="grid gap-8 md:grid-cols-2">
                    {caseStudies.map((cs) => (
                        <CaseStudyCard
                            key={cs.slug}
                            title={cs.title}
                            slug={cs.slug}
                            image={cs.heroImage}
                        />
                    ))}
                </div>
            </section>

            {/* PROCESS SECTION */}
            <section className="py-24 mt-24 bg-white rounded-lg shadow-lg">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold">How We Approach Every Project</h2>
                    <p className="mt-4 text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto text-center">
                    {[
                        "Discovery",
                        "Strategy",
                        "Execution",
                        "Optimization",
                    ].map((step, index) => (
                        <div key={index}>
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
                                {index + 1}
                            </div>
                            <h3 className="font-semibold text-lg">{step}</h3>
                            <p className="mt-2 text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 text-center">
                <h2 className="text-3xl font-bold">
                    Want Results Like These?
                </h2>
                <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="mt-8">
                    <a
                        href="/about"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-8 py-3 text-white font-semibold hover:bg-indigo-500"
                    >
                        Learn About Our Team
                    </a>
                </div>
            </section>
        </>
    );
}
