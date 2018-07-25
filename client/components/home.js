// featured Products

// link to products



import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './searchBar'
import Carousel from 'react-image-carousel';
// import { connect } from 'react-redux'


const MainHome = () => {

    const images = [
        "https://cdn.shopify.com/s/files/1/0885/3178/t/9/assets/1626x600_tradition_gemstones.jpg?13357309008435823644",
        "https://www.energymuse.com/blog/wp-content/uploads/2015/09/purplegemstones-1050x700.jpg",
        "http://lifematspro.com/wp-content/uploads/2016/04/Amethyst-Crystal-Healing_image1.jpg",
        "https://cdn7.bigcommerce.com/s-91397/images/stencil/original/products/1422/3021/Fluorite_gemstones_white_magick_alchemy_1__68418.1362590063.jpg?c=2&imbypass=on",
        "https://www.sagegoddess.com/wp-content/uploads/2017/03/Broken-Gemstones-Sage-Goddess-Blog-FB-Share-1024x538.jpg.optimal.jpg"
    ];

    const featured = [
        {
            title: 'Polished Fire Garnet', price: 6.95, photo: 'https://img.etsystatic.com/il/ad6e2b/1455198496/il_570xN.1455198496_sp58.jpg?version=1'
        },
        {
            title: 'Amethyst Cluster', price: 5.55, photo: 'https://img.etsystatic.com/il/5fa555/1374425596/il_570xN.1374425596_9alc.jpg?version=1'
        },
        {
            title: 'Raw Aquamarine', price: 14.50, photo: 'https://i.etsystatic.com/iap/46ee8b/1604051835/iap_300x300.1604051835_jvyrugke.jpg?version=0'
        },
        {
            title: 'Uncut Raw Diamond', price: 270.75, photo: 'https://www.thediamondloupe.com/sites/awdcnewswall/files/Screen%20Shot%202016-09-09%20at%2013.07.44.png'
        },
        {
            title: 'Raw Emerald Crystal', price: 18.75, photo: 'https://img.etsystatic.com/il/c5d275/1372882974/il_570xN.1372882974_88v6.jpg?version=0'
        },
        {
            title: 'Raw Ruby Crystal', price: 15.72, photo: 'http://cdn.shopify.com/s/files/1/0825/7459/files/ruby_raw_large.jpg?11116142272450580674'
        }
    ]
    return (
        <div className="main-home">

            <div className="my-carousel">
                <Carousel images={images}
                    // thumb={true}
                    loop={true}
                    autoplay={4000} />
            </div>


            <div id="featured-products-container">
                <h2>Featured Products</h2>
                <div className="products">
                    {
                        featured.map(product => {
                            return (
                                <div className="product" key={product.title}>
                                    <div className="product-image">
                                        <img src={product.photo} />
                                    </div>
                                    <div className="product-info">
                                        <a>{product.title}</a> <br />
                                        <a>Price: ${product.price}</a>
                                    </div>
                                    <div className='product-buttons'>
                                        <button>Add to Cart</button>
                                        <button>More Info</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default MainHome