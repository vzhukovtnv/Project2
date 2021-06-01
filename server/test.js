const Stocks= () =>{
	const {id}= useParams();

  useEffect(() => {
        const getDataFirstTime = async () => {
            alert("Useeffect");
        };
        getDataFirstTime();
    }, [id])

return (
<AddWatch   createWatch={createWatch} />
div>
                                {lastData &&
                                    lastData.map((stock) => {
                                        return (
                                            <Watch
                                                stock={stock}
                                                buySellAction={buySellAction}
                                                closeAction={closeAction}

                                            />
                                        )
                                    })}

                            </div>


