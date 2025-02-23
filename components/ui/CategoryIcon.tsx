"use client"
import Image from "next/image";
import Link from "next/link";
import { Category } from "@prisma/client";
import { useParams } from "next/navigation";

type CategoryIconProps = {
  category: Category;
};
export default function CategoryIcon({ category }: CategoryIconProps) {

  const params = useParams<{category: string}>();
  return (
    <div
      className={`${category.slug === params.category ? 'bg-amber-500' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-2 last-of-type:border-b-0`}
    >
      <div className="relative w-16 h-16">
        <Image src={`/icon_${category.slug}.svg`} alt="imagen category" fill />
      </div>

      <Link href={`/order/${category.slug}`} className="text-xl font-bold">{category.name}</Link>
    </div>
  );
}
