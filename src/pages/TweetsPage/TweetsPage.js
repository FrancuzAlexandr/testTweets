import {
  CardWrapper,
  UserList,
  UserItem,
  Line,
  Logo,
  Image,
  ImageWrapper,
  Tweets,
  Followers,
  Button,
  WrapperTop,
  WrapperBottom,
  Section,
  ButtonNav,
} from "./TweetsPage.styled";
import useStore from "../../utils/store";
import PropTypes from "prop-types";
import logo from "../../images/Logo.png";
import { useEffect } from "react";
import { fetchUsers, fetchUsersUpdate } from "../../utils/mockapi";

import { Link } from "react-router-dom";

export const TweetsPage = ({ users }) => {
  const increaseFollowers = useStore((state) => state.increaseFollowers);
  const decreaseFollowers = useStore((state) => state.decreaseFollowers);
  const toggleButtonStore = useStore((state) => state.toggleButton);

  const toggleBtn = (tweet) => {
    const { id } = tweet;
    fetchUsersUpdate(tweet);
    toggleButtonStore(id);

    const followingUser = users[id].isFollowing;

    followingUser ? decreaseFollowers(id) : increaseFollowers(id);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Section>
        <Link to="/">
          <ButtonNav>back</ButtonNav>
        </Link>
      </Section>
      <Section>
        <UserList>
          {users.map(({ id, user, tweets, followers, avatar, isFollowing }) => (
            <UserItem key={id}>
              <CardWrapper>
                <WrapperTop>
                  <Logo>
                    <img src={logo} alt="logo" />
                  </Logo>
                </WrapperTop>

                <Line />
                <ImageWrapper>
                  <Image src={avatar} alt={user} />
                </ImageWrapper>

                <WrapperBottom>
                  <Tweets> {tweets} Tweets </Tweets>
                  <Followers>
                    {followers.toLocaleString("en-US")} Followers
                  </Followers>
                  <Button
                    onClick={() =>
                      toggleBtn({
                        id,
                        user,
                        tweets,
                        followers,
                        avatar,
                        isFollowing,
                      })
                    }
                    colorType={isFollowing}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </WrapperBottom>
              </CardWrapper>
            </UserItem>
          ))}
        </UserList>
      </Section>
    </>
  );
};

TweetsPage.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          key: PropTypes.number.isRequired,
          user: PropTypes.string.isRequired,
          tweets: PropTypes.number.isRequired,
          followers: PropTypes.number.isRequired,
          avatar: PropTypes.string.isRequired,
          isFollowing: PropTypes.bool.isRequired,
        })
      ),
    })
  ),
};
