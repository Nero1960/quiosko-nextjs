import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({
    take: 5,
    where: {
      orderReadyAt: {
        not: null,
      },
    },
    orderBy: {
      orderReadyAt: "desc",
    },

    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  await prisma.$disconnect();

  return Response.json(orders)
}
