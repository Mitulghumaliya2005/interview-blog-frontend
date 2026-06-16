import { useEffect } from "react";

export default function GPTAd() {
    useEffect(() => {
        window.googletag = window.googletag || { cmd: [] };

        window.googletag.cmd.push(() => {
            // Prevent duplicate slot creation
            const existingSlots = window.googletag.pubads().getSlots();

            const slotExists = existingSlots.some(
                (slot) => slot.getSlotElementId() === "gpt-test-ad"
            );

            if (!slotExists) {
                window.googletag
                    .defineSlot(
                        "/6355419/Travel/Europe/France/Paris",
                        [300, 250],
                        "gpt-test-ad"
                    )
                    ?.addService(window.googletag.pubads());

                window.googletag.enableServices();
            }

            window.googletag.display("gpt-test-ad");
        });

        return () => {
            window.googletag?.cmd.push(() => {
                const slots = window.googletag
                    .pubads()
                    .getSlots()
                    .filter(
                        (slot) => slot.getSlotElementId() === "gpt-test-ad"
                    );

                if (slots.length) {
                    window.googletag.destroySlots(slots);
                }
            });
        };
    }, []);

    return (
        <div
            id="gpt-test-ad"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "300px",
                height: "250px",
                marginTop: "40px"
            }}
        />
    );
}