import './checkBoxStyle.css';

export default function CheckBox(){

    return <div className="z-99 absolute -mt-[90px]  ml-[20px] justify-center items-center h-screen">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="230px"
    height="230px"
    viewBox="0 0 100 100"
    className="checkmark"
  >
    <path
      className="checkmark-path"
      fill="none"
      stroke="white"
      strokeWidth="5"
      d="M20,50 L40,70 L80,30"
    /> 
  </svg>
</div>
}