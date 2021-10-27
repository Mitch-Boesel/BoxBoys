import React, { useState, useEffect } from 'react';
import './SearchPage.css';
import HeaderBar from "../../Components/HeaderBar";
import { NavigationBar } from "../../Components/NavigationBar";
import SearchCriteria from "../../Components/SearchCriteria";
import { BACKENDROUTES } from '../../Config/config.json';
import { Button } from 'react-bootstrap';
import ProductCard from '../../Components/ProductCard';


function SearchPage(props) {

    const [data, setState] = useState({
        products: {},
        hasLoaded: false,
        category: props.category
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
        if (response.status === 400) {
            window.alert(responseData);
        }
        else if (response.status === 200) {
            setState({ ...data, products: JSON.parse(responseData), hasLoaded: true })
        }
    }

    const renderProducts = () => {
        if (!data.hasLoaded)
            return "empty"
        if (Object.keys(data.products.data).length === 0) {
            return <p>No {data.category} products yet :(</p>
        }
        return Object.keys(data.products.data).map((key) => {
            var obj = data.products.data[key]
            return (
                <div className="seach_page_products_item">
                    <ProductCard title={obj["title"]}
                        brand={obj["brand"]}
                        manufacturer={obj["manufacturer"]}
                        size={obj["size"]}
                        style={obj["style"]}
                        condition={obj["condition"]}
                        buyerpickup={obj["buyerpickup"]}
                        price={obj["price"]}
                        quantity={obj["quantity"]}
                        unit={obj["unit"]}
                        location={obj["location"]} />
                </div>

            )
        });
    }
    return (
        <div>
            <HeaderBar />
            <NavigationBar />
            <div className="search_page">
                <SearchCriteria />
                <div className="search_page_products">
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
export default SearchPage