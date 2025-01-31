"use client";
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import LatestOrderItem from "@/components/order/LatestOrderItem";
import { OrderWithProducts } from "@/src/types";

export default function OrdersPage() {
  const url = "/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((response) => response.json())
      .then((data) => data);

  const { data, isLoading, error } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 2000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <p>Cargando...</p>
   if(data) return (
      <>
        <h1 className="text-center mt-20 text-6xl font-black">
          Ordenes Listas
        </h1>
        <Logo />

        {data.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto mt-10 ">
            {data.map((order) => (
              <LatestOrderItem 
                key={order.id} 
                order={order} 
            />
            ))}
          </div>
        ) : (
          <p className="text-center my-10">No hay ordenes listas</p>
        )}
      </>
    );
}
