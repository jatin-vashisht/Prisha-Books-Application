"use server";
import { BookDataProps } from "@/types";
import prisma from "@/utils/db";

export async function fetchBooks({ userId }: { userId: string }) {
  try {
    const books = await prisma.book.findMany({ where: { userId } });
    return books;
  } catch (error: any) {
    throw new Error(`Failed to fetch books: ${error.message}`);
  }
}

export async function fetchBookById({ id }: { id: string }) {
  try {
    const book = await prisma.book.findFirst({ where: { id } });
    if (!book) throw new Error("Book not found");
    return book;
  } catch (error: any) {
    // throw new Error(`Failed to fetch book: ${error.message}`);
  }
}

export async function addBook(Book: BookDataProps) {
  const { title, author, description, readTime, image, pdf, userId } = Book;
  try {
    const createdBook = await prisma.book.create({
      data: {
        title,
        author,
        description,
        readTime: readTime,
        image: image || "",
        pdf: pdf || "",
        userId,
      },
    });
    return createdBook;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
}

export async function updateUserRating({
  rating,
  bookId,
}: {
  rating: number;
  bookId: string | string;
}) {
  try {
    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        rating: rating,
      },
    });
  } catch (error) {
    console.error("Error updating book rating:", error);
    throw error;
  }
}

export async function fetchFavoriteBooks({ userId }: { userId: string }) {
  try {
    const favoriteBooks = await prisma.book.findMany({
      where: {
        userId,
        rating: { gt: 0 },
      },
    });
    return favoriteBooks;
  } catch (error) {
    console.error("Error fetching favorite books:", error);
    throw error;
  }
}