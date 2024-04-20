"use client";
import { usePathname } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { RiBookMarkedFill } from "react-icons/ri";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BookCard from "./cards/BookCard";
import { fetchBooks, fetchFavoriteBooks } from "@/lib/actions/book.actions";
import { Book } from "@prisma/client";

const Hero = ({ userId }: { userId: string }) => {
  const pathname = usePathname();
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    if (pathname === "/favorites") {
      fetchFavoriteBooks({ userId }).then((books) => setBooks(books || []));
    } else {
      fetchBooks({ userId }).then((books) => setBooks(books || []));
    }
  }, [userId, pathname]);
  return (
    <div className="flex flex-col pb-20 md:pb-0">
      <h1 className="head-text text-left text-[#27378C] flex gap-2 justify-center md:justify-start items-center">
        {pathname === "/favorites" ? (
          <>
            <FaHeart /> Favorites
          </>
        ) : (
          <>
            <RiBookMarkedFill /> My Books
          </>
        )}
      </h1>
      <section className="mt-9 flex gap-x-10 flex-wrap gap-y-20 justify-center md:justify-start">
        <>
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
          {pathname !== "/favorites" && (
            <Link
              href={`/create/${userId}`}
              className="h-72 w-48 border-2 border-[#27378C] hover:border-[#27388c7b] text-[#27378C] hover:text-[#27388c7b] cursor-pointer border-dashed hidden md:flex justify-center items-center flex-col rounded-xl"
            >
              <p>+</p>
              <p>Add a Book</p>
            </Link>
          )}
        </>
      </section>
    </div>
  );
};

export default Hero;
