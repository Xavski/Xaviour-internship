import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../UI/CountdownTimer";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(8);

  function Countdown(expiryDate) {
    return <CountdownTimer expiryDate={expiryDate} />;
  }

  async function fetchExploreItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );

    setItems(data);
    setLoading(false);
  }
  
  function loadMore(){
    setShowMore(showMore + 4)

  }

  function filterBooks(value){
    if(value === "price_low_to_high"){
      setItems(items.slice().sort((a, b) => (a.price)-(b.price)))
    }

    if(value === "price_high_to_low"){
      setItems(items.slice().sort((a, b) => (b.price)-(a.price)))
    }

    if(value === "likes_high_to_low"){
      setItems(items.slice().sort((a, b) => (b.likes)-(a.likes)))
    }


  }

  useEffect(() => {
    fetchExploreItems();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => filterBooks(event.target.value)}>
          <option value="" disabled>Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(16).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton className="nft__item" height={400} />
            </div>
          ))
        : items.slice(0, showMore).map((item) => (
            <div
              key={item.nftId}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate ? (
                  <div className="de_countdown">
                    {Countdown(item.expiryDate)}
                  </div>
                ) : null}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
        {
          showMore < items.length &&
          <Link to="" id="loadmore" className="btn-main lead" onClick={loadMore}>
            Load more
          </Link>
        }
      </div>
    </>
  );
};

export default ExploreItems;
