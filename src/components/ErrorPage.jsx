import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
    const error = useRouteError()
    console.error(error)

    return (
        <div className="h-[80vh] flex flex-col justify-center items-center gap-5">
            <h1 className="bg-black text-white text-5xl p-4"> Sorry, an unexpected error has occurred.</h1>
            <p>
                <i className="bg-black text-white text-2xl p-3">{error.statusText || error.message}</i>
            </p>
        </div>
    )
}