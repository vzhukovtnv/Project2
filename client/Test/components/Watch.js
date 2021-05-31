const Watch = ({wData}) => {
    

    const onChangeDirection = async () => {
        const url = '/stocks/' + wData.id;
        try {
            let response = await fetch(url, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({tt:3})
            });
            if (response.ok) {
  //              alert(" OK");
    
            } else {
                alert(await response.text()+'9');
            }

        } catch (error) {
            alert(error.message+" 10");
        }

    };

// console.log('wData=',wData);
    
    return (
        <div>
        <h3>Watch {wData.id}</h3>
        <div className="watch-element">
           <h4>==>{wData.data.dataArray[1]}</h4>
        </div>
        <button className="submit-btn" onClick={onChangeDirection} >Change direction</button>
        </div>

      );
}
 
export default Watch;