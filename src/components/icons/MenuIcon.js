import React from "react";
import { Svg, Path } from "react-native-svg";

export default function MenuIcon({ size = 24, color = "#333" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill={color} />
    </Svg>
  );
}
