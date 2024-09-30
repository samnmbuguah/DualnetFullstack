import { useWindowDimensions } from "_components";
import styles from "./styles";

function ChartSideBar({ show, dark, width }) {
  const customStyles = dark ? styles.dark : styles.light;
  const { width: screenWidth } = useWindowDimensions();

  if (!show) return null;

  return (
    <div
      style={customStyles}
      className={`bg-[#fef6e6] md:w-[${width || screenWidth}px] h-full px-5 py-3 z-30 transition-transform text-xs dark:bg-[transparent] dark:border-[#6D6D6D] bg-zinc-800 rounded-[25px]`}
    >
      <div>Chart sidebar</div>
    </div>
  );
}

export { ChartSideBar };
