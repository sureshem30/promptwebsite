export const metadata = {
    title: "About Us",
};

export default function About() {
    return (
        <>
            {/* HERO SECTION */}
            <section className="text-center py-24">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    About Our Company
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
            </section>

            {/* COMPANY STORY */}
            <section className="py-20 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                    habitant morbi tristique senectus et netus et malesuada fames ac turpis
                    egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
                    tempor sit amet, ante.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                    quae ab illo inventore veritatis et quasi architecto beatae vitae.
                </p>
            </section>

            {/* VALUES SECTION */}
            <section className="py-20 bg-white rounded-lg shadow-sm">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold">Our Core Values</h2>
                    <p className="mt-4 text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {[
                        "Integrity & Trust",
                        "Customer First",
                        "Continuous Innovation",
                    ].map((title, index) => (
                        <div
                            key={index}
                            className="rounded-lg bg-gray-50 p-6 shadow hover:shadow-md transition"
                        >
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <p className="mt-3 text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Pellentesque habitant morbi tristique senectus et netus
                                et malesuada fames ac turpis egestas.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* EXPERIENCE / STATS */}
            <section className="py-20 mt-10 bg-white rounded-lg shadow-sm">
                <div className="grid gap-10 sm:grid-cols-3 text-center max-w-5xl mx-auto">
                    <div>
                        <p className="text-4xl font-bold text-indigo-600">10+</p>
                        <p className="mt-2 text-gray-600">Years in Business</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-indigo-600">150+</p>
                        <p className="mt-2 text-gray-600">Successful Projects</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-indigo-600">30+</p>
                        <p className="mt-2 text-gray-600">Team Members</p>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 text-center">
                <h2 className="text-3xl font-bold">
                    Let’s Build Something Great Together
                </h2>
                <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="mt-8">
                    <a
                        href="/case-studies"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-8 py-3 text-white font-semibold hover:bg-indigo-500"
                    >
                        View Our Work
                    </a>
                </div>
            </section>
        </>
    );
}
