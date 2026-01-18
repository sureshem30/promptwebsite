import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "../../data/casestudies";
import { capitalizeTitle } from "../../lib/capitalize";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const caseStudy = caseStudies.find(cs => cs.slug === slug);

    return {
        title: caseStudy
            ? `${capitalizeTitle(caseStudy.title)} | My Company`
            : "Case Study | My Company"
    };
}

export default async function CaseStudyDetail({ params }: PageProps) {
    const { slug } = await params;

    const caseStudy = caseStudies.find((cs) => cs.slug === slug);
    if (!caseStudy) return notFound();

    return (
        <article className="max-w-5xl mx-auto">

            {/* HERO IMAGE */}
            <div className="relative w-full h-[420px] rounded-lg overflow-hidden mb-10">
                <Image
                    src={caseStudy.heroImage}
                    alt={caseStudy.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <Link href="/case-studies" className="text-orange-500 text-sm mb-6 inline-block">
                ← Back
            </Link>

            <h1 className="text-4xl font-bold text-sky-600 mb-10 capitalize">
                {caseStudy.title}
            </h1>

            <div className="bg-white rounded-lg p-10 space-y-12">

                {/* SUMMARY */}
                <section className="grid md:grid-cols-[180px_1fr] gap-6">
                    <strong>Summary:</strong>
                    <div className="space-y-4 text-gray-700">
                        {caseStudy.summary.map((item, i) => {
                            return item.type == "paragraph" ? <p key={i}>{item.content}</p> : <span key={i} className="font-semibold mb-2">{item.content}</span>
                        })}
                    </div>
                </section>

                <hr />

                {/* OBJECTIVES */}
                {caseStudy.objectives.length !== 0 ? <section className="grid md:grid-cols-[180px_1fr] gap-6">
                    <strong>Objectives:</strong>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {caseStudy.objectives.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section> : null}

                {caseStudy.objectives.length !== 0 ? <hr /> : null}

                {caseStudy.Initiatives !== "" ? <section className="grid md:grid-cols-[180px_1fr] gap-6">
                    <strong>Initiatives:</strong>
                    <div className="space-y-4 text-gray-700">
                        {caseStudy.Initiatives}
                    </div>
                </section> : null}

                {caseStudy.Initiatives !== "" ? <hr /> : null}

                {/* EXECUTION */}
                {caseStudy.execution.length !== 0 ? <section className="grid md:grid-cols-[180px_1fr] gap-6">
                    <strong>Execution:</strong>
                    <div className="space-y-6 text-gray-700">
                        {caseStudy.execution.map((block, i) => (
                            <div key={i}>
                                <p className="font-semibold mb-2">{block.title}</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    {block.points.map((point, j) => (
                                        <li key={j}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section> : null}

                {caseStudy.execution.length !== 0 ? <hr /> : null}

                {/* RESULTS */}
                <section className="grid md:grid-cols-[180px_1fr] gap-6">
                    <strong>Results:</strong>
                    {Array.isArray(caseStudy.results) ? <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {caseStudy.results.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul> : <div className="space-y-4 text-gray-700">
                        {caseStudy.Initiatives}
                    </div>}

                </section>

                {/* CONCLUSION */}
                <p className="text-gray-700 leading-relaxed">
                    {caseStudy.conclusion}
                </p>
            </div>
        </article>
    );
}
