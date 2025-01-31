"use client";
import { SearchSchema } from "@/src/schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProductSearchForm() {
  const router = useRouter();
  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };

    const result = SearchSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }

    router.push(`/admin/products/search?search=${result.data.search}`);
  };
  return (
    <form 
        className="flex items-center gap-4" 
        action={handleSearchForm}
    >
      <input
        type="text"
        placeholder="Buscar Productos"
        className="p-2 placeholder:text-gray-400 w-full"
        name="search"
      />

      <input
        type="submit"
        value={"Buscar"}
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
      />
    </form>
  );
}
