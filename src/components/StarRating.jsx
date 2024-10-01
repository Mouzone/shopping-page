import {FaRegStar, FaStar, FaStarHalfAlt} from "react-icons/fa";
import PropTypes from "prop-types";

export default function StarRating({ rating, color }) {
    const totalStars = 5

    const stars = Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1
        if (rating >= starValue) {
            return <FaStar key={index} style={{ color: color}}/>
        } else if (rating >= starValue - 0.5) {
            return <FaStarHalfAlt key={index} style={{ color: color }}/>
        } else {
            return <FaRegStar key={index} style={{ color: color }}/>
        }
    })

    return (
        <div className="flex mr-1 mt-1">
            {stars}
        </div>
    )
}

StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}