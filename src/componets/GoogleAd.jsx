import { useEffect } from "react";

function GoogleAd() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            //   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-client="ca-pub-3008502799447840"
            data-ad-slot="9695308608"
            // data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
}

export default GoogleAd;