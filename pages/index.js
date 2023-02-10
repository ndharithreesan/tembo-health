import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
    console.log('returning home')
    return (
        <>
            <Head>
                <title>Tembo Health Secrets Store</title>
            </Head>
            <div className="container d-flex align-items-center justify-content-center">
                <div>
                    <p className="homeText" align="center">I want to:</p>
                    <Link className="homeButtons" href="/view">
                        <button type="button" className="btn btn-dark">View a Secret</button>
                    </Link>
                    <Link className="homeButtons" href="/share">
                        <button type="button" className="btn btn-dark">Share a Secret</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
