import React from 'react'
import { Form } from 'react-bootstrap';

import './SearchCriteria.css'

function SearchCriteria(props) {
    const { toggleCriteria, brands, manufacturers, styles, sizes } = props;


    const handleCheckbox = (field, value) => e => {
        if (field === "buyerpickup") {
            toggleCriteria(field, e.target.checked ? "True" : "False", e.target.checked ? true : false);
        }
        else {
            toggleCriteria(field, value, e.target.checked ? true : false);
        }
    };

    const renderCheckBox = (fieldName, valueSet) => {
        const values = [...valueSet];
        return values.sort().map((fieldValue) => {
            return (
                <Form.Check className="search_criteria_checkbox" type='checkbox' onChange={handleCheckbox(fieldName, fieldValue)} label={fieldValue} />
            )
        });
    }

    return (
        <div className="search_criteria">
            <Form>
                <Form.Group className="search_criteria_category">
                    <Form.Label className="search_criteria_label">Buyer Pickup</Form.Label>
                    <Form.Check className="search_criteria_checkbox" type='checkbox' onChange={handleCheckbox('buyerpickup', true)} label="I Can Pickup" />
                </Form.Group>
                {brands.size !== 0 &&
                    <Form.Group className="search_criteria_category">
                        <Form.Label className="search_criteria_label">Brands</Form.Label>
                        {renderCheckBox("brand", brands)}
                    </Form.Group>
                }
                {manufacturers.size !== 0 &&
                    <Form.Group className="search_criteria_category">
                        <Form.Label className="search_criteria_label">Manufacturers</Form.Label>
                        {renderCheckBox("manufacturer", manufacturers)}
                    </Form.Group>
                }
                {styles.size !== 0 &&
                    <Form.Group className="search_criteria_category">
                        <Form.Label className="search_criteria_label">Styles</Form.Label>
                        {renderCheckBox("style", styles)}
                    </Form.Group>
                }
                {sizes.size !== 0 &&
                    <Form.Group className="search_criteria_category">
                        <Form.Label className="search_criteria_label">Sizes</Form.Label>
                        {renderCheckBox("size", sizes)}
                    </Form.Group>
                }
            </Form>
        </div>

    );
}

export default SearchCriteria;
