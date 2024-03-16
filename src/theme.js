import { extendTheme, defineStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: (StyleFunctionProps) => ({
    "html, body": {
      color: mode("gray.800", "whiteAlpha.900")(StyleFunctionProps),
      bgColor: mode("#F1F3F5", "##aaabb5")(StyleFunctionProps),
      lineHeight: "base",
    },
  }),
};

const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: "base",
  },

  variants: {
    solid: (StyleFunctionProps) => ({
      bg: mode("black", "teal.600")(StyleFunctionProps),
      _hover: {
        bg: mode("teal.600", "teal.300")(StyleFunctionProps),
      },
      color: "white",
    }),
  },
  defaultProps: {
    size: "md",
    variant: "outline",
  },
});

const theme = extendTheme({ config, styles, components: { Button } });
export default theme;
