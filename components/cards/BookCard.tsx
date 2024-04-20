import { BookProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

const BookCard = ({
  id,
  title,
  author,
  image,
}: BookProps) => {
  return (
    <Link href={`/book/${id}`}>
        <div className='relative h-72 w-48'>
          <Image
            src={image || ""}
            alt='book_image'
            fill
            className='rounded-xl object-cover hover:scale-105 duration-300 ease-in-out'
          />
          
          <div className="absolute -bottom-[3.5rem]">
            <h4 className="font-semibold italic capitalize text-base-medium md:text-body1-bold">{title}</h4>
            <p className="text-gray-1 capitalize text-small-regular md:text-base-medium">{author}</p>
          </div>
          
        </div>
    </Link>
  );
};

export default BookCard;
