"use client";
import { fetchBookById, updateUserRating } from "@/lib/actions/book.actions";
import { generateFloatWithOneDecimal, getHours, getMinutes } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaStar } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { BookProps } from "@/types";


const Page = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<BookProps | null>();
  const [showPDF, setShowPDF] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [userRating, setUserRating] = useState<number>(-1);
  const [hoverRating, setHoverRating] = useState<number>(-1);
  const [staticRating, setStaticRating] = useState<number>(0);
  const [staticReviewCount, setStaticReviewCount] = useState<number>(0);
  const [staticRecommendedPercentage, setStaticRecommendedPercentage] =
    useState<number>(0);

  useEffect(() => {
    const getBook = async () => {
      if (bookId) {
        const book = await fetchBookById({
          id: bookId.toString(),
        });
        setBook(book);
        setShowRating(book?.rating !== 0);
        setUserRating(book?.rating || -1);
        setStaticRating(generateFloatWithOneDecimal());
        setStaticReviewCount(Math.floor(Math.random() * 1000));
        setStaticRecommendedPercentage(Math.floor(Math.random() * 100));
      }
    };
    getBook();
  }, [bookId]);

  const handleShowPDF = () => {
    setShowPDF(true);
  };

  const handleClosePDF = () => {
    setShowPDF(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClosePDF();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleRating = async (rating: number) => {
    setUserRating(rating);
    await updateUserRating({
      bookId: bookId.toString(),
      rating: rating,
    });
  };

  return (
    <>
      <Link
        href="/"
        className="text-[#27378C] text-small-regular border-2 border-[#27378C] rounded px-4 py-2 hover:border-[#27388c7b]"
      >
        {" "}
        &lt; &nbsp; Back to Home
      </Link>
      {book && (
        <div className="flex flex-col lg:flex-row gap-12 mt-10">
          <div className="relative w-[400px] h-[500px]">
            <Image
              src={book.image}
              alt="book_image"
              fill
              className="rounded-xl object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-heading2-bold md:text-heading1-bold capitalize text-[#27378C]">
              {book.title}
            </h1>
            <h2 className="text-body-medium md:text-heading4-medium capitalize text-gray-1">
              {book.author}
            </h2>
            <h2 className="text-small-medium md:text-body-medium capitalize text-gray-1">
              Book Read Time: {getHours(book.readTime)} hours{" "}
              {getMinutes(book.readTime)} Mins
            </h2>
            <p className="text-small-medium md:text-body-medium mt-6 mb-8">{book.description}</p>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="">
                <p>Summary</p>
                <div className="flex gap-4">
                  <Image
                    src="/rating.png"
                    width={150}
                    height={150}
                    alt="Rating"
                  />
                  <div className="flex flex-col justify-between px-8 md:border-r mr-8">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        {staticRating.toFixed(1)}{" "}
                        <FaStar className="text-yellow-400" />
                      </div>
                      <p>{staticReviewCount} Reviews</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        {staticRecommendedPercentage}%
                      </div>
                      <p>Recommended</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-evenly">
                {showRating ? (
                  <>
                    <p>
                      Rating <span className="text-red-500">*</span>
                    </p>
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          key={i}
                          className={`text-heading2-bold cursor-pointer ${
                            i + 1 <= userRating
                              ? "text-yellow-400"
                              : i <= hoverRating
                              ? "text-yellow-300"
                              : "text-gray-300"
                          }`}
                          onClick={() => handleRating(i+1)}
                          onMouseEnter={() => setHoverRating(i)}
                          onMouseLeave={() => setHoverRating(-1)}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="w-2/3 mb-3">
                      You have not rated this book yet. Click on the button to
                      start rating
                    </p>
                    <button
                      className="text-[#27378C] text-small-semibold border-2 border-[#27378C] rounded-lg px-5 py-3 hover:border-[#27388c7b] hover:text-[#27388c7b]"
                      onClick={() => setShowRating(!showRating)}
                    >
                      Rate this Book
                    </button>
                  </>
                )}
              </div>
            </div>
            <button
              className="bg-[#27378C] text-white px-5 py-3 rounded-lg font-light text-small-medium mt-8 hover:bg-[#27388cd6]"
              onClick={handleShowPDF}
            >
              Read this Book
            </button>
            {showPDF && book.pdf && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={handleClosePDF}
              >
                <div className="relative h-screen w-screen">
                  <button
                    className="absolute top-0 right-0 m-4 text-white"
                    onClick={handleClosePDF}
                  >
                    Close
                  </button>
                  <iframe
                    src={book.pdf}
                    width="80%"
                    height="100%"
                    className="mx-auto"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
