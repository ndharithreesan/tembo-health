import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from "next/navigation";

export default function View() {
    const router = useRouter();
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            password: event.target.password.value
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/viewSecret'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        const result = await response.json();
        const status = response.status;

        //TODO: instead of alerts here, we could reroute to a new page with the secret or drop it in as a notification
        if (status === 500 || status === 400) {
            alert(result.error);
        } else {
            alert('Your secret is: ' + result.secret);
        }
        router.refresh();

    }

    return (
        <>
            <Head>
                <title>Tembo Health Secrets Store: View Secret</title>
            </Head>
            <div className="container d-flex align-items-center justify-content-center">
                <div>
                    <p className="homeText" align="center">Enter Password</p>
                    <form onSubmit={handleSubmit}>
                        <input className="input" type="text" id="password" name="password" required/>
                        <button className="btn btn-dark" type="submit">Submit</button>
                    </form>
                    <div className="d-flex align-items-center justify-content-center">
                        <Link className="homeButtons" href="/">
                            <button type="button" className="btn btn-dark">Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}