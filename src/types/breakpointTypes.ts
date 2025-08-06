export enum BreakpointName {
  MOBILE = "MOBILE",
  TABLET = "TABLET",
  DESKTOP = "DESKTOP",
  FULLHD = "FULLHD",
}

export enum BreakpointWidth {
  MOBILE = 375,
  TABLET = 768,
  DESKTOP = 1200,
  FULLHD = 1920,
}

export const BreakpointWidthToName: Record<BreakpointWidth, BreakpointName> = {
  [BreakpointWidth.MOBILE]: BreakpointName.MOBILE,
  [BreakpointWidth.TABLET]: BreakpointName.TABLET,
  [BreakpointWidth.DESKTOP]: BreakpointName.DESKTOP,
  [BreakpointWidth.FULLHD]: BreakpointName.FULLHD,
}
