/**
 * Shared look for the navbar's controls (theme, menu, search) so they
 * stay identical in height, shape, border and icon colour.
 *
 * 40px on touch screens for comfortable tapping, 36px from `lg` up where the
 * desktop nav links are compact.
 */
export const navControlHeight = "h-10 lg:h-9";

export const navIconButton = `inline-flex items-center justify-center w-10 lg:w-9 ${navControlHeight} shrink-0 rounded-lg border border-border/70 bg-card/60 backdrop-blur-md text-primary hover:bg-primary/10 hover:border-primary/40 transition-colors duration-200 cursor-pointer`;

export const navIcon = "h-[18px] w-[18px] lg:h-4 lg:w-4";
