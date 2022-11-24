import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";


const AuthorItems = ({ authorId }) => {
  const [authorNFT, setAuthorNFT] = useState([]);
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAuthorsNFT() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId.id}`
      );
      setAuthorNFT(data.nftCollection);
      setAuthor([data]);
      setLoading(false)
    }
    fetchAuthorsNFT();
  }, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading? 
            new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton className="nft__item" height={400} />
            </div>
            ))

          :
          authorNFT.map((NFT) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={NFT.nftId}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  {author.map((owner)=>
                    <Link to="" key={owner.authorId}>
                      <img className="lazy" src={owner.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  )}
                </div>

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
                  <Link to="/item-details">
                    <img
                      src={NFT.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{NFT.title}</h4>
                  </Link>
                  <div className="nft__item_price">{NFT.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{NFT.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
