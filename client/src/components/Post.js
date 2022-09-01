import { useState, useEffect, useRef } from "react";
import { ReactComponent as OptionIcon } from "../assets/options.svg";
import { ReactComponent as Profile } from "../assets/profile.svg";
import { ReactComponent as LikeLogo } from "../assets/like.svg";
import { ReactComponent as LikeBtn } from "../assets/likebtn.svg";
import { ReactComponent as LikedBtn } from "../assets/likedbtn.svg";
import { ReactComponent as CommentBtn } from "../assets/comment.svg";
import WriteComment from "./WriteComment";
import { Link } from "react-router-dom";
import moment from "moment";
import Option from "./Option";

const Post = ({ postInfo, showComment, userId, token, loadFeed, setFeed }) => {
  const [btnStates, setBtn] = useState({
    comment: true,
    like: true,
    unlike: true,
  });
  const [postStat, setpostStat] = useState([]);
  const [option, setOption] = useState(false);
  const commentRef = useRef(null);
  const handleCommentClick = () => {
    commentRef.current.focus();
  };
  const preventFetch = (btnFor) => {
    setBtn((prev) => ({ ...prev, [btnFor]: false }));
  };
  const getPostStat = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/posts/${postId}/postStat`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();
      setpostStat(data.comments.length);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async (postId) => {
    const response = await fetch(`http://localhost:8080/users/${userId}/posts/${postId}/like`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    });
    const likes = await response.json()
    setFeed(prev => {
      let updated = prev.map(post => {
        if(postInfo._id === likes.postId) return {...post, likers: likes.likers, likes: likes.likeNum }
        return post
      } )
      return updated
    })
  };

  const unlikePost = async (postId) => {
    const response = await fetch(
      `http://localhost:8080/users/${userId}/posts/${postId}/unlike`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      }
    );
    const likes = await response.json()
    setFeed(prev => {
      let updated = prev.map(post => {
        if(postInfo._id === likes.postId) return {...post, likers: likes.likers, likes: likes.likeNum }
        return post
      } )
      return updated
    })
  };

  useEffect(() => {
    getPostStat(postInfo._id);
  }, []);
  return (
    <div className="container border bg-white rounded-4 post-width mb-3 shadow-sm px-0">
      <div className="d-flex post-head">
        <div className="d-flex w-100 align-items-center">
          <span>
            <Profile className="profile" />
          </span>
          <div className="flex-container-column flex-grow-1">
            <Link className="link-name" to={`/${postInfo.author._id}`}>
              <h2 className="author-name">{`${postInfo.author.first_name} ${postInfo.author.last_name}`}</h2>
            </Link>
            <div className="created-at">
              {moment(postInfo.createdAt).fromNow()}
            </div>
          </div>

          <div className="option rounded-circle d-flex justify-content-center align-items-center">
            <div
              className="option rounded-circle d-flex justify-content-center align-items-center"
              onClick={() => setOption((prev) => !prev)}
            >
              <OptionIcon className="svg16px" />
            </div>
            {option && (
              <Option
                token={token}
                userId={userId}
                postInfo={postInfo}
                loadFeed={loadFeed}
                setOption={setOption}
              />
            )}
          </div>
        </div>
      </div>
      <div className="px-3 fs-6 font-color card-text">{postInfo.post}</div>
      {postInfo.imageUrl && (
        <div className="card">
          <img className="card-img-top" src={postInfo.imageUrl} alt="dog" />
        </div>
      )}
      <div className="d-flex like-comment-container justify-content-between">
        {postInfo.likes ? (
          <div className="d-flex align-items-center">
            <div className="d-flex like-count-logo-container justify-content-center">
              <LikeLogo className="like-count-logo" />
            </div>
            <span className="like-count">{postInfo.likes}</span>
          </div>
        ) : null}
        {postStat !== 0 ? (
          <div className="px-3 ms-auto">
            {postStat > 1 ? (
              <div>{postStat} comments</div>
            ) : (
              <div>{postStat} comment</div>
            )}
          </div>
        ) : null}
      </div>
      <div className="px-3">
        <div className="border-top border-bottom d-flex justify-content-around p-1 btngrph">
          {/* <button className="rounded flex-fill" onClick={() => {
                    if (btnStates) showComment(postInfo._id)
                    preventFetch()
                }
                }>Comment</button> */}
          {!postInfo.likers.includes(userId) ? (
            <div
              className="rounded flex-fill-0 post-text-container d-flex justify-content-center align-items-center"
              onClick={() => {
                if (btnStates.like) likePost(postInfo._id);
                preventFetch("like");
                setBtn((prev) => ({ ...prev, unlike: true }));
              }}
            >
              <LikeBtn className="post-btn-svg" />
              <span className="px-2">Like</span>
            </div>
          ) : (
            <div
              className="rounded flex-fill-0 post-text-container d-flex justify-content-center align-items-center"
              onClick={() => {
                if (btnStates.unlike) unlikePost(postInfo._id);
                preventFetch("unlike");
                setBtn((prev) => ({ ...prev, like: true }));
              }}
            >
              <LikedBtn className="post-btn-svg" />
              <span className="text-primary px-2">Liked</span>
            </div>
          )}
          <div
            onClick={handleCommentClick}
            className="rounded flex-fill-0 post-text-container d-flex justify-content-center align-items-center"
          >
            <CommentBtn className="post-btn-svg" />
            <span className="px-2">Comment</span>
          </div>
        </div>
      </div>
      <WriteComment
       getPostStat={getPostStat}
        setFeed={setFeed}
        showComment={showComment}
        userId={userId}
        authorId={postInfo.author._id}
        token={token}
        postInfoId={postInfo._id}
        commentRef={commentRef}
      />
      {postInfo.comment.map((x, i) => (
        <div key={i}>
          {x.author.first_name} {x.author.last_name} ---- {x.comment}
        </div>
      ))}
      {postStat <= postInfo.comment.length ? null : (
        <div
          onClick={() => {
           showComment(postInfo._id, postInfo.comment.length);
          }}
        >
          View more comments {postInfo.comment.length} of {postStat}
        </div>
      )}
    </div>
  );
};

export default Post;
