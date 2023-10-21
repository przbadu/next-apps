import Image from "next/image";
import Link from "next/link";

import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { getTimeAgo, humanizeNumber } from "@/lib/utils";

interface Props {
  _id: number;
  title: string;
  tags: {
    _id: number,
    name: string
  }[];
  answers: number;
  votes: number;
  views: number;
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  answers,
  votes,
  views,
  author,
  createdAt,
}: Props) => {
  console.log(_id)

  return (
    <div className="card-wrapper p-9 sm:px-11 rounded-[10px]">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeAgo(createdAt)}
          </span>

          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-2 flex-1">{title}</h3>
          </Link>
        </div>

        {/* If signed in add edit delete action */}
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags && tags.length > 0 && tags.map(tag => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <div className="flex flex-row items-center gap-2">
          <Metric
            imgUrl={author.picture}
            alt="avatar"
            value={author.name}
            title={` • asked ${getTimeAgo(createdAt)}`}
            textStyles="small-medium text-dark400_light800"
            isAuthor
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-4">
          <Metric
            imgUrl='/assets/icons/like.svg'
            alt="likes"
            value={humanizeNumber(votes)}
            title='votes'
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl='/assets/icons/message.svg'
            alt="answers"
            value={humanizeNumber(answers)}
            title='answers'
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl='/assets/icons/eye.svg'
            alt="views"
            value={humanizeNumber(views)}
            title='views'
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div >
  )
}

export default QuestionCard
