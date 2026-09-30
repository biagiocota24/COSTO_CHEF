import { Link } from "react-router-dom";

interface LinkProps {
  innerText: string;
  to: string;
  variant: "primary" | "secondary";
}

const variants = {
  primary: "text-brand-500 hover:text-brand-700",
  secondary: "text-secondary-500 hover:text-secondary-800",
};

const CustomLink = function (props: LinkProps) {
  return (
    <Link className={`underline ${variants[props.variant]}`} to={props.to}>
      {props.innerText}
    </Link>
  );
};

export default CustomLink;
