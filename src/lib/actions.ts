export type Action = {
  label: string;
  url: string;
  target?: string | "_self";
};

export const BOOKING_EMAIL = "contact@blakezajac.com";

const bookingMailto = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent("Shoot enquiry")}`;

export const DEFAULT_PRIMARY_ACTION: Action = {
  label: "Book a shoot",
  url: bookingMailto,
  target: "_self",
};

export const DEFAULT_SECONDARY_ACTION: Action = {
  label: "@zajacphoto",
  url: "https://instagram.com/zajacphoto",
  target: "_blank",
};
