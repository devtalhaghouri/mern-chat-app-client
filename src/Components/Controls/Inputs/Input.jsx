import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { useToggle } from "../../../hook/hook";

const Input = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  id,
  error,
  leftIcon,
  rightIcon,
  className="",
  ...rest
}) => {
  const [toggle, handleToggle] = useToggle(false);
  return (
    <>
      <div className="input_wrapper w-full h-full flex flex-col gap-[5px]">
        {label && (
          <label className="text-[15px] text-[black] font-Work ">{label}</label>
        )}

        <div className="input_box ">
          <div
            className={`input relative max-w-[100%] border border-solid rounded-[4px] ${
              error ? `border-[#d23f57] ` : `bottom-[#bdbcbcde]`
            } `}
          >
            {leftIcon && (
              <span className="left_icon absolute h-[100%] left-[7px] flex items-center text-[#2c2c2c]">
                {leftIcon}
              </span>
            )}

            <input
              type={type === "password" ? (toggle ? "text" : "password") : type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              id={id}
              name={id}
              {...rest}
              className={`${className}  w-[100%] h-[100%] py-[10px] outline-none rounded-[4px] text-[16px]   text-[#2c2c2c] placeholder:text-[16px] placeholder:font-Work placeholder:font-light placeholder:transition-all 
              `}
              style={{
                paddingLeft: leftIcon ? "38px" : "15px",
                paddingRight: rightIcon ? "38px" : "15px",
              }}


            />

            {value && type === "password" && (
              <span
                onClick={handleToggle}
                className={` absolute h-[100%] right-[7px] top-0 flex items-center text-[#2c2c2c]`}
              >
                {toggle ? (
                  <VisibilityIcon color="#2c2c2c" />
                ) : (
                  <VisibilityOffRoundedIcon color="#2c2c2c" />
                )}
              </span>
            )}

            {rightIcon && (
              <span className="right_icon absolute h-[100%] right-[7px] top-0 flex items-center text-[#2c2c2c]">
                {rightIcon}
              </span>
            )}
          </div>
        </div>

        {error && (
          <div className="input_error text-[#d23f57] text-start font-Work text-[13px]">
            {error}
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
