import useFetch from "../utils/useFetch";

const TitleBar = () => {
    const { data, error, isPending } = useFetch("/company");

    return (
        <div className="title-bar">
            {  isPending && <h1>Stock Simulator</h1>}
            { !isPending && data && <h1>{"Stock Simulator - "+ data.name}</h1>}
            { error && <div>{error}</div>}
        

        </div>
    );
}






export default TitleBar;