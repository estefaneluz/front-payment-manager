import './styles.css';

function Dropdown({options}) {
    return (
        <div className="dropdown-container">
            {options.map(op => <p>{op}</p>)}
        </div>
    );
}

export default Dropdown;