import React, { useState } from 'react';
import { Label, Textarea } from "flowbite-react";
import { Button } from "flowbite-react";
import { Rating } from "flowbite-react";

export default function Feedback() {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-100 h-100 bg-slate-300 border-black p-5 rounded-lg">
        <div className="mb-8 flex justify-between">
          <h1 className="text-xl font-bold">Kingsman</h1>
          <h1 className="text-xl font-bold">Your Feedback</h1>
        </div>
        <hr />

        <div className="mb-8">
          <h3 className="text-lg">We would like your feedback to improve our service</h3>
          <h3 className="text-lg">What is your opinion of our Foods</h3>
          <Rating
            size="md"
            value={rating}
            onChange={handleRatingChange}
          >
            <Rating.Star style={{ color: rating >= 1 ? 'yellow' : 'gray' }} />
            <Rating.Star style={{ color: rating >= 2 ? 'yellow' : 'gray' }} />
            <Rating.Star style={{ color: rating >= 3 ? 'yellow' : 'gray' }} />
            <Rating.Star style={{ color: rating >= 4 ? 'yellow' : 'gray' }} />
            <Rating.Star style={{ color: rating >= 5 ? 'yellow' : 'gray' }} />
          </Rating>
        </div>
        <hr />

        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Your Feedback" />
          </div>
          <Textarea id="comment" placeholder="Leave a comment..." required rows={4} />
        </div>
         
        <div className="mb-4">
          <Button color="blue">Blue</Button>
        </div>
      </form>
    </div>
  );
}


