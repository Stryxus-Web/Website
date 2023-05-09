import { Blazor } from "./globals";

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("start-button")?.addEventListener("click", () => 
    {
        Blazor.start();
    });
});

export function testForAV1() {
    const testVid: HTMLVideoElement = document.createElement("video");
    testVid.canPlayType("video/mp4; codecs=\"av01, aac\"");
    testVid.remove();
}

export function testForVP9() {
    const testVid: HTMLVideoElement = document.createElement("video");
    testVid.canPlayType("video/mp4; codecs=\"vp9, aac\"");
    testVid.remove();
}