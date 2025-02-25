import "./Profile.css";
import { useRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_BOOKCASE } from "../../utils/queries";
import { convert } from "../../utils/dragUtils";
import { Card } from "../../components";

import {
  userBooksAtom,
  userBookcaseAtom,
  userItemsAtom,
  fetchedAtom,
} from "../../recoil/atom/userBooksAtom";
import Auth from "../../utils/auth";
function Profile() {
  if (!Auth.loggedIn()) window.location.href = "/";
  const today = new Date();
  const thisYear = today.getFullYear();
  const [books, setBooks] = useRecoilState(userBooksAtom);
  const [bookCase, setBookcase] = useRecoilState(userBookcaseAtom);
  const [items, setItems] = useRecoilState(userItemsAtom);
  const [fetched, setFetched] = useRecoilState(fetchedAtom);

  const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME, {
    variables: { fetchMe: !fetched },
  });
  const { loading: loadingCase, data: dataCase } = useQuery(QUERY_BOOKCASE, {
    variables: { year: thisYear, fetchMe: !fetched },
  });

  if (dataMe && dataCase) {
    setBooks(dataMe.me);
    setBookcase(dataCase.bookcase);
    setItems(convert(dataCase.bookcase));
    setFetched(true);
  }

  return (
    <section id="profile">
      <div className="bookList">
        {books.bookList.map((book, index) => {
          return <Card book={book} />;
        })}
      </div>
    </section>
  );
}

export { Profile };
