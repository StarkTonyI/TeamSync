import './deleteMessageStyle.css'
interface OnClick {
    onClick:()=>void
}
export default function DeleteMessageTrashIcon({ onClick }:OnClick ){
    return <button aria-label="Delete item" className="delete-button" 
    //onClick={(e) => onClick(e.currentTarget.dataset.value)} 
    onClick={onClick}
    data-value="delete">
 <svg
    className="trash-svg"
    viewBox="0 -10 64 74"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="trash-can">
      <rect
        x="9"
        y="13.5"
        width="20"
        height="17"
        rx="3"
        ry="3"
        fill="#e74c3c"
      ></rect>

      <g transform-origin="12 18" id="lid-group">
        <rect
          x="6.75"
          y="6.75"
          width="22.5"
          height="3.25"
          rx="2"
          ry="2"
          fill="#c0392b"
        ></rect>
        <rect
          x="15"
          y="4.5"
          width="6.75"
          height="2"
          rx="2"
          ry="2"
          fill="#c0392b"
        ></rect>
      </g>
    </g>
  </svg>
  </button>
  
}