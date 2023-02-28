import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HomeIcon = (props) =>
  props.active ? (
    <Svg
      width={18}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.2 16v-5.647h3.6V16h4.5V8.47H18L9 0 0 8.47h2.7V16h4.5Z"
        fill="#84FFFF"
      />
    </Svg>
  ) : (
    <Svg
    width={17}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M8.5 0 0 7.857h2.318V15h5.41v-4.762h1.545V15h5.409V7.857H17L8.5 0Zm0 2.136 4.636 4.286V13.413h-2.318V8.65H6.182v4.762H3.864V6.422L8.5 2.136Z"
      fill={props.color}
    />
  </Svg>
  );

export default HomeIcon;
