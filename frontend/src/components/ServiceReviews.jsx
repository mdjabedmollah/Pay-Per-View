import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ServiceReviews({ serviceId }) {
  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState(null);

  useEffect(() => {
    api.get(`/review/${serviceId}`).then((res) => {
      setReviews(res.data.reviews);
      setAvg(res.data.avgRating);
    });
  }, [serviceId]);

  if (!reviews.length) {
    return (
      <p className="text-sm text-gray-400 mt-3">
        No reviews yet
      </p>
    );
  }

  return (
    <div className="mt-4">
      <p className="font-semibold mb-2">
         {avg} / 5 ({reviews.length} reviews)
      </p>

      <div className="space-y-2">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="border rounded p-3 text-sm"
          >
            <p className="font-medium">
              {r.reviewerId.email}
            </p>
            <p> {r.rating}</p>
            {r.comment && (
              <p className="text-gray-600">
                {r.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
