import { EmailCategory } from "@/constants/categories";
import { CATEGORY_COLORS_BY_SCHEME, TINT_ALPHA } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export const useThemeColors = function () {
  const { scheme, colors } = useTheme();

  const categoryColor = function (category: EmailCategory) {
    return CATEGORY_COLORS_BY_SCHEME[scheme][category];
  };

  const categoryTint = function (category: EmailCategory) {
    const color = categoryColor(category);
    return {
      color,
      surface: `${color}${TINT_ALPHA[scheme].surface}`,
      holder: `${color}${TINT_ALPHA[scheme].holder}`,
    };
  };

  return { ...colors, scheme, isDark: scheme === "dark", categoryColor, categoryTint };
};
