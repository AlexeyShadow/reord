import icon from "./assets/move.png";

const iconStyle = {
  width: "24px",
  heigth: "24px",
};

export default function Icon(props: any) {
  return (
    <span {...props}>
      <img src={icon} style={iconStyle} />
    </span>
  );
}
