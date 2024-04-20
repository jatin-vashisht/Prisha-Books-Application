'use client'
import React, { useEffect, useState } from "react";
import BookCard from "./cards/BookCard";
import { fetchBooks } from "@/lib/actions/book.actions";
import { Book } from "@prisma/client";

const Books = ({ userId }: { userId: string }) => {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    fetchBooks({ userId }).then((books) => setBooks(books || []));
  }, [userId]);
  return (
    <>
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </>
  );
};

export default Books;
