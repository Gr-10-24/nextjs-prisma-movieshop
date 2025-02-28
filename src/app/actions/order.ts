import { prisma } from "@/lib/prisma";

export async function FetchOrders() {
  try {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        totalAmount: true,
        items: {
          select: {
            id: true,
            price: true,
            movie: {
              select: {
                id: true,
                price: true,
                title: true,
                stock: true,
                releaseDate: true,
                runtime: true,
                genre: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                starring: {
                  select: {
                    id: true,
                    role: true,
                    person: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return orders.map((order) => ({
      id: order.id,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      status: order.status,
      totalAmount: order.totalAmount.toNumber(),
      items: order.items.map((item) => ({
        id: item.id,
        price: item.price.toNumber(),
        movie: {
          id: item.movie.id,
          price: item.movie.price.toNumber(),
          title: item.movie.title,
          stock: item.movie.stock,
          releaseDate: item.movie.releaseDate,
          runtime: item.movie.runtime,
          genre: item.movie.genre.map((genre) => ({
            id: genre.id,
            name: genre.name,
          })),
          starring: item.movie.starring.map((star) => ({
            id: star.id,
            role: star.role,
            person: {
              id: star.person.id,
              name: star.person.name,
            },
          })),
        },
      })),
    }));
  } catch (error) {
    console.log("Error occured while fetching data", error);
    throw new Error("Error occurred while fetching data");
  }
}

export async function FetchOrderItems() {
  try {
  const purchasedMovies =  await prisma.orderItem.groupBy({
      by: ["movieId"],
      _count: {
        movieId: true,
      },
    });
    return purchasedMovies;
  } catch (error) {
    console.log("unexpected error occurred", error);
    throw new Error("Error occurred");
  }
}
