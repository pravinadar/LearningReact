import { useEffect } from "react"
import { useState } from "react"

function useCurrencyInfo(currency) {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch(`https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`)
            .then((result) =>
                result.json()
            

            ).then((result) =>
                setData(result[currency])

            );

    }, [currency])
    console.log(data)

    return data;

}

export default useCurrencyInfo;