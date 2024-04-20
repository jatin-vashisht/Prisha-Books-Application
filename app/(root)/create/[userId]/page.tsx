"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { IoIosInformationCircleOutline, IoMdCloudUpload } from "react-icons/io";
import { storage } from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useParams, useRouter } from "next/navigation";
import { addBook } from "@/lib/actions/book.actions";
import { BookFormProps } from "@/types";
import Loading from "@/components/cards/Loading";

const BookForm = () => {
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<BookFormProps>({
    image: null,
    title: "",
    author: "",
    readTime: "",
    description: "",
    pdf: null,
  });

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setBook({ ...book, pdf: e.target.files[0] });
    }
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, image: e.target.files?.[0] || null });
  };

  const handleCoverDivClick = () => {
    imageInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleBookSubmit(book);
  };

  const handleImageUpload = async (book: BookFormProps) => {
    if (book.image) {
      const storageRef = ref(storage, `images/${book.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, book.image);

      try {
        await uploadTask;
        const imageUrl = await getDownloadURL(storageRef);
        return imageUrl;
      } catch (error: any) {
        console.log("Error uploading image:", error.message);
      }
    }
  };

  const handlePdfUpload = async (book: BookFormProps) => {
    if (book.pdf) {
      const storageRef = ref(storage, `pdfs/${book.pdf.name}`);
      const uploadTask = uploadBytesResumable(storageRef, book.pdf);

      try {
        await uploadTask;
        const pdfUrl = await getDownloadURL(storageRef);
        return pdfUrl;
      } catch (error: any) {
        console.log("Error uploading PDF:", error.message);
      }
    }
  };

  const handleBookSubmit = async (book: BookFormProps) => {
    setLoading(true);
    try {
      const imageUrl = await handleImageUpload(book);
      const pdfUrl = await handlePdfUpload(book);

      const bookData = {
        title: book.title,
        author: book.author,
        description: book.description,
        readTime: parseInt(book.readTime),
        image: imageUrl || "",
        pdf: pdfUrl || "",
        userId: userId.toString(),
      };

      const createdBook = await addBook(bookData);
      if (createdBook) {
        console.log("Book added successfully:", createdBook);
        setLoading(false);
        setBook({
          image: null,
          title: "",
          author: "",
          readTime: "",
          description: "",
          pdf: null,
        });
        router.push("/");
      } else {
        setLoading(false);
        console.error("Error adding book:");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error adding book:", error);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Link
        href="/"
        className="text-[#27378C] text-small-regular border-2 border-[#27378C] rounded px-4 py-2 hover:border-[#27388c7b]"
      >
        {" "}
        &lt; &nbsp; Back to Home
      </Link>
      <div className="flex flex-col lg:flex-row gap-12 mt-10">
        <div
          className={`w-[400px] h-[500px] ${
            book.image
              ? ""
              : "border-2 border-dashed border-[#27378C] hover:border-[#27388c7b] text-[#27378C] hover:text-[#27388c7b]"
          } cursor-pointer rounded-lg flex justify-center items-center`}
          onClick={handleCoverDivClick}
        >
          <div className="py-2 rounded-lg font-medium cursor-pointer flex flex-col justify-center items-center">
            {book.image && book.image instanceof File ? (
              <Image
                src={URL.createObjectURL(book.image)}
                alt="Book Image"
                width={400}
                height={500}
                className="object-cover rounded-lg w-auto h-auto"
              />
            ) : (
              <>
                <span className="text-heading4-medium">+</span>
                <span>Add a Book Cover</span>
              </>
            )}
          </div>
          <input
            type="file"
            id="image"
            name="image"
            className="hidden"
            onChange={handleCoverChange}
            ref={imageInputRef}
            accept="image/*"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="title"
                className="block font-medium text-gray-700"
              >
                Name of the Book<span className="text-red-500">*</span>
              </label>
              <i className="">
                <IoIosInformationCircleOutline />
              </i>
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleChange}
              placeholder="Enter the published name"
              className="mt-1 py-2 px-3 block w-full font-normal rounded-md border-2 border-gray-300 text-small-medium focus:outline-[#27378C]"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="author"
                  className="block font-medium text-gray-700"
                >
                  Author of the Book<span className="text-red-500">*</span>
                </label>
                <i className="">
                  <IoIosInformationCircleOutline />
                </i>
              </div>
              <input
                type="text"
                id="author"
                name="author"
                placeholder="Add all the authors comma seperated"
                value={book.author}
                onChange={handleChange}
                className="mt-1 py-2 px-3 block w-full font-normal rounded-md border-2 border-gray-300 text-small-medium focus:outline-[#27378C]"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="readTime"
                  className="block font-medium text-gray-700"
                >
                  Book read time<span className="text-red-500">*</span>
                </label>
                <i className="">
                  <IoIosInformationCircleOutline />
                </i>
              </div>
              <input
                type="text"
                id="readTime"
                name="readTime"
                value={book.readTime}
                onChange={handleChange}
                placeholder="Add time in mins"
                className="mt-1 py-2 px-3 block w-full font-normal rounded-md border-2 border-gray-300 text-small-medium focus:outline-[#27378C]"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="description"
                className="block font-medium text-gray-700"
              >
                Book description<span className="text-red-500">*</span>
              </label>
              <i className="">
                <IoIosInformationCircleOutline />
              </i>
            </div>
            <textarea
              id="description"
              name="description"
              value={book.description}
              onChange={handleChange}
              placeholder="Should not be more than 300 words"
              className="mt-1 py-2 px-3 block w-full font-normal rounded-md border-2 border-gray-300 text-small-medium focus:outline-[#27378C] resize-none"
              maxLength={300}
              rows={5}
            />
          </div>
          <div className="w-1/2 sm:w-1/3 lg:w-1/2 xl:w-1/3">
            <div className="flex justify-between items-center">
              <label
                htmlFor="pdf"
                className="block font-medium text-gray-700 mb-3"
              >
                Upload PDF
              </label>
              <i>
                <IoIosInformationCircleOutline />
              </i>
            </div>
            <div
              className={`mt-2 h-32 ${
                book.pdf ? "" : "border-2 border-dashed text-[#27378C]"
              } cursor-pointer rounded-lg flex flex-col text-small-medium justify-center ${
                book.pdf ? "items-start" : "items-center px-5"
              }`}
              onClick={handleDivClick}
            >
              {book.pdf ? (
                <div className="my-3">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                    height={100}
                    width={100}
                    alt="Pdf icon"
                  />
                  <p className="text-[0.75rem] mt-1 text-slate-500">
                    {book.pdf.name}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col justify-between items-center">
                  <IoMdCloudUpload className="text-heading2-bold my-2" />
                  <p>
                    <span>Browse </span> or drop file here
                  </p>
                  <p className="text-[0.75rem] mt-1 text-slate-500">
                    Supports: PDF; upto 10MB
                  </p>
                </div>
              )}
              <input
                type="file"
                id="pdf"
                name="pdf"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
                accept=".pdf, application/pdf"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-[#27378C] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#27388ce2] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add book
          </button>
        </form>
      </div>
    </>
  );
};

export default BookForm;
