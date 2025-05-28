import './analyze-switch.css';

interface AnalyzeRadioSwitch {
    setChecked: React.Dispatch<React.SetStateAction<string>>;
    role:string
}
export default function AnalyzeRadioSwitch({ setChecked, role }:AnalyzeRadioSwitch ){
 
  

return <div className="analyze-radio-input">
    <label className="analyze-label">
        <div className="analyze-back-side"></div>
        <input type="radio" id="value-1" onClick={()=>setChecked('user')} name="value-radio" defaultChecked value="user" />
        <span className="analyze-text ">Your</span>
        <span className="analyze-bottom-line"></span>
    </label>
    { role === 'user' && 
        <label className="analyze-label">
            <div className="analyze-back-side"></div>
            <input type="radio" id="value-2" onClick={()=>setChecked('command')} name="value-radio" value="command" />
            <span className="analyze-text">Command</span>
            <span className="analyze-bottom-line"></span>
        </label>

    }
    
    <label className="analyze-label">
        <div className="analyze-back-side"></div>
        <input type="radio" id="value-3" onClick={()=>setChecked('total')}  name="value-radio" value="total" />
        <span className="analyze-text">Total</span>
        <span className="analyze-bottom-line"></span>
    </label>
</div>

}