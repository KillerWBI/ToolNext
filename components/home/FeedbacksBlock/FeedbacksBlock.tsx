'use client';

import StarRating from "./StarsRating";
import { Feedback } from "@/types/feedback";
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./FeedbacksBlock.module.css";


type Props = {
  feedbacks: Feedback[];
};

export default function FeedbacksBlock({ feedbacks }: Props) {
  return (
    <Swiper slidesPerView={1}>
      {feedbacks.map((feedback) => (
        <SwiperSlide key={feedback._id.$oid}>
          <StarRating value={feedback.rate} />
          <p>{feedback.description}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}