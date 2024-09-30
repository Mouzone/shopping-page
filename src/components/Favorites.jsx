import {useParams} from "./App.jsx";

export default function Favorites() {
    const { liked } = useParams()
    console.log(liked)
}