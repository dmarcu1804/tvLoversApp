import { useParams } from 'react-router-dom'

const ShowDetail = () => {
    const { id } = useParams()
    console.log('showDetail id pressed',id)
    return (
        <>
            <h1>
                hello
            </h1>
        </>
    )
}

export default ShowDetail