import { Link } from "react-scroll";

const ScrollLink = ({
  to,
  children,
  className = "",
  activeClass,
  containerId,
  ...props
}) => (
  <Link
    to={to}
    spy={true}
    containerId={containerId}
    smooth="easeInOutQuart"
    duration={1000}
    offset={0}
    className={className}
    activeClass={activeClass}
    horizontal={true}
    isDynamic={true}
    {...props}
  >
    {children}
  </Link>
);

export default ScrollLink;
