"use client";
import { updateProduct } from "@/actions/update-product-action";
import { ProductSchema } from "@/src/schema";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function EditProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const id = +params.id!;
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    console.log(data);

    const result = ProductSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await updateProduct(result.data, id);

    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    toast.success("Producto actualizado correctamente");
    router.push('/admin/products');
  };

  return (
    <>
      <div className="bg-whit mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
        <form className="space-y-5" action={handleSubmit}>
          {children}

          <input
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-800 uppercase cursor-pointer text-white w-full mt-5 p-3 font-bold"
            value="Guardar cambios"
          />
        </form>
      </div>
    </>
  );
}
