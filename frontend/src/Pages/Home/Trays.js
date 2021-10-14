import React, { useState, useEffect } from 'react';
import './Trays.css';
import HeaderBar from "../../Components/HeaderBar";
import { NavigationBar } from "../../Components/NavigationBar";
import SearchCriteria from "../../Components/SearchCriteria";
import { PAGEROUTES, BACKENDROUTES } from '../../Config/config.json';
import { Button } from 'react-bootstrap';
import ProductCard from '../../Components/ProductCard';


function Trays() {

    const [data, setState] = useState({
        products: {},
        hasLoaded: false,
        category: "Trays"
    })

    /*
        useEffect(() => {
            loadDataOnlyOnce();
          }, []);
    */
    useEffect(() => {
        (async () => {
            getProducts();
        })()
    }, []);

    const getProducts = async () => {
        debugger;
        const getUrl = BACKENDROUTES.BASEURL_SEARCHSERVICE + BACKENDROUTES.GET_PRODUCTS + `?category=${data.category}`;
        const response = await fetch(getUrl);

        const responseData = await response.text();
        debugger;
        if (response.status == 400) {
            window.alert(responseData);
        }
        else if (response.status == 200) {
            setState({ ...data, products: JSON.parse(responseData), hasLoaded: true })
        }
    }

    const renderProducts = () => {
        debugger;
        if (!data.hasLoaded)
            return "empty"
        return Object.keys(data.products.data).map((key) => {
            var obj = data.products.data[key]
            return (
                <div className="trays_page_products_item">
                    <ProductCard title={obj["title"]}
                        brand={obj["brand"]}
                        manufacturer={obj["manufacturer"]}
                        size={obj["size"]}
                        style={obj["style"]}
                        condition={obj["condition"]}
                        buyerPickup={obj["buyerpickup"]}
                        price={obj["price"]}
                        quantity={obj["quantity"]}
                        unit={obj["unit"]} />
                </div>

            )
        });
    }
    return (
        <div>
            <HeaderBar />
            <NavigationBar />
            <div className="trays_page">
                <div className="trays_search_criteria">
                    <SearchCriteria />
                </div>
                <div className="trays_page_products">
                    {data.hasLoaded &&
                        <div>
                            {renderProducts()}
                        </div>
                    }
                </div>
            </div>
        </div>

    );

}

/*        <React.Fragment>
            <HeaderBar></HeaderBar>
            <NavigationBar></NavigationBar>

            <h1>Soon to have Trays!</h1>
        </React.Fragment> */
export default Trays