import React from 'react';
import './ProductCard.css';
import BlankPicture from '../Images/BlankPictureColor.JPG'

function ProductCard(props) {

    return (
        <div className="product_card">
            <img className="product_image" src={BlankPicture} alt={"Stock Img"}></img>
            <div className="product_info">
                <div className="product_card_title">
                    {props.title}
                </div>
                <div className="product_stats">
                    <div className="product_stats_row">
                        <div className="product_stats_row_item">
                            <div className="product_stats_row_item1">Brand</div>
                            <div className="product_stats_row_item2">{props.brand}</div>
                        </div>
                        <div className="product_stats_row_item">
                            <div className="product_stats_row_item1">Manufacturer</div>
                            <div className="product_stats_row_item2">{props.manufacturer}</div>
                        </div>
                        <div className="product_stats_row_item">
                            <div className="product_stats_row_item1">Size</div>
                            <div className="product_stats_row_item2">{props.size}</div>
                        </div>
                    </div>
                    <div className="product_stats_row">
                        <div className="product_stats_row_item">
                            <div className="product_stats_row_item1">Style</div>
                            <div className="product_stats_row_item2">{props.style}</div>
                        </div>
                        <div className="product_stats_row_item">
                            <div className="product_stats_row_item1">Condition</div>
                            <div className="product_stats_row_item2">{props.condition}</div>
                        </div>
                        <div className="product_stats_row_item">
                            <div className="product_stats_row_item1">Pickup</div>
                            <div className="product_stats_row_item2">{props.buyerpickup}</div>
                        </div>
                    </div>
                    <div className="product_stats_row">
                        <div className="product_stats_row_item">
                            <div className="product_stats_row_item1">PRICE:</div>
                            <div className="product_stats_row_item2">{props.price}</div>
                        </div>
                        <div className="product_stats_row_item">
                            <div className="product_stats_row_item1">Quantity: </div>
                            <div className="product_stats_row_item2">{props.quantity}</div>
                        </div>
                        <div className="product_stats_row_item">
                            <div className="product_stats_row_item1">Location:</div>
                            <div className="product_stats_row_item2">{props.location}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

    /* return (
         <div className="product_card">
             <img className="product_image" src={BlankPicture} alt={"Stock Img"}></img>
             <div className="product_info">
                 <div className="product_card_title">
                     {props.title}
                 </div>
                 <div className="product_stats">
                     <div className="product_stats_row">
                         <div className="product_stats_row_item">
                             <div className="product_stats_row_item1">Brand</div>
                             <div className="product_stats_row_item2">{props.brand}</div>
                         </div>
                         <div className="product_stats_row_item">
                             <div className="product_stats_row_item1">Manufacturer</div>
                             <div className="product_stats_row_item2">{props.manufacturer}</div>
                         </div>
                         <div className="product_stats_row_item">
                             <div className="product_stats_row_item1">Size</div>
                             <div className="product_stats_row_item2">{props.size}</div>
                         </div>
                     </div>
                     <div className="product_stats_row">
                         <div className="product_stats_row_item">
                             <div className="product_stats_row_item1">Style</div>
                             <div className="product_stats_row_item2">{props.style}</div>
                         </div>
                         <div className="product_stats_row_item">
                             <div className="product_stats_row_item1">Condition</div>
                             <div className="product_stats_row_item2">{props.condition}</div>
                         </div>
                         <div className="product_stats_row_item">
                             <div className="product_stats_row_item1">Pickup</div>
                             <div className="product_stats_row_item2">{props.buyerpickup}</div>
                         </div>
                     </div>
                     <div className="product_stats_row">
                         <div className="product_stats_row_item">
                             <div className="product_stats_row_item1">PRICE:</div>
                             <div className="product_stats_row_item2">{props.price}</div>
                         </div>
                         <div className="product_stats_row_item">
                             <div className="product_stats_row_item1">Quantity: </div>
                             <div className="product_stats_row_item2">{props.quantity}</div>
                         </div>
                         <div className="product_stats_row_item">
                             <div className="product_stats_row_item1">Location:</div>
                             <div className="product_stats_row_item2">{props.location}</div>
                         </div>
                     </div>
 
                 </div>
             </div>
         </div>
     )*/
}
export default ProductCard;
