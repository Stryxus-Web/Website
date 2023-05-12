
const sm = 576;
const md = 768;
const lg = 992;
const xl = 1200;
const xxl = 1400;

export let isBreakpointUpSM: boolean = window.matchMedia(`(min-width: ${sm}px)`).matches;
export let isBreakpointUpMD: boolean = window.matchMedia(`(min-width: ${md}px)`).matches;
export let isBreakpointUpLG: boolean = window.matchMedia(`(min-width: ${lg}px)`).matches;
export let isBreakpointUpXL: boolean = window.matchMedia(`(min-width: ${xl}px)`).matches;
export let isBreakpointUpXXL: boolean = window.matchMedia(`(min-width: ${xxl}px)`).matches;

export let isBreakpointDownSM: boolean = window.matchMedia(`(max-width: ${sm - 0.02}px)`).matches;
export let isBreakpointDownMD: boolean = window.matchMedia(`(max-width: ${md - 0.02}px)`).matches;
export let isBreakpointDownLG: boolean = window.matchMedia(`(max-width: ${lg - 0.02}px)`).matches;
export let isBreakpointDownXL: boolean = window.matchMedia(`(max-width: ${xl - 0.02}px)`).matches;
export let isBreakpointDownXXL: boolean = window.matchMedia(`(max-width: ${xxl - 0.02}px)`).matches;

export let isBreakpointOnlySM: boolean = window.matchMedia(`(min-width: ${sm}px) and (max-width: ${sm - 0.02})`).matches;
export let isBreakpointOnlyMD: boolean = window.matchMedia(`(min-width: ${md}px) and (max-width: ${md - 0.02})`).matches;
export let isBreakpointOnlyLG: boolean = window.matchMedia(`(min-width: ${lg}px) and (max-width: ${lg - 0.02})`).matches;
export let isBreakpointOnlyXL: boolean = window.matchMedia(`(min-width: ${xl}px) and (max-width: ${xl - 0.02})`).matches;
export let isBreakpointOnlyXXL: boolean = window.matchMedia(`(min-width: ${xxl}px) and (max-width: ${xxl - 0.02})`).matches;

const listening: Array<() => void> = [];

export function addWindowSizeListener(func: () => void) {
    listening.push(func);
}

window.addEventListener("resize", () => {

    let update = false;

    update = isBreakpointUpSM !== (isBreakpointUpSM = window.matchMedia(`(min-width: ${sm}px)`).matches);
    if (!update) update = isBreakpointUpMD !== (isBreakpointUpMD = window.matchMedia(`(min-width: ${md}px)`).matches);
    if (!update) update = isBreakpointUpLG !== (isBreakpointUpLG = window.matchMedia(`(min-width: ${lg}px)`).matches);
    if (!update) update = isBreakpointUpXL !== (isBreakpointUpXL = window.matchMedia(`(min-width: ${xl}px)`).matches);
    if (!update) update = isBreakpointUpXXL !== (isBreakpointUpXXL = window.matchMedia(`(min-width: ${xxl}px)`).matches);

    if (!update) update = isBreakpointDownSM !== (isBreakpointDownSM = window.matchMedia(`(max-width: ${sm - 0.02}px)`).matches);
    if (!update) update = isBreakpointDownMD !== (isBreakpointDownMD = window.matchMedia(`(max-width: ${md - 0.02}px)`).matches);
    if (!update) update = isBreakpointDownLG !== (isBreakpointDownLG = window.matchMedia(`(max-width: ${lg - 0.02}px)`).matches);
    if (!update) update = isBreakpointDownXL !== (isBreakpointDownXL = window.matchMedia(`(max-width: ${xl - 0.02}px)`).matches);
    if (!update) update = isBreakpointDownXXL !== (isBreakpointDownXXL = window.matchMedia(`(max-width: ${xxl - 0.02}px)`).matches);

    if (!update) update = isBreakpointOnlySM !== (isBreakpointOnlySM = window.matchMedia(`(min-width: ${sm}px) and (max-width: ${sm - 0.02})`).matches);
    if (!update) update = isBreakpointOnlyMD !== (isBreakpointOnlyMD = window.matchMedia(`(min-width: ${md}px) and (max-width: ${md - 0.02})`).matches);
    if (!update) update = isBreakpointOnlyLG !== (isBreakpointOnlyLG = window.matchMedia(`(min-width: ${lg}px) and (max-width: ${lg - 0.02})`).matches);
    if (!update) update = isBreakpointOnlyXL !== (isBreakpointOnlyXL = window.matchMedia(`(min-width: ${xl}px) and (max-width: ${xl - 0.02})`).matches);
    if (!update) update = isBreakpointOnlyXXL !== (isBreakpointOnlyXXL = window.matchMedia(`(min-width: ${xxl}px) and (max-width: ${xxl - 0.02})`).matches);

    if (update) {
        listening.forEach(el => {
            el.call(this);
        });
    }
});
