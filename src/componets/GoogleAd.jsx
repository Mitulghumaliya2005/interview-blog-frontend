import { useEffect } from "react";

function GoogleAd({
    adClient = "ca-pub-3008502799447840",
    adSlot,
    adFormat = "auto",
    fullWidthResponsive = true,
    style = { display: "block", margin: "20px auto" },
}) {
    useEffect(() => {
        if (!adSlot) {
            console.warn("GoogleAd: adSlot prop is required.");
            return;
        }

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.log(err);
        }
    }, [adSlot]);

    return (
        <ins
            className="adsbygoogle"
            style={style}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        />
    );
}

export default GoogleAd;