import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocuments extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
                    <link rel="icon" type="image/png" href="/favicon/calendar.png" />
                </Head>
                    <body>
                        <Main />
                        <NextScript />
                    </body>
            </Html>
        )
    }
}