import gsap from "gsap";

const cardConfig = {
    global: {
        backgroundSelector: ".js-video-image-background",
        dataAttribute: "content-id",
    },
    project: {
        className: "project-card",
        cardSelector: ".js-project-card",
        apiPath: "/api/work",
    }
}