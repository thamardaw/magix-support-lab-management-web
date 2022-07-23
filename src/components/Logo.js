import { constants } from "../utils/constants";

const Logo = ({ width, height }) => {
  return (
    <img
      src={constants.hospital_logo}
      alt={constants.name}
      width={width}
      height={height}
    />
  );
};

export default Logo;
