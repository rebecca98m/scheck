const Spinner = ({show}) => {
    return (
        <div id="load-screen" className= { show ? "load-screen" : "load-screen hidden"} >
            <span className="load-screen-img" />
        </div>
    )
};

export default Spinner;