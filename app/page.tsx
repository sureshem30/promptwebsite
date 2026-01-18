export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="text-center py-24">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Building Digital Products That Drive Results
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/case-studies"
            className="rounded-md bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-500"
          >
            View Case Studies
          </a>
          <a
            href="/about"
            className="rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-100"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold">
            Why Companies Choose Us
          </h2>
          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Scalable Architecture",
            "Performance Focused",
            "User-Centered Design",
          ].map((title, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow hover:shadow-md transition"
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

      {/* STATS SECTION */}
      <section className="py-20 bg-white rounded-lg shadow-sm">
        <div className="grid gap-10 sm:grid-cols-3 text-center">
          <div>
            <p className="text-4xl font-bold text-indigo-600">120+</p>
            <p className="mt-2 text-gray-600">Projects Delivered</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-indigo-600">50+</p>
            <p className="mt-2 text-gray-600">Happy Clients</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-indigo-600">8+</p>
            <p className="mt-2 text-gray-600">Years Experience</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold">
          Ready to Start Your Next Project?
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
            Explore Our Work
          </a>
        </div>
      </section>
    </>
  );
}
