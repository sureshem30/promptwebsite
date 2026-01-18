import Link from "next/link";
import Image from "next/image";

type Props = {
    title: string;
    slug: string;
    image: string;
};

export default function CaseStudyCard({
    title,
    slug,
    image,
}: Props) {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow hover:shadow-lg transition">
            {/* IMAGE */}
            <div className="relative h-56 w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-semibold capitalize mb-2">{title}</h3>
                <Link
                    href={`/case-studies/${slug}`}
                    className="mt-auto inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                    Read Case Study
                </Link>
            </div>
        </div>
    );
}
