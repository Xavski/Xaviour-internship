import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Author = () => {
  const authorId = useParams();

  const [author, setAuthor] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(true);

  function follow() {
    setFollowed(!followed);
  }

  useEffect(() => {
    async function fetchAuthorData() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId.id}`
      );
      setAuthor([data]);
      setLoading(false);
    }
    fetchAuthorData();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton circle={100} width={150} height={150} />
                        <div className="profile_name">
                          <h4>
                            <Skeleton width={150} />
                            <span className="profile_username">
                              <Skeleton width={80} />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width={100} />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                      <div className="profile_follower">
                          </div>
                          <Skeleton width={200} height={30}/>
                      </div>
                    </div>
                  </div>
                </div>

              ) : (
                author.map((details) => (
                  <div className="col-md-12" key={details.authorId}>
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={details.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {details.authorName}
                              <span className="profile_username">
                                @{details.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {details.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {followed
                              ? details.followers + 1
                              : details.followers}{" "}
                            followers
                          </div>
                          <button className="btn-main" onClick={follow}>
                            {followed ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
