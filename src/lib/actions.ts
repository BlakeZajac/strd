export type Action = {
  label: string;
  url: string;
  target?: string | "_self";
};

export const DEFAULT_PRIMARY_ACTION: Action = {
  label: "Start a project",
  url: "/contact/",
};

export const DEFAULT_SECONDARY_ACTION: Action = {
  label: "View work",
  url: "/work/",
};
