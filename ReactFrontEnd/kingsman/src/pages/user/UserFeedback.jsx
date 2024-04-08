 
import ShowFeedback from './ShowFeedback'; // Import ShowFeedback component

import React, { useState } from 'react';
import { Textarea } from "flowbite-react";
import { Button } from "flowbite-react";
import { Rating } from '@mui/material';
import Typography from '@mui/material/Typography';

 

export default function UserFeedback() {
    const [value, setValue] = useState(3); // Placeholder value (3)
  
    return (
      <div className="flex justify-center items-center mt-0">
        <div className="flex flex-row w-full">
  
          {/* Left side for ShowFeedback */}
          <div className="w-1/3 p-5">
            <ShowFeedback />
          </div>
  
          {/* Right side for Feedback */}
          <div className="w-2/3 p-5">
            <div className="sticky top-0 h-screen overflow-y-auto flex justify-center items-center  ">
              <form className="p-5 bg-slate-300 border-black rounded-lg">
                <div className="mb-8 flex justify-between">
                  <h1 className="text-xl font-bold">Kingsman</h1>
                  <h1 className="text-xl font-bold">Your Feedback</h1>
                </div>
                <hr />
  
                <div className="mb-7">
                  <p className="text-lg mb-2">We would like your feedback to improve our service</p>
                  <div className="mb-2 flex justify-center items-center">
                    <Typography component="legend">Rate our Foods</Typography>
                  </div>
                  <div className="flex justify-center items-center">
                    <Rating 
                      name="foods-rating"
                      value={value}
                      precision={0.5} // Allow half-star increments
                      sx={{ fontSize: '32px' }} // Increase the size of stars
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </div>
                </div>
                <hr />
  
                <div className="mb-4">
                  <div className="mb-2">
                    <label htmlFor="comment" className="text-lg">Your Feedback</label>
                  </div>
                  <Textarea id="comment" placeholder="Leave an opinion..." required rows={7} />
                </div>
                
                <div className="mb-4 flex justify-end">
                  <Button color="blue" pill>Submit Feedback</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  