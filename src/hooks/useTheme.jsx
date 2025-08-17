// src/hooks/useTheme.js
import { useContext } from "react";
import ThemeContext from "../providers/ThemContext";

const useTheme = () => useContext(ThemeContext);

export default useTheme;
