import { prisma } from "@/src/lib/prisma"

export async function GET() {

     const orders = await prisma.order.findMany({
        where: {
          status: false
        },
    
        include: {
          orderProducts: {
            include: {
              product: true
            }
          }
        }
      })
      await prisma.$disconnect();
      return Response.json(orders)
    
}