export type Action = {
  label: string;
  url: string;
  target?: string | "_self";
};

export const DEFAULT_PRIMARY_ACTION: Action = {
  label: "Get in touch",
  url: "mailto:contact@blakezajac.com",
  target: "_self",
};

export const DEFAULT_SECONDARY_ACTION: Action = {
  label: "@zajacphoto",
  url: "https://instagram.com/zajacphoto",
  target: "_blank",
};
