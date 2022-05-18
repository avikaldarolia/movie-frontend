import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const MovieDetail = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <SearchBar />
      <div className="flex h-full w-full py-10">
        <div className="w-1/2 bg-black">
          <p>test</p>
        </div>
        <div className="px-5 w-1/2">
          <p className="text-6xl font-bold text-custom-green">Title</p>
          <div className="pt-5">
            <span className="text-xl font-medium">Synopsis</span>
            <p>
              "
              <p>
                Don't miss the seventh and final book in J.K. Rowling's
                bestselling Harry Potter series!
              </p>
              <h3>The New York Times - Michiko Kakutani</h3>
              <p>
                J. K. Rowling's monumental, spellbinding epic, 10 years in the
                making, is deeply rooted in traditional literature and Hollywood
                sagas&#151;from the Greek myths to Dickens and Tolkien to \"Star
                Wars.\" And true to its roots, it ends not with modernist,
                \"Soprano\"-esque equivocation, but with good old-fashioned
                closure: a big-screen, heart-racing, bone-chilling confrontation
                and an epilogue that clearly lays out people's fates. Getting to
                the finish line is not seamless&#151;the last part of{' '}
                <i>Harry Potter and the Deathly Hallows,</i> the seventh and
                final book in the series, has some lumpy passages of exposition
                and a couple of clunky detours&#151;but the overall conclusion
                and its determination of the main characters' story lines
                possess a convincing inevitability that make some of the
                prepublication speculation seem curiously blinkered in
                retrospect.
              </p>
              "
            </p>
          </div>
          <div className="text-xl font-medium py-2">
            <p>Authors : </p>
          </div>
          <div className="flex justify-between">
            <div className="text-xl font-medium py-2">
              <p>Publisher : </p>
            </div>
            <div className="text-xl font-medium py-2">
              <p>Date Published : </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-xl font-medium py-2">
              <p>Overview : </p>
            </div>
            <div className="text-xl font-medium py-2">
              <p>Edition : </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-xl font-medium py-2">
              <p>Binding : </p>
            </div>
            <div className="text-xl font-medium py-2">
              <p>Pages : </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-xl font-medium py-2">
              <p>isbn : </p>
            </div>
            <div className="text-xl font-medium py-2">
              <p>isbn13 : </p>
            </div>
          </div>
          <div className="flex justify-between py-2">
            <button
              className="text-xl font-medium py-2 bg-green-300 rounded-xl px-4"
              //   onClick={clickHandler}
            >
              Add to Collection
            </button>
            <button
              className="text-xl font-medium py-2 bg-green-300 rounded-xl px-4"
              //   onClick={() => addToWishlist()}
            >
              Add to wishlist
            </button>
            <button
              className="text-xl font-medium py-2 bg-green-300 rounded-xl px-4"
              //   onClick={() => addToReadBooks()}
            >
              Add to read books list
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
