import React, { useState, useEffect } from 'react';
import './SearchPage.css';
import HeaderBar from "../../Components/HeaderBar";
import { NavigationBar } from "../../Components/NavigationBar";
import SearchCriteria from "../../Components/SearchCriteria";
import { BACKENDROUTES } from '../../Config/config.json';
import { Form } from 'react-bootstrap';
import ProductCard from '../../Components/ProductCard';
import { DynamicFeed } from '@material-ui/icons';
import { Select } from '@material-ui/core';


function SearchPage(props) {

    const [data, setState] = useState({
        products: [],
        renderedProducts: [],
        hasLoaded: false,
        category: props.category,
        filtered: false,
        filterCritera: {},
        sorted: false,
        sortedOn: "",
        brands: new Set(),
        manufacturers: new Set(),
        styles: new Set(),
        sizes: new Set()
    })

    useEffect(() => {
        (async () => {
            getProducts();
        })()
    }, []);

    const getProducts = async () => {
        const getUrl = BACKENDROUTES.BASEURL_SEARCHSERVICE + BACKENDROUTES.GET_PRODUCTS + `?category=${data.category}`;
        const response = await fetch(getUrl);

        const responseData = await response.text();
        if (response.status === 400) {
            window.alert(responseData);
        }
        else if (response.status === 200) {
            let respProducts, respBrands, respManufacturers, respStyles, respSizes;
            [respProducts, respBrands, respManufacturers, respStyles, respSizes] = getStateData(JSON.parse(responseData).data);
            setState({
                ...data,
                products: respProducts,
                renderedProducts: respProducts,
                brands: respBrands,
                manufacturers: respManufacturers,
                styles: respStyles,
                sizes: respSizes,
                hasLoaded: true
            })
        }
    }

    const getStateData = productDict => {
        var lstProducts = [];
        var sBrands = new Set();
        var sManufacturers = new Set();
        var sStyles = new Set();
        var sSizes = new Set();
        const products = Object.values(productDict);
        for (var i = 0; i < products.length; i++) {
            lstProducts.push(products[i]);
            sBrands.add(capitolizeFirstChar(products[i].brand));
            sManufacturers.add(capitolizeFirstChar(products[i].manufacturer));
            sStyles.add(capitolizeFirstChar(products[i].style));
            sSizes.add(capitolizeFirstChar(products[i].size));
        }
        return [lstProducts, sBrands, sManufacturers, sStyles, sSizes];
    }

    const capitolizeFirstChar = str => {
        const str1 = str.toLowerCase()
        return str1.charAt(0).toUpperCase() + str1.slice(1)
    }

    const filterProductsFromEvent = (field, value, onOff) => {
        debugger;
        var dctCriteria = data.filterCritera;
        if (onOff === false) {
            if (dctCriteria[field].size === 1)
                delete dctCriteria[field]
            else
                delete dctCriteria[field].delete(value)
        }
        else {
            if (field in dctCriteria)
                dctCriteria[field].add(capitolizeFirstChar(value));
            else
                dctCriteria[field] = new Set([capitolizeFirstChar(value)]);
        }
        var filteredProducts = data.products;
        for (const [fieldName, valueSet] of Object.entries(dctCriteria)) {
            filteredProducts = filteredProducts.filter(prod => valueSet.has(capitolizeFirstChar(prod[fieldName])));
        }

        if (data.sorted) {
            sortProductsFromFilter(filteredProducts)
        }
        setState({
            ...data,
            renderedProducts: filteredProducts,
            filterCritera: dctCriteria,
            filtered: true
        })
    }

    const filterProductsFromSort = (sortedProducts) => {
        debugger;
        var lstCriteria = data.filterCritera;

        for (var i = 0; i < lstCriteria.length; i++) {
            const fieldName = lstCriteria[i][0];
            const fieldValue = lstCriteria[i][1];
            sortedProducts = sortedProducts.filter(prod => prod[fieldName] === fieldValue);
        }
        return;
    }

    const sortProductsFromEvent = (e) => {
        debugger;
        const sortValue = e.target.value;
        if (sortValue === "closest") return

        var sortedProducts = data.renderedProducts
        switch (sortValue) {
            case "blank":
                sortedProducts.sort((a, b) => parseInt(a.productID) - parseInt(b.productID));
                break;
            case "price":
                sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case "quantity":
                sortedProducts.sort((a, b) => parseFloat(b.quantity) - parseFloat(a.quantity));
                break;
            default:
                window.alert("Don't recognize sort type:(")
        }

        if (data.filtered) {
            filterProductsFromSort(sortedProducts);
        }
        setState({
            ...data,
            renderedProducts: sortedProducts,
            sorted: true,
            sortedOn: sortValue
        });
    }

    const sortProductsFromFilter = prods => {
        switch (data.sortedOn) {
            case "closest":
                return;
            case "blank":
                prods.sort((a, b) => parseInt(a.productID) - parseInt(b.productID));
                break;
            case "price":
                prods.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case "quantity":
                prods.sort((a, b) => parseFloat(b.quantity) - parseFloat(a.quantity));
                break;
            default:
                window.alert("Don't recognize sort type:(")
        }
        return;
    }

    const renderProducts = () => {
        if (!data.hasLoaded)
            return "empty"
        if (data.products.length === 0) {
            return <p>No {data.category} products yet :(</p>
        }

        return data.renderedProducts.map((product) => {
            return (
                <div className="seach_page_products_item">
                    <ProductCard title={product["title"]}
                        brand={product["brand"]}
                        manufacturer={product["manufacturer"]}
                        size={product["size"]}
                        style={product["style"]}
                        condition={product["condition"]}
                        buyerpickup={product["buyerpickup"]}
                        price={product["price"]}
                        quantity={product["quantity"]}
                        unit={product["unit"]}
                        location={product["location"]} />
                </div>

            )
        });
    }

    return (
        <div>
            <HeaderBar />
            <NavigationBar />
            <div className="search_page">
                <div className="search_page_filter">
                    <div className="search_page_title">
                        {data.category} - {data.products.length} results
                    </div>
                    <SearchCriteria toggleCriteria={filterProductsFromEvent}
                        brands={data.brands}
                        manufacturers={data.manufacturers}
                        styles={data.styles}
                        sizes={data.sizes} />
                </div>
                <div className="search_page_main">

                    <div className="search_page_sort">
                        <select onChange={sortProductsFromEvent}>
                            <option selected disabled>Sort Results</option>
                            <option value="blank"> </option>
                            <option value='price'>Lowest Price</option>
                            <option value="closest">Closest</option>
                            <option value="quantity">Highest Quantity</option>
                        </select>
                    </div>
                    <div className="search_page_products">
                        {data.hasLoaded &&
                            <div>
                                {renderProducts()}
                            </div>
                        }
                    </div>
                </div>

            </div>
        </div>

    );

}
export default SearchPage