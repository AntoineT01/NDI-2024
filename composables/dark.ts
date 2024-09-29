// dark.ts
import { useDark, useToggle } from "@vueuse/core";

export function useDarkMode() {
    const isDark = useDark();
    const toggleDark = isDark ? () => {} : useToggle(isDark);

    return {
        isDark,
        toggleDark,
    };
}
