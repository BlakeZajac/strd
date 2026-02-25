import gsap from "gsap";

const cardSelector = ".js-project-card";
const backgroundSelector = ".js-video-image-background";
const apiPath = "/api/work";

/**
 * Reads layout values from CSS custom properties.
 *
 * @returns {{ inset: number, siteHeaderHeight: number }}
 */
function getCssValues() {
  const root = getComputedStyle(document.documentElement);

  return {
    inset: parseFloat(root.getPropertyValue("--inset").trim()) * 16,
    siteHeaderHeight:
      parseFloat(root.getPropertyValue("--site-header-height").trim()) * 16,
  };
}

/**
 * Fades out all project cards.
 *
 * @returns {gsap.core.Tween} GSAP animation instance.
 */
function fadeOutCards() {
  const cards = document.querySelectorAll(cardSelector);

  return gsap.to(cards, {
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });
}

/**
 * Syncs a video element to a target time and plays it.
 *
 * @param {HTMLVideoElement} video - The video element.
 * @param {number} currentTime - The time in seconds to seek to.
 */
function syncAndPlayVideo(video, currentTime) {
  if (!video) return;
  video.currentTime = currentTime;
  video.play().catch(() => {});
}

/**
 * Gets the current time of the first video in a container.
 *
 * @param {HTMLElement | null} container - The container element.
 * @returns {number} The video's current time in seconds, or 0 if no video.
 */
function getVideoCurrentTime(container) {
  const video = container?.querySelector("video");
  return video ? video.currentTime : 0;
}

/**
 * Creates a fixed-position clone of the card background at its current screen position.
 * Syncs the clone's video to the original's current time so playback continues seamlessly.
 *
 * @param {HTMLElement} card - The card element.
 * @returns {HTMLElement | null} The clone wrapper element, or null if no background found.
 */
function cloneCard(card) {
  const background = card.querySelector(backgroundSelector);
  if (!background) return null;

  const sourceTime = getVideoCurrentTime(background);
  const clone = background.cloneNode(true);
  const rect = background.getBoundingClientRect();

  const wrapper = document.createElement("div");
  wrapper.className = "project-card is-transitioning";
  wrapper.style.cssText = `
    --width: ${rect.width}px;
    --height: ${rect.height}px;
    --top: ${rect.top}px;
    --left: ${rect.left}px;
  `;

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  const cloneVideo = wrapper.querySelector("video");
  if (cloneVideo) syncAndPlayVideo(cloneVideo, sourceTime);

  return wrapper;
}

/**
 * Animates the cloned card to centre, then expands to full screen.
 *
 * @param {HTMLElement} clone - The cloned card element.
 * @returns {gsap.core.Timeline} GSAP timeline instance.
 */
function animateClone(clone) {
  const { inset, siteHeaderHeight } = getCssValues();

  const rect = clone.getBoundingClientRect();

  const targetWidth = Math.min(window.innerWidth - 2 * inset, 1920);
  const targetHeight = window.innerHeight;

  const targetTop = siteHeaderHeight + inset;
  const targetLeft = (window.innerWidth - targetWidth) / 2;

  const centerX = targetLeft + targetWidth / 2;
  const centerY = targetTop + targetHeight / 2;

  const translateX = centerX - (rect.left + rect.width / 2);
  const translateY = centerY - (rect.top + rect.height / 2);

  const tl = gsap.timeline();

  tl.to(clone, {
    x: translateX,
    y: translateY,
    duration: 1.2,
    ease: "power4.inOut",
  });

  tl.to(
    clone,
    {
      "--width": `${targetWidth}px`,
      "--height": `${targetHeight}px`,
      "--top": `${targetTop}px`,
      "--left": `${targetLeft}px`,
      x: 0,
      y: 0,
      duration: 1.2,
      ease: "power4.inOut",
    },
    "-=0.3",
  );

  return tl;
}

/**
 * Fetches work content via the API.
 *
 * @param {string} slug - The work entry slug.
 * @returns {Promise<{ title: string, content: string, meta?: { description: string } }>} Content data.
 * @throws {Error} When the fetch fails or response is invalid.
 */
async function fetchContent(slug) {
  const res = await fetch(`${apiPath}/${slug}.json`);
  if (!res.ok) throw new Error("Failed to fetch content");

  const data = await res.json();
  if (!data.content) throw new Error("Invalid content response");

  return data;
}

/**
 * Replaces page content with AJAX-loaded content.
 * Syncs the new page's video to the given time for seamless playback.
 *
 * @param {{ title: string, content: string, meta?: { description: string } }} data - The content data.
 * @param {string} url - The URL to update in browser history.
 * @param {number} [videoCurrentTime=0] - The time in seconds to seek the new video to (for seamless sync).
 */
function replaceContent(data, url, videoCurrentTime = 0) {
  document.title = data.title;

  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", data.meta.description);

  const main = document.querySelector("main");
  main.innerHTML = data.content;

  const mainVideo = main.querySelector("video");
  if (mainVideo) syncAndPlayVideo(mainVideo, videoCurrentTime);

  history.pushState({ url }, data.title, url);
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

let isTransitioning = false;

/**
 * Handles the complete card click transition sequence.
 *
 * @param {HTMLAnchorElement} card - The clicked card element.
 */
async function handleCardTransition(card) {
  if (isTransitioning) return;
  isTransitioning = true;

  const url = card.href;
  const slug = card.getAttribute("data-content-slug");

  try {
    fadeOutCards();

    const clone = cloneCard(card);
    if (!clone) {
      window.location.href = url;
      return;
    }

    const data = await fetchContent(slug);
    await animateClone(clone);

    const videoCurrentTime = getVideoCurrentTime(clone);
    replaceContent(data, url, videoCurrentTime);

    const lenis = window.lenis;
    if (lenis) lenis.stop();

    await gsap.to(clone, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        clone.remove();
        if (lenis) lenis.start();
      },
    });
  } catch (error) {
    console.error("Failed to transition card:", error);
    window.location.href = url;
  } finally {
    isTransitioning = false;
  }
}

function init() {
  document.addEventListener("click", (e) => {
    const card = e.target.closest(cardSelector);
    if (!card || e.button === 1) return;

    e.preventDefault();
    handleCardTransition(card);
  });

  window.addEventListener("popstate", () => window.location.reload());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
