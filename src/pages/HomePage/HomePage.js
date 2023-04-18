import { Link } from "react-router-dom";
import { Section, ButtonNav } from "../TweetsPage/TweetsPage.styled";
export const HomePage = () => {
  return (
    <>
      <Link to="/tweets">
        <Section>
          <ButtonNav>Tweets Page</ButtonNav>
        </Section>
      </Link>
    </>
  );
};
