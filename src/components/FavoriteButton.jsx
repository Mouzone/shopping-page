import {useState} from "react";
import PropTypes from "prop-types";

export default function FavoriteButton({liked, setLiked, id}) {
    const [ fillColor, setFillColor ] = useState(
        liked.find(curr_id => curr_id === id) ? "red" : "black"
    )

    const onClick = () => {
        setFillColor(prevColor => prevColor === "black" ? "red" : "black")
        if (liked.find(curr_id => curr_id === id)) {
            setLiked([...liked.filter(curr_id => curr_id !== id)])
        } else{
            setLiked([...liked, id])
        }
    }

    return (
        <button className="flex items-center gap-1 border p-2 rounded border-black text-lg" onClick={onClick}>
            Favorite
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6" fill={fillColor}>
                <title>heart</title>
                <path
                    d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
            </svg>
        </button>
    )
}

FavoriteButton.propTypes = {
    liked: PropTypes.arrayOf(PropTypes.number).isRequired,
    setLiked: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
}