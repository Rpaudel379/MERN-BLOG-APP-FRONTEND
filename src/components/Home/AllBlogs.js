import React from "react";
import { Link } from "react-router-dom";
import { BiCalendar } from "react-icons/bi";

const AllBlogs = ({ blogs, loading }) => {
  if (loading) {
    return <h2>loading blogs...</h2>;
  }

  if (!blogs.length) {
    return <h2>no blogs ...</h2>;
  }

  return (
    <div className="all-blogs">
      {blogs.map((blog) => {
        const { image, title, body, createdAt, name, _id } = blog;
        return (
          <section className="section-blog" key={blog._id}>
            <div className="img-cont-all">
              <Link to={`/blog/${_id}`} style={{ fontWeight: "bold" }}>
                <img src={image} alt="img" />
              </Link>
            </div>
            <div className="content">
              <h3>{title}</h3>
              <p className="text">
                {body.slice(0, 30)}

                <Link to={`/blog/${_id}`} style={{ fontWeight: "bold" }}>
                  ...
                </Link>
              </p>
              <div className="date">
                <p>
                  <BiCalendar />
                </p>
                <p>
                  {new Date(createdAt).toDateString()} by <span>{name}</span>
                </p>
              </div>
              <Link to={`/blog/${_id}`} className="view-more">
                Read More
              </Link>
            </div>
          </section>
        );
      })}

      {/*  <section className="section-blog">
        <div className="img-cont">
          <img src={image} alt="img" />
        </div>
        <div className="content">
          <h3>Weekend in the woods</h3>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
            exercitationem unde eum impedit pariatur error perferendis.
            Reprehenderit ab ipsam voluptatem!
          </p>
          <div className="date">
            <p>
              <BiCalendar />
            </p>
            <p>
              jan 10 2021 by <span>Anish Paudel</span>
            </p>
          </div>
        </div>
      </section>
 
     */}
    </div>
  );
};

export default AllBlogs;
